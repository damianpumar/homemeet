window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'UA-97340590-5');

function throwGAEvent(label) {
    gtag('event', label, {
        'event_label': label,
        'event_category': 'HomeMeet'
    });
}

const REGISTER_SUCCESS = "[HomeMeet register_success]";
function throwRegisterSuccessSubmit() {
    throwGAEvent(REGISTER_SUCCESS);
}

const REGISTER_ERROR = "[HomeMeet register_error]";
function throwRegisterErrorSubmit() {
    throwGAEvent(REGISTER_ERROR);
}

const REGISTER_TEMPORAL = "[HomeMeet register_temporal]";
function throwRegisterTemporalSubmit() {
    throwGAEvent(REGISTER_TEMPORAL);
}
