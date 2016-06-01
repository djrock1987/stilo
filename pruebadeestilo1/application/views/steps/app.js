// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

var OB = {};
(function ($) {

  OB = {
    slider: {},
    bxSlider: {},
    currentStep: jsObject.currentStep,
    currentSubStep: jsObject.currentSubStep,
    availableStyles: jsObject.styles,
    availableFilters: jsObject.filters,
    filterType: '',
    maxPhotosPerSlide: 8,
    nextSubStep: 0,
    currentGrado: '',
    currentStyle: '',
    currentGlassesKey: 0,
    currentColor: '',
    currentMethodSelection: "",
    imageObject: new Image(),
    glassesObject: new Image(),
    filterObject: new Image(),
    cameraStream: {},
    cameraStarted: false,
    streaming: false,
    video: document.getElementById('selfie-video'),
    videoWidth: 0,
    videoHeight: 0,
    selfieCanvas: document.getElementById('selfie-canvas'),
    faceCanvas: {},
    canvasWidth: 198,
    canvasHeight: 219,
    showingAllMonturas: false,
    faceInstance: {},
    faceInstanciated: false,
    faceInstancePosition: {
      top: 0,
      left: 0
    },
    glassesScale: 0.8,
    glassesInstance: {},
    glassesInstanciated: false,
    glassesInstanceAttributes: {
      top: 0,
      left: 0,
      scale: 1,
      angle: 0
    },
    filterInstance: {},
    filterInstanciated: false,
    selfieContext: {},
    FB: {},
    fbLoginStatus: {},
    fbGrantedPermission: {},
    fbProfilePictures: [],
    errorByStep: {
      '1-0': 'Por favor selecciona tu estilo',
      '2-0': 'Por favor selecciona un método para cargar tu foto',
      '2-1': 'Por favor carga una imagen',
      '2-2': 'Por favor selecciona una foto de tu álbum',
      '2-3': 'Por favor tómate una foto',
      '4-0': 'Por favor selecciona una montura',
      '6-0': 'Por favor selecciona un filtro',
      '7-0': 'Por favor selecciona un grado de activación'
    },
    imagesGenerated: {
      'alto': '',
      'bajo': '',
      'medio': ''
    },
    generatingImage: false,
    construct: function () {
      OB.generalActions();
      OB.slidersObjects();
      OB.selfieContext = OB.selfieCanvas.getContext('2d');
      OB.faceCanvas = new fabric.Canvas('face-canvas', {
        imageSmoothingEnabled: true
      });
      OB.faceCanvas.setWidth(OB.canvasWidth);
      OB.faceCanvas.setHeight(OB.canvasHeight);
      OB.faceCanvas.on('object:scaling', OB.canvasObjectScaled);
      OB.faceCanvas.on('object:rotating', OB.canvasObjectRotated);
      OB.faceCanvas.on('object:moving', OB.canvasObjectMoved);
    },
    canvasObjectScaled: function (event) {
      var obj = event.target
      switch (obj.id) {
        case 'faceInstance':
          var scale = obj.getScaleX();
          OB.slider['zoom'].slider("value", scale * 100);
          OB.faceInstanciated = true;
          break;
        case 'glassesInstance':
          OB.glassesInstanceAttributes.scale = obj.getScaleX();
          OB.glassesInstanciated = true;
          break;
      }
    },
    canvasObjectRotated: function (event) {
      var obj = event.target
      switch (obj.id) {
        case 'faceInstance':
          var angle = obj.getAngle();
          OB.slider['rotate'].slider("value", angle);
          OB.faceInstanciated = true;
          break;
        case 'glassesInstance':
          OB.glassesInstanceAttributes.angle = obj.getAngle();
          OB.glassesInstanciated = true;
          break;
      }
    },
    canvasObjectMoved: function (event) {
      var obj = event.target
      switch (obj.id) {
        case 'faceInstance':
          OB.faceInstancePosition = {
            top: obj.getTop(),
            left: obj.getLeft()
          };
          OB.faceInstanciated = true;
          break;
        case 'glassesInstance':
          OB.glassesInstanceAttributes.top = obj.getTop();
          OB.glassesInstanceAttributes.left = obj.getLeft();
          OB.glassesInstanciated = true;
          break;
      }

    },
    generalActions: function () {
      OB.stepController();
      OB.loadFacebookSDK();
    },
    loadFacebookSDK: function () {
      $.ajaxSetup({cache: true});
      $.getScript('//connect.facebook.net/es_ES/sdk.js', function () {
        OB.FB = FB;
        OB.FB.init({
          appId: jsObject.facebook_app_id,
          cookie: true,
          version: 'v2.5' // or v2.0, v2.1, v2.2, v2.3
        });

        OB.FB.getLoginStatus(OB.updateStatusCallback);
      });
    },
    updateStatusCallback: function (response) {
      OB.fbLoginStatus = response;
      if (response.status === 'connected') {
        OB.getFacebookPermissions();
      }
    },
    goToStep: function (step, sub_step, has_substep, is_final_step) {
      if (!has_substep) {
        if (!is_final_step) {
          $('.app-content.active').removeClass('active');
          OB.currentStep = step + 1;
          $('#step-' + OB.currentStep + '-0').addClass('active');
        } else {
          //Procesar paso final
        }
      } else {
        //Procesar sub step
        if (sub_step === 0) {
          if (OB.checkAnyNeededActionBeforeContinue()) {
            $('.app-content.active').removeClass('active');
            OB.currentSubStep = OB.nextSubStep;
            $('#step-' + OB.currentStep + '-' + OB.nextSubStep).addClass('active');
          }
        } else {
          $('.app-content.active').removeClass('active');
          OB.currentStep = step + 1;
          OB.currentSubStep = 0;
          $('#step-' + OB.currentStep + '-' + OB.currentSubStep).addClass('active');
        }
      }
      OB.prepareStep();
    },
    stepController: function () {

      $('.next-button').on('click', function (event) {
        event.preventDefault();
        if (OB.canUserContinue()) {
          var step = $(this).data('step');
          var sub_step = $(this).data('sub_step');
          var has_substep = $(this).data('has_substep');
          var is_final_step = $(this).data('is_final_step');
          OB.goToStep(step, sub_step, has_substep, is_final_step);

        } else {
          OB.showErrorByStep();
        }
      });

      $('.prev-button').on('click', function (event) {
        event.preventDefault();
        var step = $(this).data('step');
        var sub_step = $(this).data('sub_step');
        var has_substep = $(this).data('has_substep');

        if (!has_substep) {
          $('#step-' + step + '-' + sub_step).removeClass('active');
          OB.currentStep = step - 1;
          $('#step-' + OB.currentStep + '-' + OB.currentSubStep).addClass('active');
        } else {
          $('#step-' + step + '-' + sub_step).removeClass('active');
          OB.currentStep = step;
          OB.currentSubStep = 0;
          $('#step-' + OB.currentStep + '-0').addClass('active');
        }

        OB.resetStepSelection();

      });

      OB.stepOneActions();
      OB.stepTwoActions();
      OB.stepFourActions();
      OB.stepFiveActions();
      OB.stepSixActions();
      OB.stepSevenActions();
      OB.stepEightActions();

    },
    checkAnyNeededActionBeforeContinue: function () {
      var canContinue = true;
      switch (parseInt(OB.currentStep)) {
        case 2:
          canContinue = OB.checkActionsNeededStepTwo();
          break;
      }
      return canContinue;
    },
    checkActionsNeededStepTwo: function () {
      var canContinue = true;
      switch (parseInt(OB.nextSubStep)) {
        case 2:
          OB.hideError();
          canContinue = false;
          var callbackOnLogin = function (response) {
            OB.fbLoginStatus = response;
            if (response.status === 'connected') {
              /*
               * Check if user accepted "user_photos" permission
               */
              var grantedScopes = response.authResponse.grantedScopes;
              var permission = grantedScopes.indexOf('user_photos');

              if (parseInt(permission) === -1) {
                OB.showError($('#step-2-0'), 'Para utilizar este metodo necesitamos acceso a tus fotos');
                if (typeof OB.fbGrantedPermission !== 'undefined') {
                  OB.getFacebookPermissions();
                }
              } else {
                /*
                 * As this is an asynchronous call, we must trigger the click button again to ensure user have permissions accepted
                 */
                var triggerClick = function () {
                  $('#step-2-0 .next-button').trigger('click');
                };
                OB.getFacebookPermissions(triggerClick);
              }
            } else {
              OB.showError($('#step-2-0'), 'Para utilizar este metodo necesitamos acceso a tus fotos');
            }
          }
          /*
           * Check if user is logged in Facebook
           */
          if (OB.fbLoginStatus.status !== 'connected') {
            /*
             * The user is not connected or hasn't accepted permissions
             */
            OB.facebookLogin(callbackOnLogin, {
              scope: 'email,user_photos',
              return_scopes: true
            });
          } else {
            /*
             * The user is connected but we don't access to their photos
             */
            if (!OB.checkFacebookPermission('user_photos')) {

              OB.facebookLogin(callbackOnLogin, {
                scope: 'user_photos',
                return_scopes: true,
                auth_type: 'rerequest'
              });
            } else {
              canContinue = true;
            }
          }

          break;
      }
      return canContinue;
    },
    facebookLogin: function (callback, opts) {
      OB.FB.login(callback, opts);
    },
    getFacebookPermissions: function (callback) {

      var path = "/me/permissions";
      OB.FB.api(path, function (response) {
        OB.fbGrantedPermission = response;
        if (typeof callback !== 'undefined') {
          callback();
        }
      });
    },
    checkFacebookPermission: function (permission) {
      var permissionChecked = false;
      $.each(OB.fbGrantedPermission.data, function (key, val) {
        if (val.permission === permission && val.status === 'granted') {
          permissionChecked = true;
          return true;
        }
      });
      return permissionChecked;
    },
    prepareStep: function () {
      switch (parseInt(OB.currentStep)) {
        case 2:
          OB.prepareStepTwo();
          break;
        case 3:
          if (OB.cameraStarted) {

            if (OB.cameraStream.active) {
              var videoTracks = OB.cameraStream.getTracks();
              $.each(videoTracks, function (key, val) {
                val.stop();
              });
            } else {
              OB.cameraStream.stop();
            }
          }
          OB.setImage();
          break;
        case 4:
          $('#image-selected').appendTo($('#step-4-0 .canvas-container'));
          OB.setMonturas();
          break;
        case 5:
          var objects = OB.faceCanvas.getObjects();
          if (objects.length > 0) {

            $.each(objects, function (key, object) {
              object.set({selectable: false});
              object.hasControls = object.hasBorders = false;
            });
          }
          OB.faceCanvas.renderAll();
          break;
        case 6:
          if ($('#step-6-0 .canvas-container #image-selected').length === 0) {
            $('#image-selected').prependTo($('#step-6-0 .canvas-container'));
          }

          OB.setFilters();
          break;
        case 7:
          OB.setGradosActivacion();
          break;
      }
    },
    setGradosActivacion: function () {
      $('#grado-activacion').html('');
      var totalFilters = OB.availableStyles[OB.currentStyle].filters.length;

      var setGradoActivacion = function (key) {
        var grado = OB.availableStyles[OB.currentStyle].filters[key];
        var divPhoto = $('<div></div>');
        divPhoto.addClass('grado-activacion');
        divPhoto.addClass('upload-photo');
        divPhoto.addClass('large-4');

        var aImg = $('<a/>');
        var aFacebookShare = $('<a/>');
        aImg.addClass('photo-container');
        aImg.attr('data-grado', grado);

        aFacebookShare.addClass('facebook-share');
        aFacebookShare.attr('data-grado', grado);
        aFacebookShare.html('<p>COMPÁRTELA<br/> EN FACEBOOK</p>');

        var pImg = $('<p/>');
        pImg.html('GRADO ' + grado.toUpperCase() + '<br/> DE ACTIVACION');
        divPhoto.append(aImg);
        divPhoto.append(aFacebookShare);

        var srcImage = jsObject.baseUrl + '/static/monturas/' + OB.currentStyle + '/' + (parseInt(OB.currentGlassesKey) + 1) + '/' + OB.currentColor + '/' + grado + '.png';

        if (srcImage !== '') {
          var image = new Image();
          image.crossOrigin = "anonymous";
          image.onload = function () {
            OB.filterObject = this;
            OB.setGlassesFilter(function () {
              var imgGrado = new Image();
              imgGrado.crossOrigin = "anonymous";
              imgGrado.id = "grado-" + grado;
              imgGrado.onload = function () {
                aImg.append(this);
                aImg.append(pImg);
                $('#grado-activacion').append(divPhoto);
                if (key + 1 < totalFilters) {
                  setGradoActivacion(key + 1);
                }
              }
              imgGrado.src = OB.faceCanvas.toDataURL();
            });
          };
          image.src = srcImage;
        }
      }
      setGradoActivacion(0);
    },
    setFilters: function () {
      var filters = OB.availableFilters[OB.filterType];
      OB.paintFilters(filters);
    },
    paintFilters: function (filters) {

      $.each(filters, function (key, val) {

        var li = $('<li/>');
        var a = $('<a/>');
        a.attr('href', '#');
        a.attr('data-color', key);

        a.html(val.name);

        li.append(a);
        a.css({
          'background-color': val.code
        });
        $('#color-selector').append(li)
      });
    },
    setMonturas: function () {
      var monturas = OB.getMonturasByStyle(OB.currentStyle);
      if (monturas.length > 0) {
        OB.paintMonturas(monturas);
      }
    },
    paintMonturas: function (monturas) {
      var numPhotos = monturas.length;

      var ulNotAdded = true;
      var ulGrid = $('<ul/>');
      ulGrid.addClass('photos-grid');
      var imagesLoaded = 0;
      $.each(monturas, function (key, val) {
        ulNotAdded = true;
        var li = $('<li/>');
        var a = $('<a/>');
        a.attr('href', '#');
        a.attr('data-key', val.key);
        a.attr('data-style', val.style);

        li.append(a);

        var thumbnail = new Image();
        thumbnail.crossOrigin = "anonymous";
        thumbnail.onload = function () {
          imagesLoaded++;
          a.append(this);
          if (imagesLoaded == numPhotos && numPhotos > OB.maxPhotosPerSlide) {
            OB.bxSlider['monturas'] = OB.createSlider($('#monturas-photos'));
          }
        };
        thumbnail.src = val.picture;
        ulGrid.append(li);
        if ((key + 1) % OB.maxPhotosPerSlide === 0) {

          var liSlider = $('<li/>')
          liSlider.append(ulGrid);
          $('#monturas-photos').append(liSlider);
          ulNotAdded = false;
          ulGrid = $('<ul/>');
          ulGrid.addClass('photos-grid');
        }
      });

      if (ulNotAdded) {
        var liSlider = $('<li/>')
        liSlider.append(ulGrid);
        $('#monturas-photos').append(liSlider);
      }
    },
    getMonturasByStyle: function (style) {
      var images = [];
      if (style !== '') {
        for (i = 0; i < OB.availableStyles[style].total; i++) {
          images[i] = {
            picture: jsObject.baseUrl + 'static/monturas/' + style + '/originales/' + (i + 1) + '.png',
            style: style,
            key: i
          };
        }
      } else {
        /*
         * Obtener todas las monturas
         */
        var images = [];
        var keyImg = 0;
        $.each(OB.availableStyles, function (keyStyle, style) {

          for (i = 0; i < style.total; i++) {
            images[keyImg] = {
              picture: jsObject.baseUrl + 'static/monturas/' + keyStyle + '/originales/' + (i + 1) + '.png',
              style: keyStyle,
              key: i
            };
            keyImg++;
          }
        });
      }
      return images;
    },
    prepareStepTwo: function () {
      switch (OB.currentSubStep) {
        case 2:
          OB.findProfilePicturesAlbum();
          break;
        case 3:
          OB.loadCamera();
          break;
      }
    },
    findProfilePicturesAlbum: function () {

      if (OB.fbProfilePictures.length === 0) {
        var profilePicturesAlbumId = 0;
        var after = '';

        var checkResults = function () {
          if (profilePicturesAlbumId === 0) {
            OB.showError($('#step-2-2'), 'No hemos podido localizar el album de tus fotos de perfil');
            setTimeout(OB.hideError, 5000);
          } else {
            OB.loadProfilePicturesPhotos(profilePicturesAlbumId);
          }
        };

        var findProfilePictureAlbum = function () {
          var path = "/me/albums" + after;
          var message = "Buscando Fotos de perfil de Facebook";
          OB.showError($('#step-2-2'), message);
          OB.FB.api(path, function (response) {

            $.each(response.data, function (key, val) {
              if (val.name === 'Profile Pictures') {
                profilePicturesAlbumId = val.id;
                return true;
              }
            });

            if (profilePicturesAlbumId === 0 && typeof response.paging.next !== 'undefined') {
              after = '?after=' + response.paging.cursors.after;
              findProfilePictureAlbum();
            } else {
              checkResults();
            }
          });

        };
        findProfilePictureAlbum();
      } else {
        OB.paintFacebookPhotos();
      }

    },
    loadProfilePicturesPhotos: function (albumId) {
      var after = '';
      var photos = [];
      var keyPhoto = 0;


      var gatherAllProfilePictures = function () {
        var message = "Leyendo fotos del Album";
        OB.showError($('#step-2-2'), message);
        var path = "/{album-id}/photos" + after;
        OB.FB.api(path.replace('{album-id}', albumId), function (response) {
          if (response.data.length > 0) {
            $.each(response.data, function (key, val) {
              photos[keyPhoto] = val.id;
              keyPhoto++;
            });

            if (typeof response.paging.next !== 'undefined') {
              after = '?after=' + response.paging.cursors.after;
              gatherAllProfilePictures();
            } else {
              checkResults();
            }
          }
        });
      };
      gatherAllProfilePictures();


      var checkResults = function () {
        if (photos.length > 0) {

          var readPhotoInformation = function (key) {
            var message = "Obteniendo información de foto {{key}} de {{total}}";
            message = message.replace('{{total}}', photos.length).replace('{{key}}', key + 1);
            OB.showError($('#step-2-2'), message);

            var path = "/{photo-id}?fields=images,link,name,picture";
            OB.FB.api(path.replace('{photo-id}', photos[key]), function (response) {
              OB.fbProfilePictures[key] = response;
              if ((key + 1) < photos.length) {
                readPhotoInformation(key + 1);
              } else {
                OB.paintFacebookPhotos();
              }
            });
          };
          readPhotoInformation(0);
        }
      };

    },
    paintFacebookPhotos: function () {

      if (OB.fbProfilePictures.length > 0) {
        var numPhotos = OB.fbProfilePictures.length;
        var ulNotAdded = true;
        var ulGrid = $('<ul/>');
        var imagesLoaded = 0;
        ulGrid.addClass('photos-grid');



        $.each(OB.fbProfilePictures, function (key, val) {
          OB.showError($('#step-2-2'), "Cargando Imagenes");

          ulNotAdded = true;
          var li = $('<li/>');
          var a = $('<a/>');
          a.attr('href', '#');
          a.attr('data-key', key);
          li.append(a);

          var thumbnail = new Image();
          thumbnail.crossOrigin = "anonymous";
          thumbnail.onload = function () {
            imagesLoaded++;
            a.append(this);
            if (imagesLoaded == numPhotos) {
              OB.showError($('#step-2-2'), "Carga Completa");
              OB.hideError();
              if (numPhotos > OB.maxPhotosPerSlide) {
                OB.bxSlider['facebook'] = OB.createSlider($('#facebook-photos'));
              }
            }
          };
          thumbnail.src = val.picture;
          ulGrid.append(li);
          if ((key + 1) % OB.maxPhotosPerSlide === 0) {
            var liSlider = $('<li/>')
            liSlider.append(ulGrid);
            $('#facebook-photos').append(liSlider);
            ulNotAdded = false;
            ulGrid = $('<ul/>');
            ulGrid.addClass('photos-grid');
          }
        });

        if (ulNotAdded) {
          var liSlider = $('<li/>')
          liSlider.append(ulGrid);
          $('#facebook-photos').append(liSlider);
        }

      } else {
        OB.showError($('#step-2-2'), 'No hemos podido localizar ninguna imagen tus fotos de perfil');
        setTimeout(OB.hideError, 5000);
      }
    },
    createSlider: function (sliderObj) {
      return sliderObj.bxSlider({
        pager: false
      });
    },
    setGlassesFilter: function (callback) {
      $('#step-6-0 .image-selected img').remove();
      var objects = OB.faceCanvas.getObjects();
      if (objects.length > 0) {

        $.each(objects, function (key, object) {
          if (object.id == 'filterInstance') {
            object.remove();
          }
        })
      }

      if ($('#step-6-0 .image-selected img').length === 0) {
        $('#step-6-0 .image-selected').append(OB.filterObject);
        $('#step-6-0 .image-selected img').css({
          display: 'none'
        });
        var maxWidth = OB.canvasWidth;
        var imgWidth = $('#step-6-0 .image-selected img').width();
        var maxHeight = OB.canvasHeight;
        var imgHeight = $('#step-6-0 .image-selected img').height();

        if (imgWidth > imgHeight) {
          imgHeight = imgHeight * maxWidth / imgWidth;
          imgWidth = maxWidth;
        } else {
          if (imgHeight > maxHeight) {
            imgWidth = imgWidth * maxHeight / imgHeight;
            imgHeight = maxHeight;
          }
        }

        OB.faceInstance = new fabric.Image(OB.filterObject, {
          top: (imgHeight * OB.glassesScale) / 2,
          left: (imgWidth * OB.glassesScale) / 2,
          width: (imgWidth * OB.glassesScale),
          height: (imgHeight * OB.glassesScale),
          originX: "center",
          originY: "center",
          id: "filterInstance",
          selectable: false
        });


        OB.faceInstance.scale(OB.glassesInstanceAttributes.scale);
        OB.faceInstance.setAngle(OB.glassesInstanceAttributes.angle);
        OB.faceInstance.setLeft(OB.glassesInstanceAttributes.left);
        OB.faceInstance.setTop(OB.glassesInstanceAttributes.top);

        OB.faceCanvas.add(OB.faceInstance);

        if (typeof callback !== 'undefined') {
          callback();
        }
      }
    },
    setGlasses: function () {
      $('#step-4-0 .image-selected img').remove();
      var objects = OB.faceCanvas.getObjects();
      if (objects.length > 0) {

        $.each(objects, function (key, object) {
          if (object.id == 'glassesInstance') {
            object.remove();
          }
        })
      }

      if ($('#step-4-0 .image-selected img').length === 0) {
        $('#step-4-0 .image-selected').append(OB.glassesObject);
        $('#step-4-0 .image-selected img').css({
          display: 'none'
        });
        var maxWidth = OB.canvasWidth;
        var imgWidth = $('#step-4-0 .image-selected img').width();
        var maxHeight = OB.canvasHeight;
        var imgHeight = $('#step-4-0 .image-selected img').height();

        if (imgWidth > imgHeight) {
          imgHeight = imgHeight * maxWidth / imgWidth;
          imgWidth = maxWidth;
        } else {
          if (imgHeight > maxHeight) {
            imgWidth = imgWidth * maxHeight / imgHeight;
            imgHeight = maxHeight;
          }
        }

        OB.glassesInstance = new fabric.Image(OB.glassesObject, {
          top: (imgHeight * OB.glassesScale) / 2,
          left: (imgWidth * OB.glassesScale) / 2,
          width: (imgWidth * OB.glassesScale),
          height: (imgHeight * OB.glassesScale),
          originX: "center",
          originY: "center",
          id: "glassesInstance",
          centeredScaling: true,
          lockUniScaling: true,
          lockScalingFlip: true
        });

        if (OB.glassesInstanciated) {
          OB.glassesInstance.scale(OB.glassesInstanceAttributes.scale);
          OB.glassesInstance.setAngle(OB.glassesInstanceAttributes.angle);
          OB.glassesInstance.setLeft(OB.glassesInstanceAttributes.left);
          OB.glassesInstance.setTop(OB.glassesInstanceAttributes.top);
        }

        OB.faceCanvas.add(OB.glassesInstance);
      }

    },
    setImage: function () {

      $('#step-3-0 .image-selected img').remove();
      var objects = OB.faceCanvas.getObjects();
      if (objects.length > 0) {
        OB.glassesInstanciated = false;
        while (objects.length > 0) {
          objects[0].remove();
        }
      }

      if ($('#step-3-0 .image-selected img').length === 0) {
        $('#step-3-0 .image-selected').append(OB.imageObject);
        $('#step-3-0 .image-selected img').css({
          display: 'none'
        });
        var maxWidth = OB.canvasWidth;
        var imgWidth = $('#step-3-0 .image-selected img').width();
        var maxHeight = OB.canvasHeight;
        var imgHeight = $('#step-3-0 .image-selected img').height();

        if (imgWidth > imgHeight) {
          imgHeight = imgHeight * maxWidth / imgWidth;
          imgWidth = maxWidth;
        } else {
          if (imgHeight > maxHeight) {
            imgWidth = imgWidth * maxHeight / imgHeight;
            imgHeight = maxHeight;
          }
        }

        OB.faceInstance = new fabric.Image(OB.imageObject, {
          top: imgHeight / 2,
          left: imgWidth / 2,
          width: imgWidth,
          height: imgHeight,
          originX: "center",
          originY: "center",
          id: "faceInstance",
          centeredScaling: true,
          lockUniScaling: true,
          lockScalingFlip: true
        });

        OB.faceInstance.scale(OB.slider['zoom'].slider("option", "value") / 100);
        OB.faceInstance.setAngle(OB.slider['rotate'].slider("option", "value") - 180);
        if (OB.faceInstanciated) {
          OB.faceInstance.setLeft(OB.faceInstancePosition.left);
          OB.faceInstance.setTop(OB.faceInstancePosition.top);
        }

        OB.faceCanvas.add(OB.faceInstance);
      }

    },
    resetStepSelection: function () {

      switch (parseInt(OB.currentStep)) {
        case 1:
          OB.currentStyle = '';
          $('#step-1-0 .style-selection').removeClass('active');
          $('#step-1-0 .selection-steps .glasses-img img');
        case 2:
          $('#step-2-0 .method-selection').removeClass('active');
          OB.currentMethodSelection = '';
          OB.imageObject = new Image();
          OB.imageObject.crossOrigin = "anonymous";

          $('.app-content[id|="step-2"]').find('#photo-container img').remove();
          $('.app-content[id|="step-2"]').find('#output img').remove();


          if ($('.app-content[id|="step-2"]').find('.bx-wrapper').length > 0) {
            OB.bxSlider['facebook'].destroySlider();
          }

          $('.app-content[id|="step-2"]').find('#facebook-photos').html('');

          $('#uploadImage').trigger('reset');
          if (OB.cameraStarted) {

            if (OB.cameraStream.active) {
              var videoTracks = OB.cameraStream.getTracks();
              $.each(videoTracks, function (key, val) {
                val.stop();
              });
            } else {
              OB.cameraStream.stop();
            }
          }
        case 3:
          OB.glassesObject = new Image();
          OB.glassesObject.crossOrigin = "anonymous";
        case 4:
          if ($('.app-content[id|="step-4"]').find('.bx-wrapper').length > 0) {
            OB.bxSlider['monturas'].destroySlider();
          }
          $('.app-content[id|="step-4"]').find('#monturas-photos').html('');
          if ($('#step-3-0 .canvas-container #image-selected').length === 0) {
            $('#image-selected').prependTo($('#step-3-0 .canvas-container'));
          }
          break;
        case 5:
          $('.app-content[id|="step-6"]').find('#color-selector').html('');
          OB.filterObject = new Image();
          OB.filterObject.crossOrigin = "anonymous";
        case 6:

          break;
      }
    },
    stepOneActions: function () {
      $('#step-1-0 .style-selection').on('click', function (event) {
        event.preventDefault();

        $('#step-1-0 .style-selection').removeClass('active');
        OB.hideError();

        var style = $(this).data('style');
        $(this).addClass('active');
        OB.currentStyle = style;

        var styleImage = new Image();
        styleImage.crossOrigin = "anonymous";
        styleImage.onload = function () {
          if ($('#step-1-0 .selection-steps .glasses-img img').length > 0) {
            $('#step-1-0 .selection-steps .glasses-img img').attr('src', this.src);
          } else {
            $('#step-1-0 .selection-steps .glasses-img').append(this);
          }
        };
        styleImage.src = jsObject.baseUrl + 'static/images/g-' + style + '.jpg';
        $('#step-1-0 .selection-steps').attr('class', 'selection-steps ' + style);
      });
    },
    stepTwoActions: function () {

      $('#step-2-0 .method-selection').on('click', function (event) {
        event.preventDefault();
        $('#step-2-0 .method-selection').removeClass('active');
        OB.hideError();

        var method = $(this).data('method');
        $(this).addClass('active');
        OB.currentMethodSelection = method;
        OB.nextSubStep = method;
      });

      $('.app-content[id|="step-2"] .photo-selection').on('click', function (event) {
        event.preventDefault();
        var type = $(this).data('type');
        OB.hideError();
        switch (type) {
          case 'pc':
            OB.loadImageFromDevice();
            break;
          case 'camera':
            OB.loadCamera();
            break;
          case 'facebook':
            break;
        }
      });

      $('.facebook-pic').on('click', '#facebook-photos .photos-grid li a', function (event) {
        event.preventDefault();
        $('#facebook-photos li').removeClass('active');
        var key = $(this).data('key');
        var biggestWidth = 0;

        var images = OB.fbProfilePictures[parseInt(key)].images;
        var srcImage = '';
        $.each(images, function (keyPhoto, val) {

          if (parseInt(val.width) > biggestWidth) {
            srcImage = val.source;
            biggestWidth = val.width;
          }
        });

        if (srcImage !== '') {
          var image = new Image();
          image.crossOrigin = "anonymous";
          image.onload = function () {
            OB.imageObject = this;
          };
          image.src = srcImage;
        }

        $(this).parent().addClass('active');

      });

      $('#uploadImage').find('input[name="photo"]').on('change', function (event) {
        if (this.files && this.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {

            if ($('#photo-container img').length > 0) {
              $('#photo-container img').attr('src', e.target.result);
            } else {
              var ImagePreview = new Image();
              ImagePreview.crossOrigin = "anonymous";
              ImagePreview.onload = function () {
                $('#photo-container').append(this);
                OB.imageObject = this;
              }
              ImagePreview.src = e.target.result;
            }
          }
          reader.readAsDataURL(this.files[0]);
        }
      });

      $('#step-2-3 .selfie-buttons a').on('click', function (event) {
        event.preventDefault();
        if (OB.streaming) {
          if ($(this).hasClass('accept')) {
            OB.takePicture();
          }
          if ($(this).hasClass('cancel')) {
            OB.clearPicture();
          }
        }
      });
    },
    stepFourActions: function () {
      $('#step-4-0').on('click', '.toggle-monturas', function (event) {
        event.preventDefault();
        if ($('.app-content[id|="step-4"]').find('.bx-wrapper').length > 0) {
          OB.bxSlider['monturas'].destroySlider();
          $('.app-content[id|="step-4"]').find('#monturas-photos').html('');
          if (!OB.showingAllMonturas) {

            var monturas = OB.getMonturasByStyle('');
            if (monturas.length > 0) {
              OB.paintMonturas(monturas);
            }
            $(this).html('RECOMENDADAS');
            OB.showingAllMonturas = true;
          } else {
            var monturas = OB.getMonturasByStyle(OB.currentStyle);
            if (monturas.length > 0) {
              OB.paintMonturas(monturas);
            }
            $(this).html('MÁS MONTURAS');
            OB.showingAllMonturas = false;
          }
        }
      });

      $('.facebook-pic').on('click', '#monturas-photos .photos-grid li a', function (event) {
        event.preventDefault();
        $('#monturas-photos li').removeClass('active');
        OB.currentGlassesKey = $(this).data('key');
        OB.currentStyle = $(this).data('style');
        var srcImage = jsObject.baseUrl + '/static/monturas/' + OB.currentStyle + '/' + (parseInt(OB.currentGlassesKey) + 1) + '/montura.png';

        if (srcImage !== '') {
          var image = new Image();
          image.crossOrigin = "anonymous";
          image.onload = function () {
            OB.glassesObject = this;
            OB.setGlasses();
          };
          image.src = srcImage;
        }

        $(this).parent().addClass('active');

      });


    },
    stepFiveActions: function () {
      $('.filter-selection').on('click', function (event) {
        event.preventDefault();
        var type = $(this).data('type');
        $('.filter-style').html(type);
        OB.filterType = type;
        OB.goToStep(5, 0, false, false);
      })
    },
    stepSixActions: function () {
      $('.facebook-pic').on('click', '#color-selector li a', function (event) {
        event.preventDefault();
        $('#color-selector li').removeClass('active');
        OB.currentColor = $(this).data('color');
        var srcImage = jsObject.baseUrl + '/static/monturas/' + OB.currentStyle + '/' + (parseInt(OB.currentGlassesKey) + 1) + '/' + OB.currentColor + '/medio.png';

        if (srcImage !== '') {
          var image = new Image();
          image.crossOrigin = "anonymous";
          image.onload = function () {
            OB.filterObject = this;
            OB.setGlassesFilter();
          };
          image.src = srcImage;
        }

        $(this).parent().addClass('active');

      });
    },
    stepSevenActions: function () {

      $('#grado-activacion').on('click', '.photo-container', function (event) {
        event.preventDefault();

        $('#grado-activacion .photo-container').removeClass('active');
        $(this).addClass('active');

        var grado = $(this).data('grado');

        OB.currentGrado = grado;

      });

      $('#grado-activacion').on('click', '.facebook-share', function (event) {
        event.preventDefault();
        OB.hideError();
        var link = $(this);
        var grado = $(this).data('grado');
        OB.publishOnFacebook(grado);

      });

    },
    stepEightActions: function () {
      $('.share-selection').on('click', function (event) {
        event.preventDefault();
        var method = $(this).data('method');
        var switchMethod = function () {
          switch (method) {
            case 'facebook':
              OB.publishOnFacebook(OB.currentGrado);
              break;
            case 'email':
              $('#emailForm').find('input[name="image_url"]').val(OB.imagesGenerated[OB.currentGrado]);
              $.fancybox.open($('#emailFormLigthbox'));
              break;
            case 'download':
              document.location = OB.imagesGenerated[OB.currentGrado];
              break;
          }
        };
        OB.generateImageByGrado(OB.currentGrado, switchMethod);
      });

      $.each($('.ajaxForms'), function () {
        $(this).validate({
          submitHandler: function (form) {
            var form = form;

            OB.formLabelInfo({
              'object_id': $(form).attr('id'),
              'type': 'info',
              'text': 'Procesando la información'
            });

            $(form).find('input[type="submit"]').attr('disabled', 'disabled');

            var data = new FormData(form);

            $.ajax({
              url: jsObject.ajaxUrl,
              data: data,
              processData: false,
              contentType: false,
              type: 'POST',
              dataType: 'json',
              success: function (response) {

                if (typeof response.actions !== 'undefined') {
                  $.each(response.actions, function (key, val) {
                    OB[val.name](val.vars);
                  });
                }

                $(form).find('input[type="submit"]').removeAttr('disabled');
              },
              error: function (jqXHR, textStatus, errorThrown) {
                alert('Unexpected Error');
                $(form).find('input[type="submit"]').removeAttr('disabled');
              }
            });

            return false;
          }
        })
      });
    },
    formLabelInfo: function (actionVars) {
      if ($('#' + actionVars.object_id).find('#label-info').length === 0) {
        var labelInfo = $('<p></p>');
        labelInfo.addClass('alert_sn');
        labelInfo.addClass(actionVars.type);
        labelInfo.attr('id', 'label-info');
        labelInfo.html(actionVars.text);
        $('#' + actionVars.object_id).find('input[type="submit"]').after(labelInfo);
        console.log('#' + actionVars.object_id);
      } else {
        $('#' + actionVars.object_id).find('#label-info').removeAttr('class');
        $('#' + actionVars.object_id).find('#label-info').addClass('alert_sn');
        $('#' + actionVars.object_id).find('#label-info').addClass(actionVars.type);
        $('#' + actionVars.object_id).find('#label-info').html(actionVars.text);
      }
    },
    fadeOutAndRemove: function (actionVars) {
      $('#' + actionVars.object_id).fadeOut(actionVars.timeOut, function () {
        $(this).remove();
      })
    },
    waitAndCloseFancybox: function (actionVars) {
      
      setTimeout(function () {
        OB.closeFancybox(actionVars)
      }, actionVars.timeOut);
    },
    closeFancybox: function (actionVars) {
      $.fancybox.close();
    },
    waitAndRemove: function (actionVars) {
      setTimeout(function () {
        OB.fadeOutAndRemove(actionVars)
      }, actionVars.timeOut);
    },
    generateImageByGrado: function (grado, callback) {
      if (grado != '' && OB.imagesGenerated[grado] == '') {
        if (!OB.generatingImage) {
          OB.showError($('#step-7-0'), 'Generando la imagen');
          OB.generatingImage = true;
          imageData = $('#grado-' + grado).attr('src');
          $.post(jsObject.ajaxUrl, {
            action: 'saveImage',
            imageData: imageData
          }, function (response) {

            if (response.success) {
              OB.hideError();
              OB.imagesGenerated[grado] = response.image_url;
              if (typeof callback != 'undefined') {
                callback();
              }
            } else {
              OB.showError($('#step-7-0'), 'Ocurrio un error al guardar tu imagen. Por favor intenta mas tarde');
              setTimeout(OB.hideError, 5000);
            }
            OB.generatingImage = false;
          }, 'json').error(function () {
            OB.showError($('#step-7-0'), 'Ocurrio un error al guardar tu imagen. Por favor intenta mas tarde');
            setTimeout(OB.hideError, 5000);
            OB.generatingImage = false;
          });
        }
      } else {
        if (typeof callback != 'undefined') {
          callback();
        }
      }
    },
    publishOnFacebook: function (grado) {
      var shareOpenGraph = function () {
        OB.FB.ui({
          method: 'share_open_graph',
          action_type: jsObject.facebook_namespace + ':wear',
          action_properties: JSON.stringify({
            'pair_of_glasses': {
              'og:url': jsObject.baseUrl,
              'og:title': jsObject.siteTitle,
              'og:type': jsObject.facebook_namespace + ':pair_of_glasses',
              'og:image': OB.imagesGenerated[grado],
              'fb:app_id': jsObject.facebook_app_id
            }
          })
        }, function (fbResponse) {

        });
      };
      OB.generateImageByGrado(grado, shareOpenGraph);

    },
    takePicture: function () {
      OB.selfieContext.drawImage(OB.video, 0, 0, OB.videoWidth, OB.videoHeight);
      var data = OB.selfieCanvas.toDataURL('image/png');
      if ($('#output img').length === 0) {
        var image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = function () {
          $('#output').append(this);
          $('#output').addClass('active');
          OB.imageObject = this;
        };
        image.src = data;

      } else {
        OB.clearPicture();
        OB.takePicture();
      }
    },
    clearPicture: function () {

      $('#output').removeClass('active');
      $('#output img').remove();
      OB.imageObject = new Image();
      OB.imageObject.crossOrigin = "anonymous";
    },
    loadCamera: function () {

      var objStri = OB.currentStep + '-' + OB.currentSubStep;
      // Cross browser
      navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

      if (!navigator.getUserMedia) {
        OB.showError($('#step-' + objStri), 'Tu browser no soporta la captura de video.');
      } else {
        OB.startGetUserMedia();
      }
    },
    startGetUserMedia: function () {
      // Cross browser
      navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

      navigator.getUserMedia({
        video: true,
        audio: false
      },
      function (stream) {

        // Cross browser checks
        var url = window.URL || window.webkitURL;
        OB.video.src = url ? url.createObjectURL(stream) : stream;
        // Set the video to play
        OB.video.play();
        OB.cameraStream = stream;
        OB.cameraStarted = true;
      }, function (error) {
        var objStri = OB.currentStep + '-' + OB.currentSubStep;
        OB.showError($('#step-' + objStri), 'No se detecto ningun dispositivo.');
      });

      OB.video.addEventListener('canplay', function (event) {
        if (!OB.streaming) {
          OB.videoWidth = OB.video.videoWidth;
          OB.videoHeight = OB.video.videoHeight;
          OB.selfieCanvas.setAttribute('width', OB.video.videoWidth);
          OB.selfieCanvas.setAttribute('height', OB.video.videoHeight);
          OB.selfieContext.translate(OB.video.videoWidth, 0);
          OB.selfieContext.scale(-1, 1);
          OB.streaming = true;
        }
      })

    },
    loadImageFromDevice: function () {
      $('#uploadImage').find('input[name="photo"]').trigger('click');
    },
    canUserContinue: function () {
      var canContinue = false;

      switch (parseInt(OB.currentStep)) {
        case 0:
          canContinue = true;
          break;
        case 1:
          canContinue = (OB.currentStyle !== '');
          break;
        case 2:
          canContinue = OB.stepTwoStepVerification();
          break;
        case 3:
          canContinue = true;
          break;
        case 4:
          if (typeof OB.glassesObject !== 'undefined') {
            canContinue = ($(OB.glassesObject).is('img')) && (typeof $(OB.glassesObject).attr('src') !== 'undefined');
          } else {
            canContinue = false;
          }
          break;
        case 6:
          if (typeof OB.filterObject !== 'undefined') {
            canContinue = ($(OB.filterObject).is('img')) && (typeof $(OB.filterObject).attr('src') !== 'undefined');
          } else {
            canContinue = false;
          }
          break;
        case 7:
          canContinue = (OB.currentGrado !== '');
          break;
      }
      return canContinue;
    },
    stepTwoStepVerification: function () {
      var canContinue = false;
      switch (parseInt(OB.currentSubStep)) {
        case 0:
          canContinue = (OB.currentMethodSelection !== "");
          break;
        case 1:
        case 2:
        case 3:
          if (typeof OB.imageObject !== 'undefined') {
            canContinue = ($(OB.imageObject).is('img')) && (typeof $(OB.imageObject).attr('src') !== 'undefined');
          } else {
            canContinue = false;
          }
          break;
      }
      return canContinue;
    },
    showError: function (targetObjToAppend, message) {
      if (targetObjToAppend.find('label.error').length > 0) {
        targetObjToAppend.find('label.error').html(message);
      } else {
        var errorLabel = $('<label/>');
        errorLabel.addClass('error');
        errorLabel.html(message);
        targetObjToAppend.find('.buttons').append(errorLabel);
      }
    },
    showErrorByStep: function () {
      var errorId = OB.currentStep + '-' + OB.currentSubStep;
      OB.showError($('#step-' + errorId), OB.errorByStep[errorId]);
      setTimeout(OB.hideError, 5000);
    },
    hideError: function () {
      var errorId = OB.currentStep + '-' + OB.currentSubStep;
      if ($('#step-' + errorId).find('label.error').length > 0) {
        $('#step-' + errorId).find('label.error').fadeOut(function () {
          $(this).remove();
        });
      }
    },
    slidersObjects: function () {

      $.each($('.bar-element'), function (key, val) {
        var type = $(this).data('type');

        OB.slider[type] = $(this).find('.container');
        OB.slider[type].slider({
          range: "min",
          value: (type === 'zoom') ? 100 : 180,
          min: 0,
          max: (type === 'zoom') ? 200 : 360,
          step: 5,
          slide: function (event, ui) {
            if (type === 'rotate') {
              OB.faceInstance.setAngle(ui.value - 180)
              OB.faceCanvas.renderAll();
            } else {
              OB.faceInstance.scale(ui.value / 100);
              OB.faceCanvas.renderAll();
            }
          },
          change: function (event, ui) {
            if (type === 'rotate') {
              OB.faceInstance.setAngle(ui.value - 180);
              OB.faceCanvas.renderAll();
            } else {
              OB.faceInstance.scale(ui.value / 100);
              OB.faceCanvas.renderAll();
            }
          }
        });

        $(this).find('.controllers').click(function () {
          var position = OB.slider[type].slider("option", "value");
          var step = OB.slider[type].slider("option", "step");
          var sum = $(this).hasClass('minus') ? -step : step;
          OB.slider[type].slider("value", position + sum);
          OB.slider[type].trigger('slidechange');
        });

      });
    },
    getUserMedia: function () {
      return (navigator.getUserMedia || navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia || navigator.msGetUserMedia);
    }
  };

  $(document).ready(OB.construct);


})(jQuery);


