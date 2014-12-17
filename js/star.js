(function($) {
	var starfive = function(elem, defaults, options) {
		this.opts = $.extend({}, defaults, options);
		this.elem = elem;
		this.elemfive = this.elem.find(".icon-star-fill");
		this.hover = false;
		this.init();
	};

	starfive.prototype = {
		init: function() {
			var _this = this;
			_this.events();
		},
		events: function() {
			var _this = this;
			_this.elemfive.hover(function() {
				_this.hover = true; 
				var $this = $(this);
				$this.addClass("active").prevAll().addClass("active");
			}, function() {
				var $this = $(this);
				$this.removeClass("active").nextAll().removeClass("active");
				if(!!_this.elem.attr("data-num")){
					_this.hover = false;
					var i = parseInt(_this.elem.attr("data-num"));
					_this.elemfive.eq(i).addClass("active").prevAll().addClass("active");
				}
			});


			_this.elemfive.click(function() { 
				var $this = $(this);
				_this.elemfive.removeClass("active");
				$this.addClass("active").prevAll().addClass("active");
				_this.elem.attr("data-num",$this.index());
				_this.hover = false;
				var score = $this.index() + 1;
				$this.parent().parent().find(".star-score-edit").html("("+score+"分)");
				!!_this.opts.hiddenId && _this.opts.hiddenId.attr("value",score);
				
			});
		}
	};

	$.fn.starfive = function(options) {
		var defaults = {
			hiddenId: null
		};

		var $this = $(this);
		if (!$this.selector) {
			return;
		}

		$this.each(function(item, index) {
			new starfive($(this), defaults, options);
		});
	}
})(jQuery);


