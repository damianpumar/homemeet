$(document).ready(function ($) {
	"use strict";

	$("form.register").submit(function (e) {
		e.preventDefault();

		var f = $(this).find(".form-group"),
			ferror = false,
			emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

		f.children("input").each(function () {
			var i = $(this); // current input
			var rule = i.attr("data-rule");

			if (rule !== undefined) {
				var ierror = false; // error flag for current input
				var pos = rule.indexOf(":", 0);
				if (pos >= 0) {
					var exp = rule.substr(pos + 1, rule.length);
					rule = rule.substr(0, pos);
				} else {
					rule = rule.substr(pos + 1, rule.length);
				}

				switch (rule) {
					case "required":
						if (i.val() === "") {
							ferror = ierror = true;
						}
						break;

					case "minlen":
						if (i.val().length < parseInt(exp)) {
							ferror = ierror = true;
						}
						break;

					case "email":
						if (!emailExp.test(i.val())) {
							ferror = ierror = true;
						}
						break;

					case "checked":
						if (!i.attr("checked")) {
							ferror = ierror = true;
						}
						break;

					case "regexp":
						exp = new RegExp(exp);
						if (!exp.test(i.val())) {
							ferror = ierror = true;
						}
						break;
				}
				i.next(".validation")
					.html(
						ierror
							? i.attr("data-msg") !== undefined
								? i.attr("data-msg")
								: "wrong Input"
							: ""
					)
					.show("blind");
			}
		});

		if (ferror) return false;

		const registerButton = $("#register-button");

		registerButton.prop("disabled", true);

		const data = $(this).serialize();

		throwRegisterTemporalSubmit(data);

		$.ajax({
			url: $(this).attr("action"),
			type: $(this).attr("method"),
			crossDomain: true,
			data: data,
			success: function () {
				throwRegisterSuccessSubmit();
				saveUserData();
				refreshUserStatus(data);
			},
			error: function () {
				throwRegisterErrorSubmit(data);
				registerButton.html("Upps! try later please");
				registerButton.delay(2000).queue(function () {
					registerButton.prop("disabled", false);
					registerButton.html("Register");
					registerButton.dequeue();
				});
			}
		});

		return false;
	});
});

$("#register").on("show.bs.modal", function () {
	$(this);
	refreshUserStatus();
	setTimeout(function () {
		$("#register-name").focus();
	}, 500);
});

function saveUserData() {
	localStorage.setItem("user-name", $("#register-name").val());
	localStorage.setItem("user-email", $("#register-email").val());
}

function refreshUserStatus() {
	const userName = localStorage.getItem("user-name");
	const userEmail = localStorage.getItem("user-email");

	if (userName && userEmail) {
		const registerButton = $("#register-button");
		registerButton.prop("disabled", true);
		registerButton.html("Thanks you're registered");

		const name = $("#register-name");
		name.prop("disabled", true);
		name.val(userName);

		const email = $("#register-email");
		email.prop("disabled", true);
		email.val(userEmail);
	}
}
