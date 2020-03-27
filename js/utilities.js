$(window).load(function() {
	showDeveloperMessage();
	showDaysInQuarantine();
});

function showDaysInQuarantine() {
	const oneDay = 1000 * 3600 * 24;
	const startQuarantine = new Date(2020, 3, 13, 0, 0);
	const now = new Date();
	const daysDifference = (now.getTime() - startQuarantine.getTime()) / oneDay;
	const daysInQuarantine = Math.abs(Math.trunc(daysDifference));
	$("#daysInQuarantine").text(daysInQuarantine);
}

function showDeveloperMessage() {
	console.clear();
	console.log("Sorry, I cleared console because I wanted show you this message below");
	console.log("Home Meet");
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
