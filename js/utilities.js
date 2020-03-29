$(window).load(function() {
	showDeveloperMessage();
	showDaysInQuarantine();
});

function showDaysInQuarantine() {
	const oneDay = 1000 * 3600 * 24;
	const startQuarantine = new Date(2020, 2, 13, 0, 0);
	const today = Date.now();
	const daysDifference = Math.abs(today - startQuarantine);
	const daysInQuarantine = Math.floor(daysDifference / oneDay);
	$("#daysInQuarantine").text(daysInQuarantine);
}

function showDeveloperMessage() {
	console.clear();
	console.log("Sorry, I cleared console because I wanted show you this message below");
	console.log("Home Meet");
	console.log("Next event 👇");
	$(".when").each(function() {
		console.log(
			"⏱ " +
				$(this)
					.text()
					.trim()
					.replace("\n", "")
					.replace(" 									 ", " ")
		);
	});
}

function loadAsync() {
	const objects = document.getElementsByClassName("asyncImage");

	Array.from(objects).map(item => {
		const img = new Image();

		function applySrc(src) {
			return item.nodeName === "IMG"
				? (item.src = src)
				: (item.style.backgroundImage = `url(${src})`);
		}

		if (item.dataset.lowSrc) {
			applySrc(item.dataset.lowSrc);
		}

		img.src = item.dataset.src;

		img.onload = () => {
			item.classList.remove("asyncImage");
			$("body").fadeIn(2000);
			return applySrc(item.dataset.src);
		};
	});
}

loadAsync();
