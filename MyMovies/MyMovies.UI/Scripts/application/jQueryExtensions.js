﻿$.extend({
	isIE: function () {
		var myNav = navigator.userAgent.toLowerCase();
		return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
	},
	generateUniqID: function (idlength) {
		var charstoformid = '_0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
		if (idlength == null) {
			idlength = 5;
		}
		var uniqid = '';
		for (var i = 0; i < idlength; i++) {
			uniqid += charstoformid[Math.floor(Math.random() * charstoformid.length)];
		}

		return uniqid;
	},
	existsObject: function (chekingObject) {
		return chekingObject != null && chekingObject.length > 0;
	},
	executeFunctionByName: function (functionName) {
		var context = window;
		var args = Array.prototype.slice.call(arguments, 2);
		var namespaces = functionName.split(".");
		var func = namespaces.pop();
		for (var i = 0; i < namespaces.length; i++) {
			context = context[namespaces[i]];
		}
		return context[func].apply(context, args);
	},
	savingDialog: function (header, url, data, saveCallback) {
		var that = this;
		var dialogId = that.generateUniqID();
		
		$("body").append("<div id=\"" + dialogId + "\"></div>");
		var dialogContainer = $("#" + dialogId);
		$(dialogContainer).addClass("modal hide fade");
		var bootstrapDialogMarkup = "<div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>" +
		"<h3>" + header + "</h3>" +
		"</div>" +
		"<div class=\"modal-body\">" +
		"</div>" + "<div class=\"modal-footer\">" +
		"<a href=\"#\" class=\"btn\" id=\"cancelButton\" data-dismiss=\"modal\">Отменить</a>" +
		"<a href=\"#\" class=\"btn btn-primary\" id=\"saveButton\" data-dismiss=\"modal\">Сохранить</a></div>";

		$(dialogContainer).html(bootstrapDialogMarkup);

		$("#" + dialogId + " .modal-body").load(url, data, function () {
			var form = $($.elementId(dialogId) + " .modal-body").find("form");

			$.validator.unobtrusive.parse(form);
			
			$("#saveButton").handle("click", function () {
				if ($(form).valid()) {
					$.post($(form).attr("action"), $(form).serialize(), function(result) {
						saveCallback(result);
						that.closeDialog(dialogId);
					});
				}
				return false;
			});

			$(form).submit(function() {
				if ($(form).valid()) {
					$.post($(form).attr("action"), $(form).serialize(), function (result) {
						saveCallback(result);
						that.closeDialog(dialogId);
					});
				}
				return false;
			});
		});

		$("#" + dialogId).on('hidden', function (element) {
			if ($(element.target).hasClass("modal")) {
			    $("#" + dialogId).removeData('modal');
			    $("#" + dialogId).remove();
			}
		});

		$("#" + dialogId).on('shown', function(element) {
			setTimeout(function () { $(element.target).find("input[type=text]").focus(); }, 1);
		});

		$(dialogContainer).modal();

		return dialogId;
	},
	closeDialog: function (dialogId) {
		$("#" + dialogId).modal('hide');
	},
	elementId: function(id) {
		return "#" + id;
	},
	showValidationErrorMessage: function (element, isValid) {
		var validatingElements = [];

		if (element != null) {
			validatingElements.push(element);;
		} else {
			validatingElements = $("body .input-validation-error");
		}

		$.each(validatingElements, function (index, validatingElement) {
		    $(validatingElement).tooltip('destroy');
			if (!isValid || $(validatingElement).hasClass(".input-validation-error")) {
				var validationMessage = $(element).attr($(validatingElement).getValidationAttribute());
				$(validatingElement).tooltip({title: validationMessage, placement: 'right' });
			}
		});
	}
});
$.fn.extend({
	handle: function (eventName, handler) {
		$(this).off(eventName).on(eventName, handler);
	},
	getValidationAttribute: function () {
		var result = [];
		$(this[0].attributes).each(function (index, attribute) {
			if (attribute.name.match("^data-val-")) {
				result.push(attribute.name);
			}
		});

		return result[0];
	},
});