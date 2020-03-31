window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'UA-97340590-5');

function throwGAEvent(label, value) {
    gtag('event', label, {
        'event_label': label,
        'event_category': 'HomeMeet',
        'value': value
    });
}

const REGISTER_SUCCESS = "[HomeMeet register_success]";
function throwRegisterSuccessSubmit(dataForm) {
    throwGAEvent(REGISTER_SUCCESS, dataForm);
}

const REGISTER_ERROR = "[HomeMeet register_error]";
function throwRegisterErrorSubmit(dataForm) {
    throwGAEvent(REGISTER_ERROR, dataForm);
}

const REGISTER_TEMPORAL = "[HomeMeet register_temporal]";
function throwRegisterTemporalSubmit(dataForm) {
    throwGAEvent(REGISTER_TEMPORAL, dataForm);
}
