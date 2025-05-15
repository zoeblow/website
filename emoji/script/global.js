/* ---------------------------------------------------------------------
	Global Js
	Target Browsers: All

	HEADS UP! This script is for general functionality found on ALL pages and not tied to specific components, blocks, or
	plugins.

	If you need to add JS for a specific block or component, create a script file in js/components or js/blocks and
	add your JS there. (Don't forget to enqueue it!)
------------------------------------------------------------------------ */

var FX = (function (FX, $) {

	/**
	 * Doc Ready
	 *
	 * Use a separate $(function() {}) block for each function call
	 */
	$(() => {
		FX.General.init(); // For super general or super short scripts
	})

	$(() => {
		FX.ExternalLinks.init(); // Enable by default
	})

	$(function () {
		FX.FXButton.init();
		FX.BackToTop.init();
	});

	$(() => {
		FX.FooterSlider.init();
		FX.StickyHeaderNinjaTables.init();
	})

	$(() => {
		FX.StickyHeader.init()

	})

	$(() => {
		FX.SmoothAnchors.init();
	})

	$(() => {
		FX.WistiaTrigger.init();
	})

	$(() => {
		FX.MultistepsGravityForm.init();
	})

	$(() => {
		FX.MakeMenuLabelTabbable.init();
	})

	$(() => {
		FX.ScreenReaderSkipLink.init();
	})

	$(() => {
		FX.HeadingSizeAdjuster.init();
	})

	//Lazy load Youtube iframes
	$(() => {

		if($('iframe').length > 0) {

			$('iframe').each(function() {

				var src = $(this).attr('data-src');

				if(typeof src != 'undefined' && src != null && src != '') {
					$(this).attr('src', src);
					$(this).parent().fitVids();
				}

			});

		}

		//Extra lazy load features
		if($('*[data-lazy-bg-image-url], *[data-lazy-class]').length > 0) {

			$('*[data-lazy-bg-image-url], *[data-lazy-class]').each(function() {

				var lazyBGImageUrl = $(this).attr('data-lazy-bg-image-url');
				var lazyClass = $(this).attr('data-lazy-class');

				if(typeof lazyBGImageUrl != 'undefined' && lazyBGImageUrl != null && lazyBGImageUrl != '') {
					$(this).css('backgroundImage', 'url('+lazyBGImageUrl+')');
				}

				if(typeof lazyClass != 'undefined' && lazyClass != null && lazyClass != '') {
					$(this).addClass(lazyClass);
				}

			});

		}

	});

	FX.WistiaTrigger = {
		init() {
			window._wq = window._wq || [];

			$(document).on( "mouseover", "a.wistia-trigger-video", function(e) {
				// Dont append if present
				if (!$('#fast-wistia-script-js').length) {
					var ev1 = document.createElement('script');
					ev1.src = '//fast.wistia.com/assets/external/E-v1.js';
					ev1.id = 'fast-wistia-script';
					ev1.async = true;
					document.head.appendChild(ev1);
				}
			});

			_wq.push({
				id: "_all", onReady: function(video) {
					FX.Tracking.WistiaVideosTrackingHandler.bindAllTrackingMethods(video);

				}
			});

			$( document ).on( "click", "a.wistia-trigger-video", function(e) {
				var obj = $(this);
				var videoId = obj.data('wistia-id');
				var videoMatcher = obj.data('wistia-matcher');

				//This has been implemented to support the multiple instances of the same video in the same page
				if(typeof videoMatcher != 'undefined' && videoMatcher != null && videoMatcher != '') {
					videoId = videoMatcher;
				}

				var video = Wistia.api(videoId);
				video.play();
			});

		},
	};

	FX.BreadCrumbs = {
		init() {
			var txt= $('.breadcrumbs ul li:last-child a').text();
			var width = $(document).width();
			if (width < 1024) {
				if(txt.length > 50) {
					$('.breadcrumbs ul li:last-child a').text(txt.substring(0,20) + '...');
				}
			}
		},
	};

	FX.BackToTop = {
		$btn: null,

		init() {
			this.$btn = $('.back-to-top');

			if (this.$btn.length) {
				this.bind();
			}
		},

		bind() {
			$(window).on('scroll load', this.maybeShowButton.bind(this));
			this.$btn.on('click', this.scrollToTop);
		},

		maybeShowButton() {
			if ($(window).scrollTop() > 100) {
				this.$btn.fadeIn();
			} else {
				this.$btn.fadeOut();
			}
		},

		scrollToTop() {
			$(window).scrollTop(0);
		}
	};

	FX.FooterSlider = {
		$slider: null,

		init() {
			this.$slider = $('.fx-footer-testi ul')
			if (this.$slider.length) {
				this.applySlider()
			}
		},

		applySlider() {
			this.$slider.bxSlider({
				auto: true,
				adaptiveHeight: true,
				pager: false,
				controls: true,
				minSlides: 1,
				maxSlides: 1,
				touchEnabled: false,
				responsive: true
			});

			$(window).resize( function() {
				setTimeout(function(){
					FX.FooterSlider.$slider.destroySlider();
					FX.FooterSlider.$slider.reloadSlider();
				}, 100)
			});
		}
	}

	/**
	 * General functionality — ideal for one-liners or super-duper short code blocks
	 */
	FX.General = {
		init() {
			this.bind();
		},

		bind() {

			// Makes all PDF to open in new tabs
			$('a[href*=".pdf"]').each(e => {
				$(this).attr('target', '_blank');
			});

			// FitVids - responsive videos
			// $('body').fitVids();

			// Input on focus remove placeholder
			$('input,textarea').focus(() => {
				$(this).removeAttr('placeholder');
			});

			// nav search toggle
			// $('.js-search-toggle').on('click', () => {
			// 	$('.desktop-menu__phone, .js-search-toggle, .desktop-menu__search').toggleClass('js-search-active');
			//     $('.desktop-menu__search input[name="s"]').focus();
			// });

			// nav search toggle
			$('.js-search-toggle').on('click', () => {
				$('.js-search-toggle').toggleClass('js-search-active');
				$('html').toggleClass('show-search-bar');
				$('.search-functionality-wrapper input[name="s"]').focus();
			});

			// nav search toggle close
			$('.close-search-link').on('click', () => {
				$('html').removeClass('show-search-bar');
			});



			// Sticky Sidebar

			var navOffset = 190;
			//Sticky Sidebar for the Blog Posts
			if ($(".two-sidebar-template").length) {
				$('.sticky-sidebar').theiaStickySidebar({
					additionalMarginTop: 120, updateSidebarHeight: true, minWidth: 1200
				});
			} else {
				if ($('.post-sticky-sidebar').length) {

					$('.post-sticky-sidebar').theiaStickySidebar({
						additionalMarginTop: navOffset, updateSidebarHeight: true, disableOnResponsiveLayouts: false
					});

				//Sticky Sidebar for the rest of pages
				} else {

					$('.sticky-sidebar').theiaStickySidebar({
						additionalMarginTop: navOffset
					});

				}

			}

			// bind change event to select
			$('#category-select').on('change', function () {
				var url = $(this).val(); // get selected value
				if (url) { // require a URL
					window.location = url; // redirect
				}
				return false;
			});
		}
	};

	FX.FXButton = {
		init() {
			$('.has-arrow').each(function () {
				if($(this).find('i').length === 0) {
					$(this).append('<i class="ic-fx-arrow-right"></i>');
				}
			});
		},
	};

	/**
	 * Force External Links to open in new window.
	 * @type {Object}
	 */
	FX.ExternalLinks = {
		init() {
		}
	};

	/**
	 *
	 * Sticky Header
	 * @type {Object}
	 */
	FX.StickyHeader = {

		init: function () {
			this.windowHeight = $(window).height();
			this.bind();
		},

		bind: function (e) {
			$(window).on('scroll', this.scroll);
			$(window).on('resize', this.updateWindowHeight);
		},

		scroll: function () {
			var fromTopPx = 200;
			var scrolledFromtop = $(window).scrollTop();

			// if (scrolledFromtop > 150) {
			// 	$('.page-header').addClass('hideheader');
			// } else {
			// 	$('.page-header').removeClass('hideheader');
			// }
			// if (scrolledFromtop > fromTopPx) {
			// 	$('.page-header').addClass('js-scrolled');
			// 	$('.mastheads').addClass('scrolled');
			// 	$('.masthead-inner').addClass('scrolled');
			// } else {
			// 	$('.page-header').removeClass('js-scrolled');
			// 	$('.masthead').removeClass('scrolled');
			// 	$('.masthead-inner').removeClass('scrolled');
			// }
			if (scrolledFromtop > 150) {
                $('.page-header').addClass('hideheader');
                $('.page-content').addClass('scrolled');
            } else {
                $('.page-header').removeClass('hideheader');
                $('.page-content').removeClass('scrolled');
            }
            if (scrolledFromtop > fromTopPx) {
                $('.page-header').addClass('js-scrolled');
            } else {
                $('.page-header').removeClass('js-scrolled');
            }

			// There are instances that StickyHeaderNinjaTables loads first before sticky header loads or vice versa
			// Lets make sure proper offset is set
			FX.StickyHeaderNinjaTables.repositionFloater();
		},
	};

	FX.StickyHeaderNinjaTables = {
		rowsThreshold: 8,
		offsetTopDiff: 100,

		init: function() {
			var $this = this;

			if (jQuery("#fxmenu").length > 0 && jQuery("#fxmenu").height() !== null) {
				$this.offsetTopDiff = jQuery("#fxmenu").height();
			}

			if (jQuery("#wpadminbar").length > 0 && jQuery("#wpadminbar").height() !== null) {
				$this.offsetTopDiff += jQuery("#wpadminbar").height();
			}

			// Detect on page load if sticky menu is present
			var topDiff = (jQuery('.page-header.js-scrolled').length === 0) ? 0 : $this.offsetTopDiff;

			jQuery('table.ninja_footable').each(function(){
				var obj = jQuery(this)

				if (obj.find('tbody tr').length >= $this.rowsThreshold) {
					stickyHead(obj.attr('id'), {ncpth: [1], topDif: topDiff});
				}
			});
		},

		repositionFloater: function() {
			var $this = this;

			jQuery('div[id*="float_footable_"]').each(function(){
				jQuery(this).css('top', $this.offsetTopDiff);
			});
		}
	}

	/**
	 * Affix
	 * Fixes sticky items on scroll
	 * @type {Object}
	 */
	FX.Affix = {

		$body: null,
		$header: null,
		headerHeight: null,
		scrollFrame: null,
		resizeFrame: null,


		init() {
			this.$body = $(document.body);
			this.$header = $('#page-header');
			this.headerHeight = this.$header.outerHeight(true);

			this.bind();
		},


		bind(e) {
			$(window).on('scroll', this.handleScroll.bind(this));
			$(window).on('resize', this.handleResize.bind(this));
		},


		handleScroll(e) {
			var self = this;

			// avoid constantly running intensive function(s) on scroll
			if (null !== self.scrollFrame) {
				cancelAnimationFrame(self.scrollFrame)
			}

			self.scrollFrame = requestAnimationFrame(self.maybeAffixHeader.bind(self))
		},


		handleResize(e) {
			var self = this;

			// avoid constantly running intensive function(s) on resize
			if (null !== self.resizeFrame) {
				cancelAnimationFrame(self.resizeFrame)
			}

			self.resizeFrame = requestAnimationFrame(() => {
				self.headerHeight = self.$header.outerHeight(true);
			})
		},


		maybeAffixHeader() {
			var self = this;

			if (200 < $(window).scrollTop()) {
				self.$body.css('padding-top', self.headerHeight);
				self.$header.addClass('js-scrolled');
			} else {
				self.$body.css('padding-top', 0);
				self.$header.removeClass('js-scrolled');
			}
		}
	};

	FX.MultistepsGravityForm = {
		init() {
			// Initialize the Mutation Observer
			if ($('.fx-multisteps-gf-form_wrapper').length > 0) {
				this.initializeObserver();
				this.phoneInputCursor();
			}
		},

		initializeObserver() {
			// Create a Mutation Observer instance
			const observer = new MutationObserver((mutationsList) => {
				mutationsList.forEach((mutation) => {
					// Check if the mutation is a change in the child nodes of the form wrapper
					if (mutation.type === 'childList') {
						// Handle the DOM changes (e.g., call a function to update placeholders)
						this.updatePlaceholdersAfterDOMChange(mutation.target);
					}
				});
			});

			// Specify the target node to observe (e.g., the document or a specific container)
			const targetNode = document; // You can change this to the appropriate container

			// Configuration options for the observer (observe changes to child nodes)
			const config = { childList: true, subtree: true };

			// Start observing the target node
			observer.observe(targetNode, config);
		},

		updatePlaceholdersAfterDOMChange(container) {
			// Find all <span> elements with class "field-placeholder" within the container
			const placeholders = $(container).find('span.field-placeholder');

			if (placeholders.length > 0) {
				// Loop through each <span> element with class "field-placeholder" within the container
				placeholders.each((index, placeholder) => {
					// Get the data-input-id attribute value
					const inputId = $(placeholder).data('input-id');
					// Find the input element with the matching ID within the container
					const inputValue = $(container).find(`#${inputId}`).val();
					// Update the content of the placeholder with the input value
					$(placeholder).text(inputValue);
				});
			}
		},

		phoneInputCursor() {
			// Add a focus event handler to the input field
			$(document).on('click', '.fx-multisteps-gf-form_wrapper .ginput_container_phone input', function() {
				var value = $(this).val();
				var firstDigitPosition = value.indexOf('_') ; // Find the first underscore character
				if (firstDigitPosition !== -1) {
					// Move the cursor to the first underscore character position
					this.setSelectionRange(firstDigitPosition, firstDigitPosition);
				}

			});
		}
	};

	FX.MakeMenuLabelTabbable = {
		init() {
			$('.ubermenu-submenu > .ubermenu-item > span.ubermenu-target > span.ubermenu-target-title').attr('tabindex', '0');
		}
	};

	FX.ScreenReaderSkipLink = {
		init() {
            $(document).on('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    var skipLink = $('.skip-link-for-screen-reader');
                    skipLink.css({
                        'left': '10px',
                        'top': '10px',
                        'background-color': '#fff',
                        'z-index': '1000',
                        'padding': '5px'
                    });
                }
            });

			// Add click event handler to skip links
			$('.skip-link-for-screen-reader').click(function(event) {
				// Prevent default behavior of the link
				event.preventDefault();

				// Get the href attribute value of the clicked link
				var href = $(this).attr('href');

				// Find the target section within the href element
				var $targetSection = $(href).find('section:eq(1)');

				// Scroll to the target section smoothly if found
				if ($targetSection.length > 0) {
					$('html, body').animate({
						scrollTop: $targetSection.offset().top - 50
					}, 1000); // Adjust the speed of the scrolling as needed
				} else {
					// Scroll to the anchor element smoothly
					$('html, body').animate({
						scrollTop: $(targetId).offset().top + 100
					}, 1000); // Adjust the speed of the scrolling as needed

				}

			});

		}
	};

	/**
	 * FX.SmoothAnchors
	 * Smoothly Scroll to Anchor ID
	 * @type {Object}
	 */
	FX.SmoothAnchors = {
		hash: null,

		init() {
			this.hash = window.location.hash;
			this.bind();
		},

		// Manually binding on specific hrefs that are manipulated after page reload.
		// Doing this WILL PREVENT existing href bindings from getting twice the click event and animation effects.
		manualBinding(contextObj) {
			if (contextObj.length > 0) {
				contextObj.find('a[href^="#"]').not('a[href="#"]').not('.js-no-smooth-anchor').on('click', $.proxy(this.onClick, this));
			}
		},

		bind() {
			$('a[href^="#"]')
				.not('a[href="#"]') // an href of just # throws a JS error
				.not('.js-no-smooth-anchor') // provide a JS class to ignore smooth scrolling
				.on('click', $.proxy(this.onClick, this));
		},

		onClick(e) {
			e.preventDefault();

			var target = $(e.currentTarget).attr('href');

			this.scrollToSmooth(target, $(e.currentTarget));
		},

		scrollToSmooth(target, originalLinkClicked) {

			var pageHeader = $('#page-header');
			var $target = $(target),
				headerHeight = 140;

			$target = ($target.length) ? $target : $(this.hash);

			if ($target.length) {

				//Multiplies by two the header height if the header is not hidden and is not scrolled
				if(pageHeader.length > 0 && !pageHeader.hasClass('hideheader') && !pageHeader.hasClass('js-scrolled')) {

					headerHeight = headerHeight * 2;

				}

				var scrolledDownToAccordionTabbedNavItemFlag = FX.SmoothAnchors.maybeScrollToSmoothToAccordionTabbedNavItem($target, headerHeight, originalLinkClicked);

				//Continues with the original flow if no accordion tabbed nav item was found
				if(!scrolledDownToAccordionTabbedNavItemFlag) {

					var targetOffset = $target.offset().top - headerHeight;

					$('html, body').animate({
						scrollTop: targetOffset
					}, 1000);

				}

				return false;
			}

		},

		maybeScrollToSmoothToAccordionTabbedNavItem(target, headerHeight, originalLinkClicked) {

			var scrollFlag = false;

			if(typeof originalLinkClicked == 'undefined' || originalLinkClicked.hasClass('accordion-tabbed-nav-item')) {
				return scrollFlag;
			}

			//Check if the target is related to a tabbed nav item (link or h3 element with the same id as the target)
			var auxTarget = target.closest('.according-tabbed-section').find('a.accordion-tabbed-nav-item[href="#' + target.attr('id') + '"], h3.accordion-tabbed-nav-item#' + target.attr('id') + ', h4.accordion-tabbed-nav-item#' + target.attr('id'));

			//If auxTarget was found then It scrolls down to the target and programmatically clicks It
			if(auxTarget.length > 0) {

				auxTarget = $(auxTarget.get(0));

				var isAccordionBlock = true;
				var accordionTemplate = 'traditional';

				if(auxTarget.closest('.according-tabbed-section.tabbed-mode').length > 0) {
					isAccordionBlock = false;
				}

				if(isAccordionBlock) {

					if(auxTarget.closest('.according-tabbed-section.accordion-mode.modern1-template').length > 0) {
						accordionTemplate = 'modern1-template';
					}

				}

				var targetOffset = auxTarget.closest('.according-tabbed-section').offset().top - headerHeight;

				if(isAccordionBlock && accordionTemplate == 'traditional' && !auxTarget.hasClass('active')) {

					$(auxTarget).click();

				} else if(isAccordionBlock && accordionTemplate == 'modern1-template' && $(auxTarget).closest('div._panel.active').length == 0) {

					$(auxTarget).find('a').click();

				}

				//A timeout to wait that the panel gets opened completetely to grab the right target offset
				setTimeout(function() {

					//This is for the Accordions - See the accordion-section block
					if(isAccordionBlock) {
						targetOffset = auxTarget.offset().top - headerHeight;
					}

					$('html, body').animate({
						scrollTop: targetOffset
					}, 1000);

				}, 200);

				setTimeout(function() {

					if(!isAccordionBlock) {

						$(auxTarget).click();

					}

				}, 1100);

				scrollFlag = true;

			}

			return scrollFlag;

		}

	};

	/**
	 * HeadingSizeAdjuster
	 * Monitors H1 headings and applies the 'compact-heading' class to those exceeding 3 lines
	 * Only applies on screens larger than 1024px
	 * This helps maintain consistent typography and improves readability for long headings
	 * @type {Object}
	 */
	FX.HeadingSizeAdjuster = {
		/**
		 * Initialize the heading size adjuster
		 * Sets up event listeners and processes headings on page load
		 */
		init() {
			this.processAllHeadings();
			$(window).on('resize', this.processAllHeadings.bind(this));
		},

		/**
		 * Process all H1 headings in the document
		 * Finds each H1 element and adjusts its class based on content height
		 * Only applies on screens larger than 1024px
		 */
		processAllHeadings() {
			// Only apply on screens larger than 1024px
			if (window.innerWidth <= 1024) {
				this.resetAllHeadings();
				return;
			}

			const self = this;
			$('h1').each(function() {
				self.adjustHeadingClass($(this));
			});
		},

		/**
		 * Reset all headings by removing the compact-heading class
		 */
		resetAllHeadings() {
			$('h1').removeClass('compact-heading');
		},

		/**
		 * Calculate the effective line height of an element
		 * @param {jQuery} $element - The element to check
		 * @return {number} The calculated line height in pixels
		 */
		getEffectiveLineHeight($element) {
			const lineHeight = parseInt($element.css('line-height'));
			// If line-height is not specified in px, use a reasonable estimate
			return isNaN(lineHeight) ? parseFloat($element.css('font-size')) * 1.5 : lineHeight;
		},

		/**
		 * Check if a heading spans multiple lines beyond the threshold
		 * @param {jQuery} $heading - The heading element to check
		 * @param {number} lineThreshold - Maximum number of lines before applying compact class (default: 3)
		 * @return {boolean} True if heading exceeds the line threshold
		 */
		isMultilineHeading($heading, lineThreshold = 3) {
			const headingHeight = $heading.height();
			const effectiveLineHeight = this.getEffectiveLineHeight($heading);
			return headingHeight > (effectiveLineHeight * lineThreshold);
		},

		/**
		 * Add or remove the compact-heading class based on heading size
		 * @param {jQuery} $heading - The heading element to adjust
		 */
		adjustHeadingClass($heading) {
			if (this.isMultilineHeading($heading)) {
				$heading.addClass('compact-heading');
			} else {
				$heading.removeClass('compact-heading');
			}
		}
	};

	return FX;

}(FX || {}, jQuery));
