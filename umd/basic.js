/* @preserve built on: 2022-11-02T11:08:12.995Z */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jss'), require('lodash'), require('mithril'), require('mithril/stream'), require('luxon'), require('@sdxmessaging/ui-widgets'), require('pdfjs-dist'), require('js-sha256'), require('pdf-lib'), require('gsap'), require('gsap/ScrollToPlugin'), require('pusher-js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'jss', 'lodash', 'mithril', 'mithril/stream', 'luxon', '@sdxmessaging/ui-widgets', 'pdfjs-dist', 'js-sha256', 'pdf-lib', 'gsap', 'gsap/ScrollToPlugin', 'pusher-js'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.uiBuilder = {}, global.jss, global._, global.m, global.m.stream, global.luxon, global.uiWidgets, global.pdfjsLib, global.sha256, global.PDFLib, global.gsap, global.ScrollToPlugin, global.Pusher));
})(this, (function (exports, jss, lodash, m, stream, luxon, uiWidgets, PDFJS, jsSha256, pdfLib, gsap$2, ScrollToPlugin, Pusher) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var jss__default = /*#__PURE__*/_interopDefaultLegacy(jss);
    var lodash__default = /*#__PURE__*/_interopDefaultLegacy(lodash);
    var m__default = /*#__PURE__*/_interopDefaultLegacy(m);
    var stream__default = /*#__PURE__*/_interopDefaultLegacy(stream);
    var PDFJS__default = /*#__PURE__*/_interopDefaultLegacy(PDFJS);
    var gsap__default = /*#__PURE__*/_interopDefaultLegacy(gsap$2);
    var ScrollToPlugin__default = /*#__PURE__*/_interopDefaultLegacy(ScrollToPlugin);
    var Pusher__default = /*#__PURE__*/_interopDefaultLegacy(Pusher);

    const classMapper = {
        uiAgGridHeader: 'ag-header',
        uiAgGridHeaderCell: 'ag-header-cell',
        uiAgGridHeaderIcon: 'ag-icon',
        uiAgGridHeaderCellContainer: 'ag-cell-label-container',
        uiAgGridWrapper: 'ag-root-wrapper',
        uiAgGridColsClipper: 'ag-center-cols-clipper',
        uiAgGridCell: 'ag-cell',
        uiAgGridThemeAlpine: 'ag-theme-alpine',
        uiAgGridBodyViewport: 'ag-body-viewport'
    };
    function jssPluginAgGridClassMapper() {
        function onProcessStyle(style, rule, sheet) {
            if (rule.type !== 'style')
                return style;
            if (rule.id && classMapper[rule.id.replace(/(-\d+)*/g, "")] && sheet) {
                const importantStyle = lodash__default["default"].reduce(lodash__default["default"].entries(rule.style), (acc, [key, value]) => {
                    acc[key] = value + " !important";
                    return acc;
                }, {});
                const r = sheet.addRule(classMapper[rule.id.replace(/(-\d+)*/g, "")], importantStyle, {
                    selector: '.' + classMapper[rule.id.replace(/(-\d+)*/g, "")],
                });
                r.id = classMapper[rule.id];
            }
            return style;
        }
        return { onProcessStyle };
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    function jssIncreaseSpecificity(userOptions) {
        const options = lodash__default["default"].assign({ repeat: 2 }, userOptions);
        const prefix = Array(options.repeat).join(':not(#\\20)');
        return {
            onProcessRule: (rule, sheet) => {
                const parent = rule.options.parent;
                if (sheet.options.increaseSpecificity === false ||
                    rule.type !== 'style' ||
                    (parent && parent.type === 'keyframes') ||
                    rule.selectorText.search(':not(#\\20)') !== -1)
                    return;
                rule.selectorText = prefix + rule.selectorText;
            }
        };
    }

    const psuedoElems = ["after", "before", "first-line", "first-letter", "selection", "placeholder"];
    const psuedoSelectors = ["active", "checked", "disabled", "empty", "enabled", "first-child", "first-of-type", "focus", "hover", "in-range", "invalid", "last-child", "last-of-type", "link", "not", "only-of-type", "only-child", "optional", "out-of-range", "read-only", "read-write", "required", "root", "target", "valid", "visited"];
    const indexedSelectors = ["nth-child", "nth-last-child", "nth-last-of-type", "nth-of-type"];
    const deliniators = [
        { "-space-": " ", "-space": " ", "space-": " ", "space": " " },
        { "-dot-": ".", "-dot": ".", "dot-": ".", "dot": "." },
        { "-dash-": "-", "-dash": "-", "dash-": "-", "dash": "-" },
        { "-chevron-": " > ", "-chevron": " > ", "chevron-": " > ", "chevron": " > " },
        { "-hash-": "#", "-hash": "#", "hash-": "#", "hash": "#" },
        { "-star-": "*", "-star": "*", "star-": "*", "star": "*" },
        { "-colon-": ":", "-colon": ":", "colon-": ":", "colon": ":" },
        { "-equals-": "=", "-equals": "=", "equals-": "=", "equals": "=" },
        { "-sbo-": "[", "-sbo": "[", "sbo-": "[", "sbo": "[" },
        { "-sbc-": "]", "-sbc": "]", "sbc-": "]", "sbc": "]" }
    ];
    const _selectorFunction = (key) => {
        const selector = lodash__default["default"].find(indexedSelectors, (entry) => key.search(entry) !== -1);
        if (selector) {
            const index = key.slice(selector.length + 1);
            return `:${key.slice(0, selector.length)}(${index})`;
        }
        return key;
    };
    const _replaceDeliniators = (key) => {
        return lodash__default["default"].reduce(deliniators, (string, deliniatorGroup) => {
            string = !string ? key : string;
            lodash__default["default"].forEach(lodash__default["default"].entries(deliniatorGroup), ([deliniator, value]) => {
                const firstInstance = string.search(deliniator);
                const regx = new RegExp(deliniator, "g");
                if (firstInstance !== -1) {
                    //Only replace the first instance
                    if (firstInstance === 0) {
                        string = string.replace(deliniator, value);
                    }
                    const secondInstance = string.search(deliniator);
                    //Replace all futher instances or where the instance is not at the begging of the string
                    if (secondInstance || firstInstance !== 0) {
                        string = string.replace(regx, value);
                    }
                    //replace spaces to be only ever single spaced
                    string = string.replace(/ +/, " ");
                }
            });
            return string;
        }, "");
    };
    const _addPsudoSelectors = (key, parent) => {
        let mutatedKey = key;
        psuedoElems.forEach((selector) => mutatedKey = mutatedKey.replace(new RegExp(selector, 'g'), "::" + selector));
        psuedoSelectors.forEach((selector) => {
            const carefulSelectors = ["valid", "last-child", "last-of-type"];
            if (carefulSelectors.indexOf(selector) === -1) {
                mutatedKey = mutatedKey.replace(new RegExp(selector, "g"), ":" + selector);
            }
            //Carefully handle selectors that contain part sof other selectors
            else {
                if (selector === "valid" && key.search("invalid") && key.search("valid") !== key.search("invalid") - 2) {
                    mutatedKey = mutatedKey.replace(new RegExp(selector, "g"), ":" + selector);
                }
                else if (selector !== "valid" && carefulSelectors.indexOf(selector) !== -1) {
                    if (key.search('nth-' + selector) !== key.search(selector) - 4) {
                        mutatedKey = mutatedKey.replace(new RegExp(selector, "g"), ":" + selector);
                    }
                }
            }
        });
        mutatedKey = _selectorFunction(mutatedKey);
        return `${parent}${mutatedKey}`;
    };
    function _replaceParentRefs(prop, parent) {
        const deliniaitedKey = _replaceDeliniators(prop);
        return _addPsudoSelectors(deliniaitedKey, parent);
    }
    function jssPluginPsuedo() {
        function onProcessStyle(style, rule) {
            if (rule.type !== 'style')
                return style;
            const container = rule.options.parent;
            lodash__default["default"].forEach(style, (value, key) => {
                if (typeof value !== "string" && typeof value === "object") {
                    const selector = _replaceParentRefs(key, rule.selector);
                    const hyphenatedValue = lodash__default["default"].reduce(value, (acc, val, valKey) => {
                        acc[lodash__default["default"].kebabCase(valKey)] = val;
                        return acc;
                    }, {});
                    container.addRule(selector, hyphenatedValue, { selector });
                    delete style[key];
                }
            });
            return style;
        }
        return { onProcessStyle };
    }

    const mediaNS = "@media screen and (min-width:30em)";
    const mediaM = "@media screen and (min-width:30em) and (max-width: 60em)";
    const mediaL = "@media screen and (min-width:60em)";
    /** SETUP JSS */
    jss__default["default"].use(jssPluginPsuedo(), jssPluginAgGridClassMapper());
    const defaultSheet = jss__default["default"].createStyleSheet({});
    function kebabifyStyle(style) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return lodash__default["default"].mapKeys(style, (_, key) => lodash__default["default"].kebabCase(key));
    }
    function pushClass(classList, classStr) {
        if (classStr) {
            classList.push(classStr);
        }
    }
    function createRule(styleSheet, key, style) {
        if (style) {
            const rule = styleSheet.addRule(key, kebabifyStyle(style));
            return rule.id;
        }
        else {
            return "";
        }
    }
    function createResponsiveRule(styleSheet, key, media, style) {
        if (style) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const rule = styleSheet.addRule(media, { [key]: kebabifyStyle(style) });
            return rule.getRule(key).id;
        }
        else {
            return "";
        }
    }
    function updateRule(styleSheet, key, style) {
        if (style) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const rule = styleSheet.update(key, kebabifyStyle(style));
            return rule.id || rule.getRule(key).id;
        }
        else {
            return "";
        }
    }
    function updateResponsiveRule(styleSheet, key, style) {
        if (style) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const rule = styleSheet.update(key, kebabifyStyle(style));
            return rule.getRule(key).id;
        }
        else {
            return "";
        }
    }
    function createResponsiveClass({ style = {}, styleNS, styleM, styleL, classes, key = "unnamed" }, uiSheet) {
        const _uiSheet = uiSheet ? uiSheet : defaultSheet;
        const classList = [];
        const canUpdate = Boolean(key !== "unnamed" && _uiSheet.getRule(key));
        // Create/update class
        if (canUpdate) {
            pushClass(classList, updateRule(_uiSheet, key, style));
            pushClass(classList, updateResponsiveRule(_uiSheet, key, styleNS));
            pushClass(classList, updateResponsiveRule(_uiSheet, key, styleM));
            pushClass(classList, updateResponsiveRule(_uiSheet, key, styleL));
        }
        else {
            pushClass(classList, createRule(_uiSheet, key, style));
            pushClass(classList, createResponsiveRule(_uiSheet, key, mediaNS, styleNS));
            pushClass(classList, createResponsiveRule(_uiSheet, key, mediaM, styleM));
            pushClass(classList, createResponsiveRule(_uiSheet, key, mediaL, styleL));
        }
        if (classList.length && !uiSheet) {
            _uiSheet.attach();
        }
        pushClass(classList, classes);
        return classList.join(" ");
    }
    const applyThemeJss = jss.create({
        plugins: [jssPluginAgGridClassMapper(), jssPluginPsuedo(), jssIncreaseSpecificity()]
    });
    class ResponsiveThemeHandler {
        constructor(applyTheme) {
            this._classes = {};
            this.uiSheet = applyThemeJss.createStyleSheet({});
            this.applyTheme = applyTheme;
            this.createClasses();
        }
        get classes() {
            return this._classes;
        }
        createClasses() {
            lodash__default["default"].each(this.applyTheme, (themeObj, key) => {
                this._classes[key] = createResponsiveClass(lodash__default["default"].assign({ key: key, increaseSpecificity: true }, themeObj), this.uiSheet);
            });
            this.uiSheet.attach();
        }
        update(applyTheme) {
            if (!lodash__default["default"].isEqual(this.applyTheme, applyTheme)) {
                this.applyTheme = applyTheme;
                this.uiSheet.detach();
                this.createClasses();
            }
        }
    }
    function joinClasses(arr) {
        return lodash__default["default"].compact(arr).join(" ");
    }
    function buttonContextMapper(context) {
        switch (context) {
            case "default" /* ColorContext.default */:
                return "alt" /* ColorContext.alt */;
            case "alt" /* ColorContext.alt */:
                return "default" /* ColorContext.default */;
            case "altLighter" /* ColorContext.altLighter */:
                return "lighter" /* ColorContext.lighter */;
            case "altDarker" /* ColorContext.altDarker */:
                return "darker" /* ColorContext.darker */;
            case "darker" /* ColorContext.darker */:
                return "altDarker" /* ColorContext.altDarker */;
            case "lighter" /* ColorContext.lighter */:
                return "altLighter" /* ColorContext.altLighter */;
            case "warn" /* ColorContext.warn */:
                return "neutral" /* ColorContext.neutral */;
            case "error" /* ColorContext.error */:
                return "neutral" /* ColorContext.neutral */;
            default: return "neutral" /* ColorContext.neutral */;
        }
    }

    function parseIso(timeStr) {
        return luxon.DateTime.fromISO(timeStr).valueOf();
    }
    function formatDate(timeValue, mask = "D") {
        const dt = luxon.DateTime.fromMillis(timeValue);
        return dt.isValid ? dt.toFormat(mask, { locale: "en-GB" }) : "-";
    }
    function formatTime(timeValue, mask = "HH:mm") {
        return formatDate(timeValue, mask);
    }
    function getISODate() {
        return luxon.DateTime.now().toISODate();
    }
    function humaniseTimeValue(timeValue) {
        const today = luxon.DateTime.now().startOf("day");
        const diffDays = luxon.DateTime.fromMillis(timeValue).startOf("day")
            .diff(today, "day").get("days");
        switch (diffDays) {
            case -1: return "Yesterday";
            case 0: return "Today";
            case 1: return "Tomorrow";
            default: return formatDate(timeValue);
        }
    }
    function parseDateStr(timeStr) {
        try {
            return timeStr ? humaniseTimeValue(parseIso(timeStr)) : "-";
        }
        catch (_a) {
            return "-";
        }
    }
    function parseTimeStr(timeStr) {
        try {
            return timeStr ? formatTime(parseIso(timeStr)) : "-";
        }
        catch (_a) {
            return "-";
        }
    }
    function parseDateTimeStr(timeStr) {
        try {
            if (timeStr) {
                const timeValue = parseIso(timeStr);
                return `${humaniseTimeValue(timeValue)}, ${formatTime(timeValue)}`;
            }
            else {
                return "-";
            }
        }
        catch (_a) {
            return "-";
        }
    }
    function parseDateValue(timeValue) {
        try {
            return timeValue ? humaniseTimeValue(timeValue) : "-";
        }
        catch (_a) {
            return "-";
        }
    }
    function parseTimeValue(timeValue) {
        try {
            return timeValue ? formatTime(timeValue) : "-";
        }
        catch (_a) {
            return "-";
        }
    }
    function parseDateTimeValue(timeValue) {
        try {
            if (timeValue) {
                return `${humaniseTimeValue(timeValue)}, ${formatTime(timeValue)}`;
            }
            else {
                return "-, -";
            }
        }
        catch (_a) {
            return "-, -";
        }
    }

    function tinyDevice() {
        return window.matchMedia("only screen and (max-width: 360px)").matches;
    }
    function smallDevice() {
        return window.matchMedia("only screen and (max-width: 768px)").matches;
    }
    function pickByProperty(list, prop) {
        return lodash__default["default"].find(list, lodash__default["default"].matches(prop));
    }
    function pickById(list, id) {
        return lodash__default["default"].find(list, lodash__default["default"].matches({ _id: id }));
    }
    /**
     * Variant of pickById accepting stream values, and returning a stream
     */
    function pickByIdStream(listStream, idStream, defaultValue) {
        return stream__default["default"].lift((list, id) => pickById(list, id) || defaultValue, listStream, idStream);
    }
    function filterByProperty(list, prop) {
        return lodash__default["default"].filter(list, lodash__default["default"].matches(prop));
    }
    /**
     * Mutates input list, returns array of removed items
     */
    function removeByProperty(list, prop) {
        return lodash__default["default"].remove(list, lodash__default["default"].matches(prop));
    }
    function itemTagsOr(testTags, { tags }) {
        return lodash__default["default"].some(testTags, (tag) => lodash__default["default"].some(tags, tag));
    }
    function itemTagsAnd(testTags, { tags }) {
        return lodash__default["default"].every(testTags, (tag) => lodash__default["default"].some(tags, tag));
    }
    function itemsForCategory(itemList, hasTags, matchAll = false) {
        if (hasTags.length === 0) {
            return itemList;
        }
        const filterFn = lodash__default["default"].partial(matchAll ? itemTagsAnd : itemTagsOr, hasTags);
        return lodash__default["default"].filter(itemList, (item) => {
            if (filterFn(item)) {
                const category = item;
                return category.hideEmpty
                    ? itemsForCategory(itemList, category.content, category.contentAll).length > 0
                    : true;
            }
            return false;
        });
    }
    function canEdit({ readonly, disabled }) {
        return !(readonly || disabled);
    }
    // Test given primitive is truthy or array has > 0 elements
    function hasValue(value) {
        return Boolean(lodash__default["default"].isArray(value) ? value.length : value);
    }
    /**
     * Create object reflecting key, value pairs from a given map
     */
    function mapToObject(map) {
        // Use Object.fromEntries with ES2019 target
        const acc = {};
        map.forEach((value, key) => acc[key] = value);
        return acc;
    }
    /**
     * Set values in a given map from an object
     */
    function setMap(map, set) {
        lodash__default["default"].forEach(set, (value, key) => map.set(key, value));
    }
    /**
     * Express a given number of bytes as Kilobytes or Megabytes where appropriate
     */
    function humaniseByteCount(numBytes) {
        if (numBytes < 1000 /* byteSize.kilo */) {
            return `${numBytes} bytes`;
        }
        else if (numBytes < 1000000 /* byteSize.mega */) {
            return `${lodash__default["default"].round(numBytes / 1000 /* byteSize.kilo */)}Kb`;
        }
        else {
            return `${lodash__default["default"].round(numBytes / 1000000 /* byteSize.mega */)}Mb`;
        }
    }
    /**
     * Extract field(s) from item props
     * A single field will be returned as its respective TProp type
     * Multiple fields will be joined into a space delimited string
     */
    function extractFields(item, fieldList, category) {
        if (category) {
            return item.label;
        }
        const { props } = item;
        return fieldList.length === 1 ? props[fieldList[0]] : lodash__default["default"](fieldList)
            .map((field) => props[field])
            .compact().value().join(" ");
    }
    /**
     * Pass-through function for replacing m.request "deserialize" JSON parsing default
     */
    function simpleResponse(value) {
        return value;
    }
    const mimeTypeMap = {
        "application/zip": {
            icon: "fal fa-file-archive", ext: ".zip"
        },
        "application/pdf": {
            icon: "fal fa-file-pdf", ext: ".pdf"
        },
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
            icon: "fal fa-file-word", ext: ".docx"
        },
        "application/msword": {
            icon: "fal fa-file-word", ext: ".doc"
        },
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
            icon: "fal fa-file-excel", ext: ".xlsx"
        },
        "application/vnd.ms-excel": {
            icon: "fal fa-file-excel", ext: ".xls"
        },
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
            icon: "fal fa-file-powerpoint", ext: ".pptx"
        },
        "application/vnd.ms-powerpoint": {
            icon: "fal fa-file-powerpoint", ext: ".ppt"
        },
        "image/jpeg": {
            icon: "fal fa-file-image", ext: ".jpeg"
        },
        "image/png": {
            icon: "fal fa-file-image", ext: ".png",
        },
        "image/gif": {
            icon: "fal fa-file-image", ext: ".gif"
        },
        "image/tiff": {
            icon: "fal fa-file-image", ext: ".tiff"
        },
        "audio/mpeg": {
            icon: "fal fa-file-audio", ext: ".mp3"
        },
        "video/mpeg": {
            icon: "fal fa-file-video", ext: ".mpeg"
        },
        "video/quicktime": {
            icon: "fal fa-file-video", ext: ".mov"
        },
        "video/x-msvideo": {
            icon: "fal fa-file-video", ext: ".avi"
        }
    };
    function fileIcon(fileType) {
        if (mimeTypeMap.hasOwnProperty(fileType)) {
            return mimeTypeMap[fileType].icon;
        }
        else {
            return "fal fa-file-alt";
        }
    }
    function fileExt(fileType) {
        if (mimeTypeMap.hasOwnProperty(fileType)) {
            return mimeTypeMap[fileType].ext;
        }
        else {
            return "";
        }
    }
    function fileExtNameOnly(fileType) {
        const ext = fileExt(fileType);
        return ext ? ext.substring(1) : ext;
    }
    /**
     * Provide user-friendly presentation of some file metadata properties
     */
    function getFileValue(file, property, iconClass = "") {
        if (property === "size") {
            return humaniseByteCount(file.size);
        }
        else if (property === "lastModified") {
            return parseDateTimeValue(file.lastModified);
        }
        else if (property === "type") {
            return m__default["default"](`i.fal.fa-fw${iconClass}`, {
                title: file.type,
                class: fileIcon(file.type)
            });
        }
        else {
            return file[property];
        }
    }
    /**
     * Get an array of files
     * @param files IDataItem file array
     * @param prop file property to match
     */
    function getFiles(files, prop) {
        return lodash__default["default"].map(filterByProperty(files, { prop }), (file) => {
            const { _id: guid, name } = file;
            return {
                guid,
                name,
                path: file.remoteUrl
            };
        });
    }
    /**
     * Get a stream of files
     * @param files IDataItem file array
     * @param field TField identifying files
     */
    function getFileStream(files, { id }) {
        return stream__default["default"](getFiles(files, id));
    }
    /**
     * Get a property
     * @param props IDataItem property map
     * @param key TField key to match
     */
    function getProp(props, key) {
        return lodash__default["default"].get(props, key);
    }
    function streamArrayPush(inStream, value) {
        const _arr = inStream();
        _arr.push(value);
        inStream(_arr);
    }
    function streamArrayPullAt(inStream, indexes) {
        const _arr = inStream();
        const pulled = lodash__default["default"].pullAt(_arr, indexes);
        inStream(_arr);
        return pulled;
    }
    /**
     * Get a property stream
     * @param props IDataItem property map
     * @param field TField identifying prop
     */
    function getPropStream(props, { id }) {
        const propVal = getProp(props, id);
        return propVal ? stream__default["default"](propVal) : stream__default["default"]();
    }
    function deepMerge(object, source) {
        if (source) {
            if (typeof object !== "object" || typeof object !== typeof source || lodash__default["default"].isArray(object) !== lodash__default["default"].isArray(source)) {
                throw new Error("deepMerge only supports arrays and objects and cannot merge objects of different types.");
            }
            const accumulator = lodash__default["default"].isArray(object) ? [] : {};
            const keys = lodash__default["default"].uniq([...lodash__default["default"].keys(object), ...lodash__default["default"].keys(source)]);
            return lodash__default["default"].reduce(keys, (acc, key) => {
                if (key in source && !lodash__default["default"].isUndefined(source[key])) {
                    if (typeof object[key] === "object") {
                        acc[key] = deepMerge(object[key] || {}, source[key]);
                    }
                    else {
                        acc[key] = source[key];
                    }
                }
                else {
                    acc[key] = object[key];
                }
                return acc;
            }, accumulator);
        }
        return object;
    }

    // Registered cell renderers
    const cellRendererMap = {};
    // Registered component map
    const componentMap = {};
    function registerComponent(type, component) {
        if (type in componentMap) {
            throw new Error(`Component ${type} is already registered`);
        }
        else {
            componentMap[type] = component;
        }
    }
    function registerCellRenderer(type, component) {
        if (type in cellRendererMap) {
            throw new Error(`Cell Renderer ${type} is already registered`);
        }
        else {
            cellRendererMap[type] = component;
        }
    }
    function buildComponent({ type, data, style, styleNS, styleM, styleL, classes }) {
        const mergedClasses = createResponsiveClass({ style, styleNS, styleM, styleL, classes });
        if (type in componentMap) {
            return m__default["default"](componentMap[type], { type, data, classes: mergedClasses });
        }
        else {
            return m__default["default"]("span", `Unknown component type: ${type}`);
        }
    }
    function buildComponentList(list) {
        return lodash__default["default"].map(list, (comp) => buildComponent(comp));
    }

    function getValuePositions(string) {
        const positions = [];
        let start, lastEnd = 0;
        while ((start = string.indexOf("${", lastEnd)) !== -1) {
            const end = string.indexOf("}", lastEnd) + 1;
            const lastPos = positions[positions.length];
            if (end === 0) {
                throw new Error("Badly formatted tokens!");
            }
            if (start > end) {
                throw new Error("Badly formatted tokens!");
            }
            if (lastPos && lastPos[0] && lastPos[1] && start === lastPos[0] && end === lastPos[1]) {
                throw new Error("Badly formatted tokens!");
            }
            positions.push([start, end]);
            lastEnd = end;
        }
        return positions;
    }
    function replaceTokens(string, tokenMap) {
        const valuePositions = getValuePositions(string);
        return lodash__default["default"].reduceRight(valuePositions, (acc, [start, end]) => {
            const token = acc.slice(start + 2, end - 1);
            const value = tokenMap[token];
            if (value) {
                acc = acc.slice(0, start) + value + acc.slice(end);
            }
            return acc;
        }, string);
    }
    function recursiveReplace(value, tokenMap) {
        if (lodash__default["default"].isString(value)) {
            return replaceTokens(value, tokenMap);
        }
        if (lodash__default["default"].isArray(value)) {
            return lodash__default["default"].map(value, (arrElem) => recursiveReplace(arrElem, tokenMap));
        }
        if (lodash__default["default"].isPlainObject(value)) {
            return lodash__default["default"].mapValues(value, (entryVal) => recursiveReplace(entryVal, tokenMap));
        }
        return value;
    }
    function applyTemplate(tokenMap, template) {
        return recursiveReplace(template, tokenMap);
    }

    function flattenObject(object, root = "", store = {}) {
        lodash__default["default"](object).entries().forEach(([key, value]) => {
            const storeKey = root ? `${root}.${key}` : key;
            if (typeof value === "object") {
                flattenObject(value, storeKey, store);
            }
            else {
                store[storeKey] = value;
            }
        });
        return store;
    }

    function buildTemplates(tokenMapList, templateMap, selectorFunc) {
        return lodash__default["default"].map(tokenMapList, (tokenMap) => applyTemplate(tokenMap, selectorFunc(tokenMap, templateMap)));
    }

    // Index widgets
    const propMap = {
        ["label" /* FieldType.label */]: uiWidgets.Label,
        ["trusted" /* FieldType.trusted */]: uiWidgets.TextareaInput,
        ["hidden" /* FieldType.hidden */]: uiWidgets.BaseInput,
        ["text" /* FieldType.text */]: uiWidgets.BaseInput,
        ["password" /* FieldType.password */]: uiWidgets.PasswordInput,
        ["search" /* FieldType.search */]: uiWidgets.BaseInput,
        ["date" /* FieldType.date */]: uiWidgets.BaseInput,
        ["time" /* FieldType.time */]: uiWidgets.BaseInput,
        ["datetime-local" /* FieldType.dateTimeLocal */]: uiWidgets.BaseInput,
        ["dateInput" /* FieldType.dateInput */]: uiWidgets.DateInput,
        ["cardDate" /* FieldType.cardDate */]: uiWidgets.CardDateInput,
        ["number" /* FieldType.number */]: uiWidgets.BaseInput,
        ["range" /* FieldType.range */]: uiWidgets.BaseInput,
        ["email" /* FieldType.email */]: uiWidgets.BaseInput,
        ["url" /* FieldType.url */]: uiWidgets.BaseInput,
        ["tel" /* FieldType.tel */]: uiWidgets.BaseInput,
        ["color" /* FieldType.color */]: uiWidgets.BaseInput,
        ["currency" /* FieldType.currency */]: uiWidgets.CurrencyInput,
        ["percentage" /* FieldType.percentage */]: uiWidgets.PercentageInput,
        ["textarea" /* FieldType.textarea */]: uiWidgets.TextareaInput,
        ["checkbox" /* FieldType.checkbox */]: uiWidgets.CheckboxInput,
        ["toggle" /* FieldType.toggle */]: uiWidgets.ToggleInput,
        ["select" /* FieldType.select */]: uiWidgets.SelectInput,
        ["radio" /* FieldType.radio */]: uiWidgets.RadioInput
    };
    const fileMap = {
        ["fileMulti" /* FieldType.fileMulti */]: uiWidgets.FileMulti,
        ["file" /* FieldType.file */]: uiWidgets.FileSelect,
        ["imageMulti" /* FieldType.imageMulti */]: uiWidgets.ImageMulti,
        ["image" /* FieldType.image */]: uiWidgets.ImageSelect,
        ["sign" /* FieldType.sign */]: uiWidgets.SignBuilder
    };
    // Index widgets by type
    const widgetTypeMap = {};
    lodash__default["default"].forEach(propMap, (_widget, key) => widgetTypeMap[key] = 1 /* WidgetType.Prop */);
    lodash__default["default"].forEach(fileMap, (_widget, key) => widgetTypeMap[key] = 2 /* WidgetType.File */);
    // Widget getters
    function getFileWidget(fieldType) {
        if (fileMap.hasOwnProperty(fieldType)) {
            return fileMap[fieldType];
        }
        else {
            return fileMap["file" /* FieldType.file */];
        }
    }
    function getPropWidget(fieldType) {
        if (propMap.hasOwnProperty(fieldType)) {
            return propMap[fieldType];
        }
        else {
            return propMap["text" /* FieldType.text */];
        }
    }
    function getWidget(type, fieldType) {
        if (type === 2 /* WidgetType.File */) {
            return getFileWidget(fieldType);
        }
        else if (type === 1 /* WidgetType.Prop */) {
            return getPropWidget(fieldType);
        }
        else {
            return undefined;
        }
    }
    function getWidgetType(fieldType = "text" /* FieldType.text */) {
        return widgetTypeMap[fieldType] || 3 /* WidgetType.Unknown */;
    }

    const dobRegex = /\s*\d{2}\/\d{2}\/\d{4}\s*$/;
    const postCodeRegex = /\s*(([gG][iI][rR]\s*0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?\d\d?)|(([a-pr-uwyzA-PR-UWYZ]\d[a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]\d[abehmnprv-yABEHMNPRV-Y])))\s*\d[abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))\s*$/;
    function mapMixin(func) {
        return function (inp, args) {
            return inp.map(function (val) {
                return func(val, args);
            });
        };
    }
    const mapHelper = {
        "default": mapMixin((inVal) => inVal),
        // "equals": (inp, [cmp] = []) => inp.map<TProp>((val) => val === cmp),
        "equals": mapMixin((val, [cmp] = []) => val === cmp),
        // Date
        "date-format": mapMixin((dateVal) => dateVal
            ? formatDate(Number(dateVal))
            : ""),
        "dateStr-format": mapMixin((dateStr) => dateStr
            ? formatDate(new Date(String(dateStr)).valueOf())
            : ""),
        "date-format-month": mapMixin((dateVal) => dateVal
            ? formatDate(Number(dateVal), "dd MMMM yyyy")
            : ""),
        "date-endofday": mapMixin((dateVal) => dateVal
            ? luxon.DateTime.fromISO(dateVal, { setZone: true }).endOf("day").toISO()
            : ""),
        // String
        "substr": mapMixin((val, [from = 0, length] = []) => String(val).substr(from, length)),
        "upper": mapMixin((val) => String(val).toUpperCase()),
        "lower": mapMixin((val) => String(val).toLowerCase()),
        "snake": mapMixin((val) => lodash__default["default"].snakeCase(String(val))),
        "trunc": mapMixin((val) => lodash__default["default"].truncate(String(val), { length: 15 })),
        "remove-whitespace": mapMixin((val) => val
            ? lodash__default["default"].replace(String(val), /\s/g, "")
            : ""),
        "strLenEq": mapMixin((val, [len] = [0]) => val ? String(val).length === len : false),
        "strLenLt": mapMixin((val, [len] = [0]) => val ? String(val).length < len : false),
        "strLenGt": mapMixin((val, [len] = [0]) => val ? String(val).length > len : false),
        // Boolean
        "boolean": mapMixin((val) => Boolean(val)),
        "not": mapMixin((val) => !val),
        // Validation
        "test-dob": mapMixin((val) => val ? dobRegex.test(String(val)) : false),
        "test-postcode": mapMixin((val) => val ? postCodeRegex.test(String(val)) : false),
        "debug": mapMixin((val) => {
            console.debug(val);
            return val;
        })
    };
    function applyMap(key, inp, args) {
        if (mapHelper.hasOwnProperty(key)) {
            return mapHelper[key](inp, args);
        }
        else {
            return mapHelper["default"](inp);
        }
    }
    function registerMapFn(key, func) {
        if (!mapHelper.hasOwnProperty(key)) {
            mapHelper[key] = func;
        }
    }
    // Convert file streams into basic computed props
    const fileMapHelper = {
        "default": (inp) => inp.map((files) => lodash__default["default"].map(files, ({ name }) => name).join()),
        // File properties
        "file-name": (inp) => inp.map((files) => lodash__default["default"].map(files, ({ file }) => file ? file.name : "").join()),
        "file-type": (inp) => inp.map((files) => lodash__default["default"].map(files, ({ file }) => file ? file.type : "").join()),
        "file-size": (inp) => inp.map((files) => lodash__default["default"].map(files, ({ file }) => file ? file.size : "").join()),
        "file-lastmodified": (inp) => inp.map((files) => lodash__default["default"].map(files, ({ file }) => file ? file.lastModified : "").join()),
        // File metadata
        "path": (inp) => inp.map((files) => lodash__default["default"].map(files, ({ path }) => path).join()),
        "dataUrl": (inp) => inp.map((files) => lodash__default["default"].map(files, ({ dataUrl }) => dataUrl ? dataUrl : "").join())
    };
    function applyFileMap(key, inp) {
        if (fileMapHelper.hasOwnProperty(key)) {
            return fileMapHelper[key](inp);
        }
        else {
            return fileMapHelper["default"](inp);
        }
    }
    function registerFileMapFn(key, func) {
        if (!fileMapHelper.hasOwnProperty(key)) {
            fileMapHelper[key] = func;
        }
    }

    function mergeMixin(func) {
        return function (inpList) {
            return stream__default["default"].merge(inpList).map(func);
        };
    }
    const mergeHelper = {
        "default": mergeMixin((vals) => vals.join()),
        "join-space": mergeMixin((vals) => vals.join(" ")),
        "join-newline": mergeMixin((vals) => vals.join("\n")),
        "join-underscore": mergeMixin((vals) => vals.join("_")),
        // Sum of values, attempt to parse values as integers
        "sum": mergeMixin((vals) => lodash__default["default"]
            .reduce(vals, (acc, val) => {
            const num = Number.parseInt(String(val));
            return lodash__default["default"].isNaN(num) ? acc : acc + num;
        }, 0)),
        // Product of values, attempt to parse values as integers
        "product": mergeMixin((vals) => lodash__default["default"]
            .reduce(vals, (acc, val) => {
            const num = Number.parseInt(String(val));
            return lodash__default["default"].isNaN(num) ? 0 : acc * num;
        }, 1)),
        // Boolean utils
        // Return last value if all other values are "truthy", otherwise 0
        "and": mergeMixin((vals) => lodash__default["default"]
            .reduce(vals, (acc, val) => acc ? val : 0, true)),
        // Return last value if any values are "truthy", otherwise 0
        "or": mergeMixin((vals) => lodash__default["default"]
            .reduce(vals, (acc, val) => acc || val ? val : acc, 0)),
        // Returns true if any value is truthy
        "any": mergeMixin((vals) => lodash__default["default"].some(vals)),
        // Returns true if all values are truthy
        "all": mergeMixin((vals) => lodash__default["default"].every(vals, Boolean)),
        // Returns true if all values are falsey
        "none": mergeMixin((vals) => lodash__default["default"].every(vals, (val) => !val))
    };
    function applyMerge(key, inp) {
        if (mergeHelper.hasOwnProperty(key)) {
            return mergeHelper[key](inp);
        }
        else {
            return mergeHelper["default"](inp);
        }
    }
    function registerMergeFn(key, func) {
        if (!mergeHelper.hasOwnProperty(key)) {
            mergeHelper[key] = func;
        }
    }

    function commonValues(inputs) {
        return (inputs.length ? inputs.reduce((acc, curr) => getCommonValue(acc, curr), Object.assign({}, inputs[0])) : {});
    }
    function getCommonValue(acc, input) {
        // Unset props where input differs from acc
        lodash__default["default"].forEach(input, (val, key) => {
            if (key in acc && acc[key] !== val) {
                lodash__default["default"].unset(acc, key);
            }
        });
        // Unset props present in acc that are not present in input
        lodash__default["default"](lodash__default["default"].keysIn(acc))
            .difference(lodash__default["default"].keysIn(input))
            .forEach((key) => lodash__default["default"].unset(acc, key));
        return acc;
    }
    class FormBuilder {
        constructor(fieldList) {
            const streamMap = {};
            // Split fields into "basic" and "computed"
            const [computed, basic] = lodash__default["default"].partition(fieldList, FormBuilder.isComputed);
            // Add "basic" fields to stream map
            lodash__default["default"](basic)
                // reject undefined input or unknown widget type
                .reject(({ input }) => {
                const type = input ? getWidgetType(input.type) : 3 /* WidgetType.Unknown */;
                return type === 3 /* WidgetType.Unknown */;
            })
                .reduce((acc, { key, fileValue, input, initialValue }) => {
                // Distinguish between TProp and IFile[] stream values
                // input must exist now as undefined input or unknown widget types are rejected above
                const type = getWidgetType(input.type);
                if (type === 1 /* WidgetType.Prop */) {
                    const valStream = stream__default["default"]();
                    if (initialValue != null) {
                        valStream(initialValue);
                    }
                    acc[key] = {
                        computed: false,
                        type,
                        value: valStream
                    };
                }
                else if (type === 2 /* WidgetType.File */) {
                    // Apply stream transform to present file(s) as a basic text prop
                    const fileStream = stream__default["default"]([]);
                    acc[key] = {
                        computed: false,
                        type,
                        value: applyFileMap(fileValue || "default", fileStream),
                        files: fileStream
                    };
                }
                return acc;
            }, streamMap);
            // Add "computed" fields to stream map
            lodash__default["default"](computed)
                // Sort based on "depth" of computed dependencies
                .thru(FormBuilder.sortComputed)
                .reduce((acc, { key, computed: { keys, map = "default", merge = "default", args } }) => {
                let mapStream;
                // Merge multiple streams
                if (keys.length > 1) {
                    const srcStreams = FormBuilder.getStreams(acc, keys);
                    mapStream = applyMerge(merge, srcStreams);
                }
                else if (keys.length === 1) {
                    // Get single stream
                    mapStream = FormBuilder.getStreams(acc, keys)[0];
                }
                // Apply map
                if (mapStream) {
                    acc[key] = {
                        computed: true,
                        type: 1 /* WidgetType.Prop */,
                        value: applyMap(map, mapStream, args)
                    };
                }
                else {
                    acc[key] = {
                        computed: true,
                        type: 1 /* WidgetType.Prop */,
                        value: stream__default["default"](`#REF! ${keys.join()}`)
                    };
                }
                return acc;
            }, streamMap);
            this.streamMap = streamMap;
            // Build form field list
            this.fields = lodash__default["default"](fieldList)
                .map(({ key, group, input, data, user, fieldSet }) => {
                // Only create fields for entries with inputs
                if (!input) {
                    return null;
                }
                const formStream = streamMap[key];
                const type = formStream.type;
                return {
                    key, group, input, type, data, user, fieldSet,
                    computed: formStream.computed,
                    widget: getWidget(type, input.type || "text" /* FieldType.text */),
                    value: formStream.value,
                    files: formStream.type === 2 /* WidgetType.File */ ? formStream.files : undefined
                };
            })
                .compact()
                .value();
        }
        static isComputed(field) {
            return "computed" in field && field.computed != null;
        }
        static isProp(widget) {
            return widget.type === 1 /* WidgetType.Prop */;
        }
        static getStreams(map, keys) {
            // TODO Reject if any one key is missing?
            return lodash__default["default"].map(lodash__default["default"].compact(lodash__default["default"].at(map, keys)), ({ value }) => value);
        }
        static depthTest(score, keys, fieldList) {
            return lodash__default["default"].max(lodash__default["default"].map(keys, (key) => {
                const field = lodash__default["default"].find(fieldList, lodash__default["default"].matches({ key }));
                // Increment depth and test computed dep, or return result
                return (field && field.computed) ? FormBuilder.depthTest(score + 1, field.computed.keys, fieldList) : score;
            })) || 0;
        }
        static sortComputed(fieldList) {
            return lodash__default["default"].sortBy(fieldList, (field) => FormBuilder.depthTest(0, field.computed.keys, fieldList));
        }
        /**
         * Initialise form field values from given object and write form changes
         * back to given object, form fields and object values are matched by key
         * @returns wrapper instance, required by `unwrap`
         */
        wrap(input, keys) {
            const obj = flattenObject(input);
            const keyList = keys || Object.keys(obj);
            const wrapper = {};
            lodash__default["default"].each(keyList, (key) => {
                if (key in this.streamMap) {
                    if (key in obj) {
                        this.streamMap[key].value(obj[key]);
                    }
                    wrapper[key] = this.streamMap[key].value
                        .map((newVal) => {
                        lodash__default["default"].set(input, key, newVal);
                    });
                }
            });
            return wrapper;
        }
        /**
         * Initialise form field values from given object and write form changes
         * back to given object, object values are written based on keys of inputs in form,
         * no matter if values from original object are undefined or not
         * @returns wrapper instance, required by `unwrap`
         */
        wrapAll(input, excludeKeys = []) {
            const obj = flattenObject(input);
            const wrapper = {};
            Object.entries(this.streamMap).forEach(([key, formStream]) => {
                if (!excludeKeys.includes(key)) {
                    const value = lodash__default["default"].get(obj, key);
                    if (value != null) {
                        formStream.value(value);
                    }
                    wrapper[key] = formStream.value
                        .map((newVal) => {
                        lodash__default["default"].set(input, key, newVal);
                    });
                }
            });
            return wrapper;
        }
        wrapArray(inputs, excludeKeys = []) {
            const flattenedInput = inputs.map((overlay) => flattenObject(overlay));
            const combinedInput = commonValues(flattenedInput);
            const wrapper = {};
            Object.entries(this.streamMap).forEach(([key, formStream]) => {
                if (!excludeKeys.includes(key)) {
                    const value = lodash__default["default"].get(combinedInput, key);
                    if (value !== undefined) {
                        formStream.value(value);
                    }
                    wrapper[key] = formStream.value
                        .map((newVal) => {
                        inputs.forEach((input) => lodash__default["default"].set(input, key, newVal));
                    });
                }
            });
            return wrapper;
        }
        /**
         * End sync between the given object and the built form
         */
        unwrap(wrapper) {
            lodash__default["default"].each(wrapper, (value) => value.end(true));
        }
        /**
         * Serialize form into a tuple of records for prop fields, and file fields
         * */
        serialize() {
            return lodash__default["default"].reduce(this.fields, (acc, field) => {
                const { key, value, files } = field;
                if (FormBuilder.isProp(field)) {
                    const propVal = value ? value() : null;
                    if (propVal != null) {
                        acc[0][key] = propVal;
                    }
                }
                else {
                    const filesVal = files ? files() : null;
                    if (filesVal != null) {
                        acc[1][key] = filesVal;
                    }
                }
                return acc;
            }, [{}, {}]);
        }
        deserialise(data) {
            lodash__default["default"].forEach(data, (value, key) => {
                if (key in this.streamMap) {
                    this.streamMap[key].value(value);
                }
            });
        }
    }

    /** @deprecated Use FormBuilder class */
    function buildFormFields(fieldList) {
        return new FormBuilder(fieldList);
    }
    function overrideInput(input, override) {
        return override ? lodash__default["default"].assign({}, input, override) : input;
    }
    function assembleFormField({ type, input, widget, value, files }, inputOverride) {
        if (type === 2 /* WidgetType.File */ && input && widget && files) {
            return m__default["default"](widget, {
                field: overrideInput(input, inputOverride),
                value: files
            });
        }
        else if (type === 1 /* WidgetType.Prop */ && input && widget && value) {
            return m__default["default"](widget, {
                field: overrideInput(input, inputOverride),
                value
            });
        }
        return null;
    }
    function assembleFormFieldList(fields, inputOverride) {
        return lodash__default["default"].map(fields, (field) => {
            return assembleFormField(field, inputOverride);
        });
    }
    function isPropField(widget) {
        return widget.type === 1 /* WidgetType.Prop */;
    }
    const nonTextFields = new Set(["checkbox" /* FieldType.checkbox */, "toggle" /* FieldType.toggle */, "select" /* FieldType.select */, "radio" /* FieldType.radio */]);
    function isTextField(widget) {
        var _a;
        return isPropField(widget) && ((_a = widget.input) === null || _a === void 0 ? void 0 : _a.type) && !nonTextFields.has(widget.input.type);
    }
    function isFileField(widget) {
        return widget.type === 2 /* WidgetType.File */;
    }
    function isSignField(widget) {
        var _a;
        return isFileField(widget) && ((_a = widget.input) === null || _a === void 0 ? void 0 : _a.type) === "sign" /* FieldType.sign */;
    }
    /** @deprecated Use `serialize` class method */
    function serialise(form) {
        return form.serialize()[0];
    }
    /** @deprecated Use `deserialise` class method */
    function deserialise(form, data) {
        form.deserialise(data);
    }

    class PinchZoom {
        constructor(container, viewer, onChange) {
            this.container = container;
            this.viewer = viewer;
            this.onChange = onChange;
            this.startX = 0;
            this.startY = 0;
            this.startDistance = 0;
            this.scale = 0;
            this.boundStart = this.start.bind(this);
            this.boundMove = this.move.bind(this);
            this.boundEnd = this.end.bind(this);
            this.container.addEventListener('touchstart', this.boundStart);
            this.container.addEventListener('touchmove', this.boundMove);
            this.container.addEventListener('touchend', this.boundEnd);
        }
        // Calculate distance between two event touch points
        touchDistance({ touches }) {
            return Math.hypot(touches[0].pageX - touches[1].pageX, touches[0].pageY - touches[1].pageY);
        }
        start(event) {
            if (event.touches.length === 2) {
                event.preventDefault();
                // Get initial touch center position and digit distance
                this.startX = 0.5 * (event.touches[0].pageX + event.touches[1].pageX);
                this.startY = 0.5 * (event.touches[0].pageY + event.touches[1].pageY);
                this.startDistance = this.touchDistance(event);
                // Set pinch "anchor"
                const originX = this.startX + this.container.scrollLeft - this.container.offsetLeft;
                const originY = this.startY + this.container.scrollTop - this.container.offsetTop;
                this.viewer.style.transformOrigin = `${originX}px ${originY}px`;
            }
        }
        move(event) {
            if (event.touches.length === 2) {
                event.preventDefault();
                const newDistance = this.touchDistance(event);
                this.scale = newDistance / this.startDistance;
                this.viewer.style.transform = `scale(${this.scale})`;
            }
        }
        end() {
            if (this.startDistance > 0) {
                // Remove scaling
                this.viewer.style.transform = "none";
                this.viewer.style.transformOrigin = "unset";
                // Report change to scale
                this.onChange(this.scale);
                // Scroll container to new location
                const rect = this.container.getBoundingClientRect();
                this.container.scrollLeft += (this.startX - rect.left) * (this.scale - 1);
                this.container.scrollTop += (this.startY - rect.top) * (this.scale - 1);
                this.startDistance = 0;
            }
        }
        destroy() {
            this.container.removeEventListener('touchstart', this.boundStart);
            this.container.removeEventListener('touchmove', this.boundMove);
            this.container.removeEventListener('touchend', this.boundEnd);
        }
    }

    const mutableApplication = stream__default["default"]();
    const application = mutableApplication;
    // Update ui-widgets config when application is set
    application.map(({ uiWidgets: uiWidgets$1 }) => {
        uiWidgets.updateConfig({
            signFont: "Caveat",
            stampBtnContext: "alt"
        });
        if (uiWidgets$1) {
            uiWidgets.updateConfig(uiWidgets$1);
        }
    });

    exports.DialogPosition = void 0;
    (function (DialogPosition) {
        DialogPosition["center"] = "center";
        DialogPosition["top"] = "top";
        DialogPosition["topRight"] = "topRight";
        DialogPosition["topLeft"] = "topLeft";
        DialogPosition["bottom"] = "bottom";
        DialogPosition["bottomRight"] = "bottomRight";
        DialogPosition["bottomLeft"] = "bottomLeft";
    })(exports.DialogPosition || (exports.DialogPosition = {}));
    exports.DialogType = void 0;
    (function (DialogType) {
        DialogType["notification"] = "notification";
        DialogType["confirm"] = "confirm";
        DialogType["login"] = "login";
        DialogType["feedback"] = "feedback";
        DialogType["invite"] = "invite";
        DialogType["component"] = "component";
        DialogType["form"] = "form";
        DialogType["upload"] = "upload";
    })(exports.DialogType || (exports.DialogType = {}));

    function uiAccordionTheme() {
        return {
            uiAccordionIcon: {},
            uiAccordionWrapper: {},
            uiAccordionTitle: {
                classes: "ui-builder-accent"
            },
            uiAccordionTitleIcon: {},
            uiAccordionTitleWrapper: {},
        };
    }

    function uiActionCardTheme() {
        return {
            uiActionCardContent: {},
            uiActionCardWrapper: {
                classes: "pa3",
                style: {
                    width: "100%",
                    height: "100%"
                }
            },
            uiActionCardInnerWrapper: {
                style: {
                    display: "flex",
                    alignContent: "space-evenly",
                    width: "100%"
                },
                styleNS: {
                    width: "75%"
                }
            },
            uiActionCardButton: {
                style: {
                    maxWidth: "35%"
                }
            },
            uiActionCardHeader: {
                style: {
                    margin: "unset",
                    flex: "unset",
                    minWidth: "unset",
                    minheight: "unset",
                    textAlign: "left"
                }
            },
            uiActionCardImage: {},
            uiActionCardImageWrapper: {
                style: {
                    width: "0px",
                    display: "none"
                },
                styleNS: {
                    width: "25%",
                    display: "flex"
                }
            },
            uiActionCardLines: {
                style: {
                    background: "unset",
                    color: "white"
                }
            },
        };
    }

    function uiBlockLinesTheme() {
        return {
            uiBlockLinesWrapper: {}
        };
    }

    function uiButtonTheme() {
        return {
            uiNavButton: {},
            uiButton: {
                classes: "shadow-4 ma2 ui-builder-accent",
                style: {
                    padding: ".5rem 2rem",
                    fontWeight: '300',
                    border: "unset",
                    borderRadius: "5px",
                    outline: "none",
                    hover: {
                        "box-shadow": `0 0 0.125rem 0 silver`
                    }
                }
            },
            uiButtonAlt: {
                style: {
                    color: "var(--ui-builder-text-invert)",
                    background: "var(--ui-builder-accent)"
                }
            },
            uiButtonNeutral: {
                style: {
                    color: "var(--ui-builder-text)"
                }
            },
            uiButtonInfo: {},
            uiButtonWarn: {
                style: {
                    color: "var(--ui-builder-text-invert)",
                    background: "var(--ui-builder-warn)"
                }
            },
            uiButtonError: {
                style: {
                    color: "var(--ui-builder-text-invert)",
                    background: "var(--ui-builder-danger)"
                }
            }
        };
    }

    function uiCardTheme() {
        return {
            uiCardGroup: {
                classes: "flex flex-wrap justify-center pa2"
            },
            uiCardWrapper: {
                classes: "flex flex-column ui-builder-text-invert bg-ui-builder-accent",
                style: {
                    borderRadius: "10px",
                    boxShadow: "3px 2px 11px lightgrey",
                    width: '13rem',
                    height: '13rem',
                }
            },
            uiCardHeader: {
                classes: "flex-auto",
                style: {
                    fontSize: "1.25rem",
                    textAlign: "center",
                    fontWeight: '300',
                }
            },
            uiCardContentWrapper: {
                style: {
                    justifyContent: "center",
                    "hover-space-img": {
                        transform: "scale(1.05)"
                    }
                },
            },
            uiCardSubheading: {
                classes: "ma2 pv1 ph2 flex items-center",
                style: {
                    fontSize: "1.25rem"
                }
            },
            uiCardIcon: {
                classes: "fa-light fa-fw fa-4x ma2",
                style: {
                    fontSize: '3rem',
                }
            },
            uiCardImage: {
                classes: "img ma2",
                style: {
                    transition: 'transform 0.1s ease-in-out'
                }
            },
            uiCardCounter: {
                classes: "top-0 right-0",
                style: {
                    color: "white",
                    background: '#f7931c',
                    fontWeight: '600',
                    padding: '0.3rem 0.5rem',
                    marginTop: "-0.45rem",
                    marginRight: "-0.55rem",
                    borderRadius: '24px'
                }
            },
            uiCardFooterWrapper: {},
            uiCardFooterIcon: {},
            uiCardFooterText: {},
        };
    }

    function uiDataCardTheme() {
        return {
            uiDataCardGridWrapper: {
                classes: "flex flex-column",
                style: {
                    padding: "0 1rem"
                },
                styleNS: {
                    padding: "0 2rem"
                }
            },
            uiDataCardCategoryLabel: {
                style: {
                    marginLeft: 'auto',
                    borderRadius: '1rem',
                    padding: '0.3rem 1rem',
                    alignSelf: 'center',
                    textTransform: 'uppercase',
                    fontWeight: '300',
                }
            },
            uiDataCardHeader: {
                style: {
                    fontWeight: '400',
                    fontSize: '2rem',
                }
            },
            uiDataCardHeaderWrapper: {
                classes: "flex flex-row",
                style: {
                    marginBottom: '1rem'
                }
            },
            uiDataCardSectionItemLabel: {
                style: {
                    fontWeight: '300',
                    marginRight: '1rem',
                    minWidth: '9rem',
                }
            },
            uiDataCardSectionItemValue: {
                style: {
                    opacity: "0.9",
                    fontWeight: '200',
                    marginBottom: '0.5rem',
                    "-space-p": {
                        margin: "0"
                    }
                }
            },
            uiDataCardSectionItemWrapper: {
                style: {
                    display: 'inline',
                    marginBottom: '0.5rem',
                },
                styleNS: {
                    display: 'flex',
                    flexDirection: 'row',
                },
                styleM: {
                    display: 'flex',
                    flexDirection: 'row',
                }
            },
            uiDataCardSectionLabel: {
                style: {
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    textTransform: 'uppercase',
                    fontSize: '0.8rem'
                }
            },
            uiDataCardSectionWrapper: {
                style: {
                    marginBottom: '2rem',
                }
            },
            uiDataCardWrapper: {
                classes: "flex-shrink-0 self-center",
                style: {
                    width: "100%",
                    height: "unset",
                    maxWidth: '60rem',
                    fontSize: '1rem',
                    background: "white",
                    padding: '2rem',
                    marginBottom: '2rem',
                    borderRadius: "10px",
                    boxShadow: '0px 0px 2px 2px #ebf0f5'
                }
            },
            uiDataCardButton: {
                style: {
                    marginLeft: "auto"
                }
            }
        };
    }

    function uiDialogTheme() {
        return {
            uiDialogContextDefault: {
                classes: "ui-builder-accent bg-ui-builder-accent-invert"
            },
            uiDialogContextAlt: {
                classes: "ui-builder-text-invert bg-ui-builder-accent"
            },
            uiDialogContextNeutral: {
                classes: "ui-builder-text bg-ui-builder-text-invert",
            },
            uiDialogContextWarn: {
                classes: "ui-builder-text-invert bg-ui-builder-warn"
            },
            uiDialogContextError: {
                classes: "ui-builder-text-invert bg-ui-builder-danger"
            },
            uiDialogWrapper: {
                style: {
                    maxHeight: "100%",
                    borderRadius: "10px",
                    overflowY: "auto",
                }
            },
            uiDialogLoginWrapper: {
                style: {
                    position: 'relative',
                    minHeight: "20%",
                    animationIterationCount: "3",
                }
            },
            uiDialogNotificationWrapper: {
                style: {
                    borderRadius: "10px",
                    pointerEvents: 'auto',
                    boxShadow: "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
                }
            },
            uiDialogIcon: {},
            uiDialogTitle: {},
            uiDialogText: {},
            uiDialogButtonWrapper: {
                style: {
                    position: 'relative',
                    justifySelf: 'flex-end'
                }
            },
            uiDialogFeedbackWrapper: {
                classes: "ui-builder-accent bg-ui-builder-accent-invert"
            },
            uiDialogFeedbackTitle: {
                classes: "ui-builder-accent"
            },
            uiDialogFeedbackSubTitle: {
                classes: "ui-builder-accent"
            },
            uiDialogFeedbackBodyText: {
                classes: "ui-builder-accent"
            },
            uiDialogFeedbackLabel: {},
            uiDialogFeedbackButtonWrapper: {
                style: {
                    backgroundColor: "#c7c7c7",
                    position: 'relative',
                    justifySelf: 'flex-end'
                }
            },
            uiDialogInviteWrapper: {},
            uiDialogInviteTitle: {
                classes: "ui-builder-accent"
            },
            uiDialogInviteSubTitle: {
                classes: "ui-builder-accent"
            },
            uiDialogInviteBodyText: {
                classes: "ui-builder-accent"
            },
            uiDialogInviteLabel: {},
            uiDialogInviteActionAreaWrapper: {
                style: {
                    backgroundColor: "#c7c7c7",
                    position: 'relative',
                    justifySelf: 'flex-end'
                }
            },
            uiDialogInviteConfirmButton: {},
            uiDialogInviteCancelButton: {},
            uiDialogInviteInputWrapper: {},
            uiDialogLinkButton: {
                style: {
                    background: "unset"
                }
            },
            uiDialogCancelButton: {
                classes: "mr2"
            },
            uiDialogConfirmButton: {
                classes: "mr2"
            },
            uiDialogFailMessage: {
                style: {
                    fontSize: '1.1rem'
                },
                styleNS: {
                    fontSize: '1.2'
                }
            },
            uiDialogComponentCancelButton: {
                style: {
                    position: "absolute !important",
                    top: "10px",
                    right: "10px"
                }
            },
            uiDialogUploadSubmitButton: {
                classes: 'w-100',
                style: {
                    // color: 'white',
                    // background: '#5ecca3',
                    margin: 'unset',
                    borderRadius: "5px",
                    fontSize: "1.5rem",
                    fontWeight: "200",
                    padding: '0.9rem 2rem'
                }
            },
            uiDialogUploadFileButton: {
                classes: 'f6',
                style: {
                    // color: '#5ecca3',
                    margin: "0.5rem",
                    padding: "0.5rem 2.5rem",
                    borderRadius: "6px",
                    border: `solid 2px var(--ui-builder-accent-invert)`
                }
            },
            uiDialogUploadIcon: {
                classes: 'fa-thin fa-file f3',
                style: {}
            },
            uiDialogUploadFileWrapper: {
                classes: 'mb2',
                style: {
                    alignItems: 'center',
                }
            },
            uiDialogUploadFileDeleteIcon: {
                classes: 'fa-solid fa-xmark',
                style: {
                    color: ' var(--ui-builder-danger)',
                    marginLeft: 'auto',
                    alignSelf: 'baseline',
                    marginTop: '5px'
                }
            },
            uiDialogUploadFileDeleteIconInvalid: {
                style: {
                    color: 'var(--ui-builder-danger)',
                }
            },
            uiDialogUploadFileType: {
                style: {
                    borderRadius: '50%',
                    border: `solid var(--ui-builder-accent-invert) 1px`,
                    color: 'var(--ui-builder-accent-invert)',
                    padding: '.9rem',
                    alignSelf: 'center',
                    height: '2.3rem',
                    width: '2.3rem',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    display: 'grid',
                    fontSize: '0.8rem'
                }
            },
            uiDialogUploadFileTypeSmall: {
                style: {
                    borderRadius: '50%',
                    border: `solid 1px`,
                    padding: '.9rem',
                    alignSelf: 'center',
                    height: '1.2rem',
                    width: '1.2rem',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    display: 'grid',
                    fontSize: '0.6rem'
                }
            },
            uiDialogUploadFileTypeInvalid: {
                style: {
                    border: `solid var(--ui-builder-danger) 1px`,
                    color: 'var(--ui-builder-danger)',
                }
            },
            uiDialogUploadFileSize: {
                style: {
                    fontSize: '0.8rem',
                }
            },
            uiDialogUploadFileSizeInvalid: {
                style: {
                    color: 'var(--ui-builder-danger)'
                }
            },
            uiDialogUploadWarning: {
                style: {
                    color: 'var(--ui-builder-danger)'
                }
            },
            uiDialogUploadOpenButton: {
                classes: 'w5',
                style: {
                    border: 'solid black 1px',
                    color: 'black',
                    boxShadow: 'unset'
                }
            },
            uiDialogUploadFileIconLeft: {
                classes: "ui-builder-accent-invert"
            },
            uiDialogUploadNotesWrapper: {},
            uiDialogUploadNotesInputWrapper: {
                style: {
                    background: 'transparent',
                    border: 'solid var(--ui-builder-accent-invert) 1px',
                    borderRadius: '6px'
                }
            },
            uiDialogUploadNotesInput: {
                style: {
                    color: 'black'
                }
            },
            uiDialogUploadNotesLabel: {
                classes: "ui-builder-accent-invert"
            }
        };
    }

    function uiHeaderFooterTheme() {
        return {
            uiCustomHeader: {
                classes: "ui-builder-accent"
            },
            uiHeaderWrapper: {
                classes: "mw-100 bg-ui-builder-accent-invert",
                style: {
                    boxShadow: '2px 2px 5px var(--ui-builder-accent-invert)',
                }
            },
            uiHeader: {
                classes: "ui-builder-accent"
            },
            uiSubheader: {
                classes: "ui-builder-accent bg-transparent",
                style: {
                    height: "3rem"
                }
            },
            uiFooter: {
                classes: "mw-100 bg-ui-builder-accent-invert",
                style: {
                    height: "3rem",
                    boxShadow: '0px 0px 2px 2px var(--ui-builder-accent-invert)',
                }
            }
        };
    }

    function uiIconTheme() {
        return {
            uiIcon: {}
        };
    }

    function uiInputTheme() {
        return {
            uiInputWrapper: {
                style: {
                    focus: { "border-color": "var(--ui-builder-accent-light)" },
                    background: "#efefef",
                    padding: '.3rem',
                }
            },
            uiInput: {
                classes: "bn fw2 hide-input-clear"
            },
            uiInputFieldset: {
                classes: "mb2",
                style: {
                    marginInline: '0'
                }
            },
            uiInputLabel: {},
            uiInvalidInputWrapper: {
                classes: "bg-washed-red"
            },
            uiFloatLabelPlaceholder: {},
            uiInvalidCheckboxWrapper: {
                classes: "red"
            }
        };
    }

    function uiItemTheme() {
        return {
            uiItemListTitleIcon: {
                style: {
                    cursor: 'pointer'
                }
            },
            uiItemListTitleIconOpen: {
                classes: 'far fa-plus-square mr2'
            },
            uiItemListTitleIconClose: {
                classes: 'far fa-minus-square mr2'
            },
            uiItemListAccordionIcon: {
                style: {
                    fontSize: "1.5rem"
                }
            },
            uiItemListTitle: {
                classes: "ui-builder-accent",
                style: {
                    fontSize: "1.5rem",
                    fontWeight: "300"
                }
            },
            uiItemListGroupLabel: {
                classes: "mh2 mv3 ui-builder-accent"
            },
            uiItemListAccordionTitleWrapper: {
                style: {
                    marginBottom: "1rem",
                }
            },
            uiItemListAccordionTitleWrapperOpen: {},
            uiItemListAccordionTitleWrapperClosed: {},
            uiItemListAccordionWrapper: {
                classes: "flex flex-column items-left",
                style: {
                    transition: "height 0.5s ease 0.1s",
                    overflow: "hidden",
                    width: "100%",
                    border: "1px solid grey",
                    padding: "0px 1rem"
                }
            },
            uiItemListContainer: {
                classes: "flex flex-column flex-auto overflow-x-hidden overflow-y-auto",
            },
            uiItemListTableUploaderWrapper: {
                classes: 'flex flex-column',
            },
            uiItemTableContainer: {
                classes: "flex-auto flex flex-column pa2",
            },
            uiItemTableMaxHeight: {
                style: {
                    height: "24rem"
                }
            },
            uiItemTableIcon: {
                style: {
                    color: 'black',
                }
            },
            uiItemTableIconSelect: {
                style: {
                    textAlign: 'right'
                }
            },
            uiItemGridContainer: {
                classes: "flex-auto overflow-x-hidden overflow-y-auto",
            },
            uiItemRowWrapper: {
                classes: "flex flex-column flex-row-ns ma2 pv2 bb b--black-20",
            },
            uiItemRowNewWrapper: {
                classes: 'flex flex-row',
                style: {
                    marginRight: 'auto',
                    marginLeft: '2rem',
                }
            },
            uiItemRowNewMessage: {
                classes: "ui-builder-accent",
                style: {
                    textTransform: 'uppercase',
                    paddingTop: '0.1rem'
                }
            },
            uiItemRowNewIcon: {
                classes: 'fas fa-star',
                style: {
                    alignSelf: 'center'
                }
            },
            uiItemRowInnerWrapper: {
                classes: "flex-auto flex flex-row items-center pointer",
                style: {
                    color: "black"
                }
            },
            uiItemRowHeaderWrapper: {
                classes: "flex-auto"
            },
            uiItemButtonsWrapper: {},
            uiItemButtonsInnerWrapper: {},
            uiItemActionButton: {
                classes: "pa1 mr2"
            },
            uiItemHeading: {},
            uiItemSubheading: {
                classes: "flex flex-wrap f6 ws-normal ui-builder-accent"
            },
            uiItemEditWrapper: {},
            uiItemEditHeader: {},
            uiItemEditIcon: {},
            uiItemEditLabel: {},
            uiItemEditButton: {},
            uiItemEditFormWrapper: {},
            uiItemViewWrapper: {},
            uiItemViewRowWrapper: {},
            uiItemViewIcon: {},
            uiItemViewField: {},
            uiCategoryItemWrapper: {},
            uiCategoryItemIcon: {},
            uiCategoryItemLabel: {},
            uiCategoryItemMarker: {
                classes: "ui-builder-accent"
            },
            uiCategoryItemArrow: {
                classes: "ui-builder-accent"
            },
            uiItemListTableNewCounter: {
                classes: "pa2 mh1 mv2 f7 tc br-pill",
                style: {
                    background: '#d02226',
                    color: 'white',
                    boxShadow: "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)"
                }
            },
        };
    }

    function uiLayoutTheme() {
        return {
            uiLayout: {
                style: {
                    background: "linear-gradient(0.2turn, var(--ui-builder-accent), 0.1%, #fff)"
                },
            },
            uiPostContentWrapper: {
                classes: "flex flex-wrap items-center flex-column w-100"
            },
            uiPreContentWrapper: {
                classes: "flex flex-wrap items-center flex-column w-100"
            }
        };
    }

    function uiLoginTheme() {
        return {
            uiLoginResetReturn: {},
            uiLoginResetHeader: {},
            uiLogin: {
                classes: "measure-wide center",
                style: {
                    padding: "2rem",
                    border: "2px solid #dcdedf",
                    borderRadius: "10px",
                    marginTop: "3rem",
                    boxShadow: "1px 1px 6px #80808036",
                }
            },
            uiLoginForm: {},
            uiLoginFormReset: {},
            uiLoginPreForm: {},
            uiLoginButtonWrapper: {
                classes: "justify-between"
            },
            uiLoginButton: {
                classes: "ui-builder-text-invert bg-ui-builder-accent"
            },
            uiLoginFormInputWrapper: {},
            uiLoginLines: {},
            uiLoginInputFieldset: {},
            uiLoginHeader: {
                classes: "ui-builder-accent"
            },
            uiLoginResetButton: {},
            uiLoginPostLines: {},
            // ui-widgets
            uiLoginWrapper: {
                classes: "pa2",
                style: {
                    width: "100%",
                }
            },
            uiLoginInputLabel: {},
            uiLoginInputWrapper: {
                classes: "pa2",
                style: {
                    border: "2px solid #dcdedf",
                    borderRadius: "5px",
                    margin: "10px 0px",
                    minWidth: "15rem"
                }
            },
            uiLoginInputWrapperReset: {},
            uiLoginInput: {},
            uiLoginInputFieldsetDob: {},
            uiLoginInputFieldsetPostcode: {},
            uiLoginInputFieldsetPin: {}
        };
    }

    function uiNavbarTheme() {
        return {
            uiNavbarDropDownWrapper: {
                classes: "flex self-stretch flex-column ml2 mr3"
            },
            uiNavbarDropDownMenu: {
                // h-100 and flex-shrink-0 forces menu to always fill the wrapper (forcing content out)
                classes: "h-100 flex-shrink-0 flex items-center ph2 pointer"
            },
            uiNavbarDropDownMenuContent: {
                classes: "flex flex-column shadow-2 z-999 ui-builder-accent bg-ui-builder-accent-invert"
            },
            uiNavbarCopyright: {},
            uiNavbarImage: {},
            uiNavbarLink: {
                classes: "mh2 self-stretch flex items-center"
            },
            uiNavbarLinkActive: {
                classes: 'underline'
            },
            uiNavbarLogout: {
                classes: "ph3 pv0",
                style: {
                    height: "2rem",
                    borderRadius: "5px",
                    marginBottom: 'auto',
                    marginTop: 'auto',
                }
            },
            uiNavbarLogoutIcon: {
                style: {
                    color: "inherit"
                }
            },
            uiNavbarLogoutLabel: {
                style: {
                    color: "inherit"
                }
            },
            uiNavbarName: {},
            uiNavbarNameVersion: {},
            uiNavbarPoweredBy: {},
            uiNavbarProgress: {},
            uiNavbarSalutation: {},
            uiNavbarText: {},
            uiNavbarVersion: {}
        };
    }

    function uiPanelTheme() {
        return {
            uiPanel: {},
            uiPanelHeader: {
                classes: "flex justify-between items-center flex-shrink-0 ui-builder-accent",
                style: {
                    background: "transparent",
                    position: "relative"
                },
            },
            uiPanelSubheader: {
                classes: "flex-shrink-0",
            },
            uiPanelHeaderButton: {},
            uiPanelHeaderWrapper: {},
            uiPanelHeaderComponent: {},
            uiPanelHeaderComponentWrapper: {
                classes: 'flex flex-column flex-row-ns',
                style: {
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: "60%",
                },
                styleNS: {
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: "65%",
                }
            }
        };
    }

    function uiPdfTheme() {
        const borderCls = "bl bw2";
        return {
            uiPdfViewerWrapper: {
                style: {
                    maxHeight: "100%"
                }
            },
            uiPdfFieldOverlay: {
                style: {
                    background: "transparent"
                }
            },
            uiPdfActiveFieldOverlay: {
                classes: borderCls,
                style: {
                    background: "transparent"
                }
            },
            uiPdfFieldOverlayUser1: {
                classes: borderCls,
                style: {
                    borderColor: "var(--ui-builder-user1)"
                }
            },
            uiPdfFieldOverlayUser2: {
                classes: borderCls,
                style: {
                    borderColor: "var(--ui-builder-user2)"
                }
            },
            uiPdfFieldOverlayUser3: {
                classes: borderCls,
                style: {
                    borderColor: "var(--ui-builder-user3)"
                }
            },
            uiPdfFieldOverlayUser4: {
                classes: borderCls,
                style: {
                    borderColor: "var(--ui-builder-user4)"
                }
            },
            uiPdfFieldOverlayUser5: {
                classes: borderCls,
                style: {
                    borderColor: "var(--ui-builder-user5)"
                }
            },
            uiPdfFormGroupInfoItemWrapper: {
                classes: 'mh2 mb3'
            },
            uiPdfFormGroupInfoItemInner: {
                classes: 'pa2 pointer',
                style: {
                    whiteSpace: "nowrap",
                    margin: '0 2rem',
                    letterSpacing: '0.9px',
                }
            },
            uiPdfTopBar: {
                classes: "ui-builder-text-invert bg-ui-builder-accent"
            },
            uiPdfBackButton: {},
            uiPdfZoomInButton: {},
            uiPdfZoomOutButton: {},
            uiPdfDownloadButton: {},
            uiPdfPanel: {
                style: {
                    background: "#777777",
                }
            },
            uiPdfBottomBar: {
                classes: "ui-builder-text-invert bg-ui-builder-accent",
                style: {
                    minHeight: "6rem"
                }
            },
            uiPdfBottomBarText: {
                classes: "ui-builder-text-invert bg-ui-builder-accent"
            },
            uiPdfSubheader: {
                classes: "ui-builder-text-invert bg-ui-builder-accent"
            },
            uiPdfStartButton: {
                classes: "ui-builder-text-invert bg-ui-builder-accent",
                style: {
                    position: "absolute !important",
                    width: "4.8rem",
                    height: "4.8rem",
                    top: "-2.4rem"
                }
            },
            pdfFooterEditPreText: {
                classes: "ma1 f5 tc",
                style: {
                    letterSpacing: "1px"
                }
            },
            pdfFooterEditPostText: {
                classes: "ma1 f5 tc",
                style: {}
            },
            pdfFooterEditNavigate: {
                style: {
                    fontSize: '2rem',
                    margin: '0px 0.2rem 0.6rem 0.2rem',
                    color: "#232323"
                }
            },
            uiPdfStatusIcon: {
                classes: 'green'
            },
            uiPdfStatusIconWarn: {
                classes: 'orange'
            },
            uiPdfSyncButtonWrapper: {},
            uiPdfFooterInputWrapper: {
                style: {
                    background: "white !important",
                    // Hide border from "draw"
                    "-chevron-div": {
                        border: "none"
                    },
                    // Hide border from "type"
                    "-chevron-form": {
                        border: "none"
                    }
                }
            },
            uiPdfFooterSignButton: {
                classes: "pulse z-999"
            },
            uiPdfFooterWrapper: {
                classes: "flex flex-column",
                style: {
                    "-space-label": {
                        margin: "0 auto"
                    }
                }
            },
            uiPdfFieldInvalidOverlay: {},
            uiPdfSaveAndExitButton: {},
            uiPdfFooterFormWrapper: {
                classes: "f3 ma1",
                style: {
                    minWidth: "calc(100vw - 11rem)",
                    // maxHeight: "6rem",
                    // overflowY: "auto",
                },
                styleM: {
                    minWidth: "20rem",
                    maxWidth: "36rem"
                },
                styleL: {
                    minWidth: "36rem"
                }
            }
        };
    }

    function uiProgressTheme() {
        return {
            uiProgressFlowWrapper: {},
            uiProgressFlowStepWrapper: {
                style: {
                    margin: "1rem"
                }
            },
            uiProgressFlowArrowWrapper: {
                style: {
                    position: "relative",
                    top: "4rem",
                    height: "4rem",
                },
                styleNS: {
                    width: "4rem",
                }
            },
            uiProgressFlowArrow: {
                style: {
                    height: "100%",
                    width: "4rem",
                    transform: "rotate(90deg)",
                    fill: "var(--ui-builder-accent)"
                },
                styleNS: {
                    transform: "rotate(0deg)",
                }
            },
            uiProgressTextWrapper: {
                style: {
                    marginTop: "1.5rem",
                }
            },
            uiProgressCardIndicator: {
                style: {
                    position: "relative",
                    height: "3.6rem",
                    width: "5rem",
                    borderRadius: "50%",
                    border: "solid 1px white"
                }
            },
            uiProgressCardWrapper: {
                style: {
                    textAlign: "center",
                    padding: "1rem",
                }
            },
            uiProgressCardSubheading: {
                style: {
                    textAlign: "start",
                    fontWeight: "200",
                    opacity: "0.8"
                }
            },
            uiProgressCardHeading: {
                style: {
                    textAlign: "start",
                    fontWeight: "600",
                    fontSize: "1.25rem",
                    textTransform: "uppercase"
                }
            },
            uiProgressCardWarn: {
                style: {
                    color: "#5a5a5a",
                    background: "#f9ceba"
                }
            },
            uiProgressCardWaiting: {
                style: {
                    color: "#5a5a5a",
                    background: "#f9ceba"
                }
            },
            uiProgressCardError: {
                style: {
                    color: "#5a5a5a",
                    background: "#f5b7b8"
                }
            },
            uiProgressCardComplete: {
                style: {
                    color: "#5a5a5a",
                    background: "#d1e6c7"
                }
            },
            uiProgressCardIncomplete: {
                style: {
                    color: "#5a5a5a",
                    background: "#bfdbf1"
                }
            },
            uiProgressCardIconWarn: {
                classes: "ui-builder-text-invert bg-ui-builder-warn",
                style: {
                    boxShadow: "0px 0px 0px 2px var(--ui-builder-warn)",
                }
            },
            uiProgressCardIconWaiting: {
                classes: "ui-builder-text-invert bg-ui-builder-danger",
                style: {
                    boxShadow: "0px 0px 0px 2px var(--ui-builder-warn)",
                }
            },
            uiProgressCardIconError: {
                classes: "ui-builder-text-invert bg-ui-builder-danger",
                style: {
                    boxShadow: "0px 0px 0px 2px var(--ui-builder-danger)",
                }
            },
            uiProgressCardIconComplete: {
                style: {
                    color: "#fff",
                    background: "#94c47d",
                    boxShadow: "0px 0px 0px 2px #94c47d",
                }
            },
            uiProgressCardIconIncomplete: {
                style: {
                    color: "#fff",
                    background: "#70acdf",
                    boxShadow: "0px 0px 0px 2px #70acdf",
                }
            }
        };
    }

    function uiSearchBoxTheme() {
        return {
            uiSearchBoxWrapper: {},
            uiSearchBoxIcon: {
                classes: "ui-builder-accent"
            },
            uiSearchBoxInput: {},
            uiSearchBoxClearIcon: {
                classes: "ui-builder-accent"
            }
        };
    }

    function uiStatusCheckTheme() {
        return {
            uiStatusCheckWrapper: {},
            uiStatusCheckIconWrapper: {
                classes: "flex-shrink-0",
                style: {
                    height: "5rem",
                    width: "5rem",
                    margin: "0 1rem",
                }
            },
            uiStatusCheckIcon: {},
            uiStatusCheckHeading: {
                classes: "ui-builder-text",
                style: {
                    fontWeight: "600",
                    fontSize: "1.25rem",
                    marginBottom: "0.5rem"
                }
            },
            uiStatusCheckSubheading: {
                style: {
                    fontWeight: "200",
                    opacity: "0.6",
                    "-space-p": {
                        margin: "0"
                    }
                },
            },
            uiStatusCheckTextWrapper: {
                classes: "flex flex-column justify-center"
            }
        };
    }

    function uiTableTheme() {
        return {
            uiTable: {
                style: {}
            },
            // Note any uiAgGrid prefixed theme entries only apply style, no support for classes
            uiAgGrid: {
                style: {}
            },
            uiTableHeader: {
                classes: "flex-auto",
                style: {
                    fontWeight: "400"
                }
            },
            uiAgGridHeader: {
                style: {
                    fontWeight: "400"
                }
            },
            uiTableHeaderCell: {
                classes: "ui-builder-accent bg-ui-builder-accent-invert",
                style: {
                    opacity: '1',
                    fontWeight: "400",
                    borderRight: '1px solid white'
                }
            },
            uiAgGridHeaderCell: {
                style: {
                    color: "var(--ui-builder-accent)",
                    background: "var(--ui-builder-accent-invert)",
                    opacity: '1',
                    fontWeight: "400",
                    borderRight: '1px solid white'
                }
            },
            uiTableHeaderIcon: {
                classes: "ui-builder-accent bg-ui-builder-accent-invert",
                style: {
                    marginRight: '5px',
                    paddingTop: '2px'
                }
            },
            uiAgGridHeaderIcon: {
                style: {
                    color: "var(--ui-builder-accent)",
                    background: "var(--ui-builder-accent-invert)",
                    marginRight: '5px',
                    paddingTop: '2px'
                }
            },
            uiTableHeaderCellContainer: {
                style: {
                    flexDirection: 'row',
                }
            },
            uiAgGridHeaderCellContainer: {
                style: {
                    flexDirection: 'row',
                }
            },
            uiTableColsClipper: {
                style: {
                    minHeight: '43px',
                    marginBottom: '1rem'
                }
            },
            uiAgGridColsClipper: {
                style: {
                    minHeight: '43px',
                    marginBottom: '1rem'
                }
            },
            uiAgThemeAlpine: {
                style: {
                    fontFamily: 'unset'
                }
            },
            uiAgGridThemeAlpine: {
                style: {
                    fontFamily: 'unset'
                }
            },
            uiAgBodyViewport: {},
            uiAgGridBodyViewport: {},
            uiTableCell: {},
            uiAgGridCell: {},
            uiTableWrapper: {},
            uiAgGridWrapper: {},
            uiTableRow: {},
            uiAgGridRow: {},
            uiTableItemDate: {},
            uiCellRendererItemDate: {},
            uiTableItemTime: {},
            uiCellRendererTime: {},
            uiTableItemTitle: {},
            uiCellRendererTitle: {},
            uiTableItemType: {},
            uiCellRendererType: {},
            uiTableItemSize: {},
            uiCellRendererSize: {},
            uiCellRenderDateTimeContainer: {
                style: {
                    height: '100%',
                    width: '100%'
                }
            },
        };
    }

    function uiCarouselTheme() {
        return {
            uiCarouselWrapper: {
                style: {
                    overflowY: 'auto',
                    width: "100vw",
                    "space-chevron-space-first-child": {
                        marginLeft: "auto"
                    },
                    "space-chevron-space-last-child": {
                        marginRight: "auto"
                    }
                }
            }
        };
    }

    const sharedFabDefault = {
        border: "none",
        borderRadius: "50%",
        marginTop: '7px',
        height: "3rem",
        width: "3rem",
        top: "0",
        right: "0",
        background: "#66c880",
        boxShadow: "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
    };
    function uiFabTheme() {
        return {
            uiFabWrapper: {
                classes: "absolute flex flex-column",
                style: {
                    position: "absolute",
                    right: "0.5rem"
                }
            },
            uiFab: {
                style: Object.assign(Object.assign({}, sharedFabDefault), { background: '#66c880' })
            },
            uiFabActive: {
                style: Object.assign(Object.assign({}, sharedFabDefault), { background: 'orange' })
            },
            uiAnimatedFabWrapper: {
                style: Object.assign(Object.assign({}, sharedFabDefault), { background: '#66c880' })
            },
            uiAnimatedFabItemWrapper: {
                style: {
                    justifyContent: "space-between",
                    maxWidth: "12rem",
                    background: '#66c880',
                    position: "relative",
                    transition: "opacity 0.3s, width 0.4s ease-out",
                    opacity: "0",
                    width: "0",
                    maxHeight: "0",
                    marginTop: "0",
                    padding: "0"
                }
            },
            uiAnimatedFabCounterWrapper: {
                style: {
                    height: "1.5rem",
                    width: "1.5rem",
                    background: 'orange',
                    borderRadius: "50%",
                    position: "absolute",
                    right: "-0.25rem",
                    textAlign: "center",
                    display: "grid",
                    alignItems: "center",
                    justifyItems: "center",
                    boxShadow: "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
                }
            },
            uiRequestPartyFabWrapper: {},
            uiRequestIndividualPartyWrapper: {},
            uiFileFabWrapper: {},
            uiFileFabFileWrapper: {},
        };
    }

    function uiOverlaySpinnerTheme() {
        return {
            uiOverlaySpinnerWrapper: {
                style: {
                    top: "0",
                    left: "0",
                    background: "black",
                    color: "white",
                    width: "100vw",
                    height: "100vh",
                    zIndex: "999",
                    transition: "opacity 0.3s ease-in"
                }
            },
            uiOverlaySpinnerInnerWrapper: {
                style: {
                    margin: "auto"
                }
            },
            uiOverlaySpinnerIcon: {
                classes: "fa fa-spinner fa-pulse fa-3x fa-fw"
            },
            uiOverlaySpinnerText: {}
        };
    }

    function uiActiveUserTheme() {
        return {
            uiActiveUsersWrapper: {
                classes: "right-0 z-max",
                style: {
                    position: "absolute",
                    top: "3rem"
                }
            },
            uiActiveUser: {
                classes: "ma1",
                style: {
                    width: "20px",
                    height: "20px",
                    fontSize: "8px",
                    borderRadius: "50%",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    color: "white",
                    border: "solid 3px",
                    boxShadow: "0px 0px 8px 0px #000000"
                },
                styleNS: {
                    width: "40px",
                    height: "40px",
                    fontSize: "14px",
                    boxShadow: "0px 0px 8px 0px #000000"
                },
                styleL: {
                    boxShadow: "0px 0px 8px 0px rgba(255,255,255,0.75)"
                }
            }
        };
    }

    function uiFieldListSelect() {
        return {
            uiFieldListSelectWrapper: {
                style: {
                    height: '3rem',
                    border: '2px dashed black',
                    margin: '10px 0px',
                }
            },
            uiFieldListSelectInnerWrapper: {
                style: {
                    display: "grid",
                    gridTemplateColumns: "90% auto",
                    width: "100%",
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignContent: 'center',
                    height: '100%',
                    position: 'relative',
                    background: 'white'
                }
            },
            uiFieldListSelectFieldInputWrapper: {
                style: {
                    margin: '0px',
                    background: 'transparent',
                    "-space-label": {
                        padding: '1rem'
                    },
                    "-space-label-space-i": {
                        background: 'white'
                    },
                    padding: '0px'
                }
            },
            uiFieldListSelectFieldWrapper: {
                style: {
                    minWidth: "calc(100vw - 11rem)",
                    margin: "0px -2px",
                    padding: '0px'
                },
                styleM: {
                    minWidth: "20rem",
                    maxWidth: "36rem"
                },
                styleL: {
                    minWidth: "36rem"
                }
            },
            uiFieldListSelectIcon: {
                classes: "fa fa-chevron-down",
                style: {
                    transition: "transform 0.3s ease-out",
                    alignSelf: 'end',
                    marginRight: '10px',
                    background: 'white'
                }
            },
            uiFieldListWrapper: {
                style: {
                    bottom: "4.125rem",
                    transform: 'translateX(-2px)',
                    background: '#efefef',
                    boxShadow: "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
                    transition: "opacity 0.2s ease-in",
                }
            }
        };
    }

    function uiShoppingCart() {
        return {
            uiPaymentFailureMain: {}
        };
    }

    function uiOdometerTheme() {
        return {
            uiOdometerNegative: {
                classes: "ui-builder-text bg-ui-builder-error"
            },
            uiOdometer: {
                classes: "br2",
            },
            uiOdometerPositive: {
                classes: "ui-builder-text-invert bg-ui-builder-text"
            },
            uiOdometerLabel: {
                classes: "mr1"
            },
            uiOdometerWrapper: {
                classes: "flex items-center h-100"
            }
        };
    }

    /** NOTE !! The order that the theme defaults are created matter
    --> The !!--> [ LAST ]<--!! items written to markup have a !!--> [ HIGHER ]<--!! specificity <--  */
    function themeDefaults() {
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ body: {
                classes: "ui-builder-text"
            } }, uiOverlaySpinnerTheme()), uiCardTheme()), uiButtonTheme()), uiIconTheme()), uiInputTheme()), uiLayoutTheme()), uiHeaderFooterTheme()), uiPanelTheme()), uiLoginTheme()), uiTableTheme()), uiDialogTheme()), uiNavbarTheme()), uiProgressTheme()), uiActionCardTheme()), uiAccordionTheme()), uiStatusCheckTheme()), uiDataCardTheme()), uiItemTheme()), uiPdfTheme()), uiBlockLinesTheme()), uiSearchBoxTheme()), uiCarouselTheme()), uiFabTheme()), uiActiveUserTheme()), uiFieldListSelect()), uiShoppingCart()), uiOdometerTheme()), { uiDisabled: {
                style: {
                    filter: "grayscale(0.9)",
                    opacity: "0.4"
                }
            } });
    }

    /**
     * Create CSS classes for given theme object
     * @returns Map of theme keys and class strings
     */
    function createThemeClasses(theme, uiSheet) {
        return lodash__default["default"].mapValues(theme, (value, key) => {
            return createResponsiveClass(lodash__default["default"].assign({ key, style: {} }, value), uiSheet);
        });
    }
    /**
     * Merge a given theme with the ui-builder "stock" theme
     * @returns Complete theme configuration object
     */
    function buildTheme(newTheme) {
        // Assemble new theme object, retain key order from themeDefaults
        return lodash__default["default"].mapValues(themeDefaults(), (value, key) => {
            if (key in newTheme) {
                return lodash__default["default"].merge(value, newTheme[key]);
            }
            else {
                return value;
            }
        });
    }
    function blankTheme() {
        return lodash__default["default"].mapValues(themeDefaults(), (_, key) => key);
    }
    function resetCssVariables() {
        const root = document.querySelector(":root");
        root.removeAttribute("style");
    }
    function setCssVariables(cssVariables) {
        const root = document.querySelector(":root");
        lodash__default["default"].each(cssVariables, ((value, key) => {
            if (value) {
                root.style.setProperty(key, value);
            }
        }));
    }

    const theme = stream__default["default"](blankTheme());
    let uiSheet = jss__default["default"].createStyleSheet({});
    function applyTheme(newTheme) {
        // Remove former theme
        jss__default["default"].removeStyleSheet(uiSheet);
        resetCssVariables();
        // Apply prefixed color palette
        if (newTheme.palette) {
            setCssVariables(lodash__default["default"].mapKeys(newTheme.palette, (_, key) => `--ui-builder-${key}`));
        }
        // Apply theme vars
        if (newTheme.vars) {
            setCssVariables(newTheme.vars);
        }
        // Create new theme classes
        uiSheet = jss__default["default"].createStyleSheet({});
        theme(createThemeClasses(buildTheme(newTheme), uiSheet));
        uiSheet.attach();
        // Apply body classes
        const bodyClass = theme().body;
        document.getElementById("page")
            // Split into list of classes
            .classList.add(...bodyClass.split(" "));
        // Apply theme to ui-widgets
        uiWidgets.updateClasses({
            inputWrapper: theme().uiInputWrapper,
            input: theme().uiInput,
            label: theme().uiInputLabel,
            button: "ripple",
            navButton: "ripple",
            invalidInputWrapper: theme().uiInvalidInputWrapper,
            floatLabelPlaceholder: theme().uiFloatLabelPlaceholder,
            invalidCheckboxWrapper: theme().uiInvalidCheckboxWrapper
        });
        // Add ui-widgets theme().uiButton context presets
        uiWidgets.updateButtonContext({
            default: theme().uiButton,
            alt: joinClasses([theme().uiButtonAlt, theme().uiButton]),
            neutral: joinClasses([theme().uiButtonNeutral, theme().uiButton]),
            info: joinClasses([theme().uiButtonInfo, theme().uiButton]),
            warn: joinClasses([theme().uiButtonWarn, theme().uiButton]),
            error: joinClasses([theme().uiButtonError, theme().uiButton]),
        });
    }
    function loadTheme() {
        const path = application().themePath;
        if (path) {
            return m.request(path).then(applyTheme).catch(lodash__default["default"].noop);
        }
        else {
            applyTheme({});
            return Promise.resolve();
        }
    }

    function getContextClass(context = "default" /* ColorContext.default */) {
        switch (context) {
            case "error" /* ColorContext.error */: return theme().uiDialogContextError;
            case "warn" /* ColorContext.warn */: return theme().uiDialogContextWarn;
            case "neutral" /* ColorContext.neutral */: return theme().uiDialogContextNeutral;
            case "alt" /* ColorContext.alt */: return theme().uiDialogContextAlt;
            default: return theme().uiDialogContextDefault;
        }
    }
    function getAnimateInClass(position) {
        switch (position) {
            case exports.DialogPosition.center: return "fade-in";
            case exports.DialogPosition.top: return "notify-top-in";
            case exports.DialogPosition.bottom: return "notify-bottom-in";
            case exports.DialogPosition.topLeft: return "notify-left-in";
            case exports.DialogPosition.bottomLeft: return "notify-left-in";
            case exports.DialogPosition.topRight: return "notify-right-in";
            case exports.DialogPosition.bottomRight: return "notify-right-in";
            default: return "notify-top-in";
        }
    }
    function getAnimateOutClass(position) {
        switch (position) {
            case exports.DialogPosition.center: return "fade-out";
            case exports.DialogPosition.top: return "notify-top-out";
            case exports.DialogPosition.bottom: return "notify-bottom-out";
            case exports.DialogPosition.topLeft: return "notify-left-out";
            case exports.DialogPosition.bottomLeft: return "notify-left-out";
            case exports.DialogPosition.topRight: return "notify-right-out";
            case exports.DialogPosition.bottomRight: return "notify-right-out";
            default: return "notify-top-out";
        }
    }
    function getPositionClasses(position) {
        switch (position) {
            case exports.DialogPosition.center: return ".mw-90-pa2.w-50-ns.w-100.tc";
            case exports.DialogPosition.top: return ".br4.p3.z-max.w-50-ns.w-100.f5.tc.pointer";
            case exports.DialogPosition.bottom: return ".br4.p3.z-max.w-50-ns.w-100.f5.tc.pointer";
            case exports.DialogPosition.topLeft: return ".pa2.pointer.z-max.w-30-ns.w-100.tc";
            case exports.DialogPosition.topRight: return ".pa2.pointer.z-max.w-30-ns.w-100.tc";
            case exports.DialogPosition.bottomLeft: return ".pa2.pointer.z-max.w-30-ns.w-100.tc";
            case exports.DialogPosition.bottomRight: return ".pointer.z-max.w-30-ns.w-100.tc";
            default: return ".br4.p3.z-max.w-50-ns.w-100.f5.tc.pointer";
        }
    }
    function createConfig(dialog) {
        const duration = dialog.type === exports.DialogType.notification ? 3000 : 0;
        const defaults = {
            context: "alt" /* ColorContext.alt */,
            duration,
            position: exports.DialogPosition.top,
            applyTheme: {},
            priority: false,
            closeDialog: false
        };
        return Object.assign(Object.assign({}, defaults), dialog);
    }
    class DialogHandler {
        constructor() {
            this.priorityQueue = [];
            this.notificationQueue = [];
            this.confirmQueue = [];
            this.loginQueue = [];
            this.queue = [];
            this._active = false;
            this._visible = false;
            window.addEventListener("hashchange", () => {
                // clean up queue and close dialog on router change
                this.queue = [];
                this.loginQueue = [];
                this.confirmQueue = [];
                this.priorityQueue = [];
                this.notificationQueue = [];
                this.activeDialog = undefined;
                this.close();
            });
        }
        get active() {
            return this._active;
        }
        close() {
            this._active = false;
        }
        get visible() {
            return this._visible;
        }
        hide() {
            this._visible = false;
        }
        get config() {
            return this._config;
        }
        get getActiveDialog() {
            return this.activeDialog;
        }
        insert(dialogValue) {
            //Store notification to type queues
            if (dialogValue.priority)
                this.priorityQueue.push(dialogValue);
            else if (dialogValue.type === exports.DialogType.notification)
                this.notificationQueue.push(dialogValue);
            else if (dialogValue.type === exports.DialogType.confirm)
                this.confirmQueue.push(dialogValue);
            else if (dialogValue.type === exports.DialogType.login)
                this.loginQueue.push(dialogValue);
            else
                this.notificationQueue.push(dialogValue);
            //Add the notification queues to the general queue in priority order
            this.queue = lodash__default["default"].concat(this.priorityQueue, this.loginQueue, this.confirmQueue, this.notificationQueue);
        }
        next() {
            if (!this.visible && !this.active && this.queue.length) {
                // Create the new activeDialog and confirm and set active/visible
                this.activeDialog = this.queue[0];
                this._config = createConfig(this.activeDialog);
                // Remove the last dialog from the respective queues
                if (this.activeDialog.priority)
                    this.priorityQueue.shift();
                else if (this.activeDialog.type === exports.DialogType.notification)
                    this.notificationQueue.shift();
                else if (this.activeDialog.type === exports.DialogType.confirm)
                    this.confirmQueue.shift();
                else if (this.activeDialog.type === exports.DialogType.login)
                    this.loginQueue.shift();
                else
                    this.notificationQueue.shift();
                this.queue.shift();
                this._active = true;
                this._visible = true;
            }
        }
    }

    const dialogHandler = new DialogHandler();
    /** Set dialog */
    function dialog(newDialog) {
        dialogHandler.insert(newDialog);
    }
    /** Set dialog and redraw, useful for 3rd party library events/callbacks */
    function dialogRedraw(newDialog) {
        dialog(newDialog);
        m.redraw();
    }
    /** Set error dialog */
    function errNotification(err) {
        dialogRedraw({
            type: exports.DialogType.notification,
            message: String(err.message),
            context: "error" /* ColorContext.error */
        });
    }
    /** Close active dialog */
    function dialogClose() {
        dialogHandler.close();
    }

    function redirect({ url }) {
        window.location.href = url;
    }
    function reload() {
        window.location.reload();
    }
    function relogin() {
        const auth = application().auth;
        return new Promise((resolve) => dialog({
            title: "Your session has expired",
            message: auth && auth.sessionExpiredMessage ? auth.sessionExpiredMessage : "Please login again to continue",
            context: "warn" /* ColorContext.warn */,
            type: exports.DialogType.login,
            login: {
                onSuccess: resolve
            }
        }));
    }
    function requestHelper(options) {
        return new Promise((resolve, reject) => {
            m.request(options).then(resolve).catch((err) => {
                if (err.code === 440) {
                    relogin().then(() => resolve(sdxRequest(options)));
                }
                else {
                    reject(err);
                }
            });
        });
    }
    function sdxRequest(urlOrOpts, options) {
        if (typeof urlOrOpts === "string") {
            return requestHelper(lodash__default["default"].extend(options, { url: urlOrOpts }));
        }
        else {
            return requestHelper(urlOrOpts);
        }
    }
    function resetAuth(shortid, fullid) {
        const { auth } = application();
        if (auth && auth.reset) {
            const { username, endpoint } = auth.reset;
            const body = new FormData();
            body.append("username", username);
            body.append("password", shortid);
            return m.request({
                method: "POST",
                url: endpoint,
                body
            }).then(() => dialog({
                message: `We have sent your new PIN to ${fullid}`,
                duration: 2000,
                type: exports.DialogType.notification
            })).catch((err) => errNotification(err));
        }
        else {
            errNotification(new Error("No authentication configuration"));
            return Promise.resolve();
        }
    }

    var __awaiter$3 = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    function humaniseErrorCode(errCode, fileName) {
        if (errCode === 403 /* ErrCode.Forbidden */) {
            return `Unable to access ${fileName}`;
        }
        else if (errCode === 404 /* ErrCode.NotFound */) {
            return `${fileName} not found`;
        }
        else {
            return `Error loading ${fileName}`;
        }
    }
    function getDocumentRequestAuthHeaders() {
        const auth = application().auth;
        const headers = (auth === null || auth === void 0 ? void 0 : auth.documentRequestAuth) || {};
        if (typeof headers === "string") {
            return JSON.parse(headers);
        }
        return headers;
    }
    class PdfViewer {
        constructor() {
            this.overlayList = [];
            this.action = { _id: "", label: "", type: "form" /* ActionType.form */, url: "./", complete: "" };
            this.state = {};
        }
        init(source) {
            PDFJS__default["default"].GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.14.305/legacy/build/pdf.worker.min.js";
            return new Promise((resolve, reject) => {
                PDFJS.getDocument(Object.assign(Object.assign({}, source), { httpHeaders: getDocumentRequestAuthHeaders(), standardFontDataUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.14.305/standard_fonts/" })).promise.then((pdf) => {
                    this.pdf = pdf;
                    resolve(this);
                }, (errMsg) => {
                    // Basic tests for common 4xx response codes
                    if (/server response \(440\)/g.test(errMsg)) {
                        // Session expired, reload page to login again
                        reload();
                    }
                    else if (/server response \(403\)/g.test(errMsg)) {
                        reject(403 /* ErrCode.Forbidden */);
                    }
                    else if (/Missing PDF/g.test(errMsg)) {
                        reject(404 /* ErrCode.NotFound */);
                    }
                    else {
                        reject(400 /* ErrCode.BadRequest */);
                    }
                });
            });
        }
        destroy() {
            this.pdf.destroy();
        }
        parseCustomMetadata() {
            return new Promise((resolve, reject) => {
                this.pdf.getMetadata().then((metadata) => {
                    var _a;
                    // Check for "sdx:$data" entries in document
                    const overlayList = (_a = metadata.metadata) === null || _a === void 0 ? void 0 : _a.get("sdx:overlays");
                    if (overlayList) {
                        try {
                            this.overlayList = JSON.parse(overlayList);
                        }
                        catch (err) {
                            lodash__default["default"].noop(err);
                        }
                        const formAction = metadata.metadata.get("sdx:formAction");
                        if (formAction) {
                            try {
                                this.action = JSON.parse(formAction);
                            }
                            catch (err) {
                                lodash__default["default"].noop(err);
                            }
                        }
                        // const recipients = metadata.metadata.get("sdx:recipients");
                    }
                    else if ("Custom" in metadata.info) {
                        // Parse and apply data if present
                        const custom = metadata.info.Custom;
                        this.metadata = lodash__default["default"].reduce(custom, (metadata, value, key) => {
                            // Only attempt to read JSON object elements
                            if (value && lodash__default["default"].startsWith(value, "{")) {
                                try {
                                    const jsonElem = JSON.parse(value);
                                    switch (jsonElem.type) {
                                        case "overlay" /* ActionType.overlay */:
                                            metadata.overlays[key] = jsonElem;
                                            this.overlayList.push(jsonElem);
                                            break;
                                        case "form" /* ActionType.form */:
                                            metadata.overlays[key] = jsonElem;
                                            this.action = jsonElem;
                                            break;
                                        case "comp" /* ActionType.custom */:
                                            metadata.overlays[key] = jsonElem;
                                            this.custom = jsonElem;
                                            break;
                                        default:
                                            // Assume object is document status map
                                            metadata.documentState = jsonElem;
                                            this.state = jsonElem;
                                    }
                                }
                                catch (err) {
                                    lodash__default["default"].noop(err);
                                }
                            }
                            return metadata;
                        }, { documentState: {}, overlays: {} });
                    }
                    resolve(this);
                }, reject);
            });
        }
    }
    function pdfViewerFactory(source) {
        return __awaiter$3(this, void 0, void 0, function* () {
            const viewer = new PdfViewer();
            const pdfOpts = typeof source === "string" ? { url: source } : source;
            yield viewer.init(pdfOpts);
            return viewer;
        });
    }

    function rectToHtml({ x1, y1, x2, y2 }, pageHeight) {
        return {
            left: x1,
            top: pageHeight - y2,
            width: x2 - x1,
            height: y2 - y1
        };
    }

    class FormLayout {
        constructor(fieldList, { theme, subgroups = {} } = { theme: {} }) {
            this._layoutList = [];
            this._layoutClass = createResponsiveClass(theme);
            // Gather fields in subgroups
            const subgroup = lodash__default["default"].groupBy(fieldList, "data.subgroup");
            // Track greated subgroups
            const subgroupSet = new Set();
            // Build layout list -> top level fields & subgroups
            lodash__default["default"].forEach(fieldList, (field) => {
                var _a;
                const subgroupKey = (_a = field.data) === null || _a === void 0 ? void 0 : _a.subgroup;
                // Create subgroup if not already made and is configured in layout
                if (subgroupKey && subgroupKey in subgroups) {
                    if (!subgroupSet.has(subgroupKey)) {
                        this._layoutList.push(new FormLayout(subgroup[subgroupKey], subgroups[subgroupKey]));
                        subgroupSet.add(subgroupKey);
                    }
                }
                else {
                    this._layoutList.push(field);
                }
            });
        }
        get layoutClass() {
            return this._layoutClass;
        }
        get layoutList() {
            return this._layoutList;
        }
    }

    function gridStyleWrapper(children, slot = {}) {
        return m__default["default"]("div", {
            class: slot.wrapperClass,
            style: Object.assign(Object.assign({}, slot.style), { gridRow: slot.row, gridColumn: slot.col })
        }, children);
    }
    function buildFormLayout(formLayout, formState, override) {
        return m__default["default"]("div", {
            class: formLayout.layoutClass
        }, lodash__default["default"].map(formLayout.layoutList, (field) => {
            // single field
            if ("key" in field && "type" in field) {
                if (formState) {
                    // Get overrides based on form state
                    const stateOverride = lodash__default["default"].merge({}, formState.getState(field.data), override);
                    return gridStyleWrapper(assembleFormField(field, stateOverride), field.data);
                }
                else {
                    return gridStyleWrapper(assembleFormField(field), field.data);
                }
            }
            else {
                // Recursively build subgroups
                return buildFormLayout(field, formState, override);
            }
        }));
    }

    class FormState {
        constructor(form, observeList) {
            this.trackMap = new Map();
            this.evaluateCondition = (val, [operator, compareVal]) => {
                if (val == null) {
                    return false;
                }
                switch (operator) {
                    case ">": return Number(val) > Number(compareVal);
                    case "<": return Number(val) < Number(compareVal);
                    case ">=": return Number(val) >= Number(compareVal);
                    case "<=": return Number(val) <= Number(compareVal);
                    case "===": return val === compareVal;
                    case "!==": return val !== compareVal;
                }
            };
            observeList.forEach(({ observe, update = [] }) => {
                if (observe in form.streamMap) {
                    this.trackMap.set(observe, form.streamMap[observe].value());
                    // Observe stream and write changes to trackMap
                    form.streamMap[observe].value.map((newVal) => {
                        this.trackMap.set(observe, newVal);
                        // Apply any updates to other fields
                        update.forEach(({ key, truthy, falsy, condition }) => {
                            if (!form.streamMap[key]) {
                                console.error(`Key "${key}" from formState config not found`);
                                return;
                            }
                            if (key in form.streamMap) {
                                const evaluatedCondition = condition ? this.evaluateCondition(newVal, condition)
                                    : Boolean(newVal);
                                if (evaluatedCondition && truthy != null) {
                                    form.streamMap[key].value(truthy);
                                }
                                if (!evaluatedCondition && falsy != null) {
                                    form.streamMap[key].value(falsy);
                                }
                            }
                        });
                    });
                }
            });
        }
        get observeMap() {
            return this.trackMap;
        }
        setValue(observe, newValue) {
            return this.trackMap.set(observe, newValue);
        }
        getValue(observe) {
            return this.trackMap.get(observe);
        }
        getState(data = {}) {
            const { observe, truthy, falsy, condition } = data;
            if (observe) {
                const val = this.trackMap.get(observe);
                const evaluatedCondition = condition ? this.evaluateCondition(val, condition) : Boolean(val);
                if (evaluatedCondition && truthy) {
                    return FormState.stateMap[truthy];
                }
                if (!evaluatedCondition && falsy) {
                    return FormState.stateMap[falsy];
                }
            }
            return {};
        }
    }
    FormState.stateMap = {
        required: { required: true },
        readonly: { readonly: true },
        disabled: { disabled: true },
        dn: { uiClass: { wrapper: "dn" } }
    };

    class PanelHeader {
        constructor() {
            this.classKey = "uiPanelHeader";
        }
        view({ attrs: { classes }, children }) {
            return m__default["default"](".touch-action-none", {
                class: joinClasses([theme()[this.classKey], classes])
            }, children);
        }
    }

    class PanelSubheader extends PanelHeader {
        constructor() {
            super(...arguments);
            this.classKey = "uiPanelSubheader";
        }
    }

    class ItemRow {
        icon(icon) {
            if (icon) {
                return typeof icon === "string"
                    ? m__default["default"]("i", { class: icon })
                    : m__default["default"]("img", { src: icon.src, height: icon.height, width: icon.width });
            }
            else {
                return null;
            }
        }
        view({ attrs: { button, onclick, title, heading, icon, isItemNew = false, subheading } }) {
            return m__default["default"](".flex-shrink-0", {
                class: joinClasses([
                    theme().uiItemRowWrapper
                ]),
                title,
                onclick
            }, [
                // Row Inner
                m__default["default"]("div.justify-between", {
                    class: joinClasses([
                        theme().uiItemRowInnerWrapper
                    ]),
                }, [
                    // Row Header
                    m__default["default"]("div", {
                        class: joinClasses([
                            theme().uiItemRowHeaderWrapper
                        ])
                    }, [
                        // Row 'new' status
                        isItemNew && m__default["default"]("#div", {
                            class: joinClasses([
                                theme().uiItemRowNewWrapper
                            ])
                        }, [
                            m__default["default"](`i`, {
                                class: joinClasses([
                                    theme().uiItemRowNewIcon
                                ]),
                            }),
                            m__default["default"]("div", {
                                class: joinClasses([
                                    theme().uiItemRowNewMessage,
                                ]),
                            }),
                        ]),
                        this.icon(icon),
                        m__default["default"]("div", {
                            class: joinClasses([
                                theme().uiItemHeading
                            ])
                        }, m__default["default"]("div.ws-normal.mb1", heading)),
                        subheading
                            ? m__default["default"]("div.f6.ws-normal.silver.ma1", subheading)
                            : null,
                    ]),
                    // Row buttons/actions
                    m__default["default"]("div", {
                        class: joinClasses([
                            theme().uiItemButtonsWrapper
                        ])
                    }, m__default["default"]("div", {
                        class: joinClasses([
                            theme().uiItemButtonsInnerWrapper
                        ])
                    }, button))
                ])
            ]);
        }
    }

    class Themable {
        createTheme(theme) {
            if (theme) {
                this.themeHandler = new ResponsiveThemeHandler(theme);
            }
            this.applyOverwrite();
        }
        updateTheme(theme) {
            if (this.themeHandler && theme) {
                this.themeHandler.update(theme);
            }
            this.applyOverwrite();
        }
        applyOverwrite() {
            if (this.themeHandler) {
                this.overwrite = this.themeHandler.classes;
            }
            else {
                this.overwrite = {};
            }
        }
    }

    class DialogWrapper {
        onbeforeremove({ dom, attrs: { handler } }) {
            dom.classList.remove("fade-in");
            dom.classList.add("fade-out");
            return new Promise((resolve) => {
                dom.addEventListener("animationend", () => {
                    handler.hide();
                    // Invoke DialogComponent onbeforeupdate reflecting visible state change
                    m__default["default"].redraw();
                    resolve();
                });
            });
        }
        // Default wrapper classes add 70% black background
        view({ children, attrs: { classes = "pa3 bg-black-70" } }) {
            return m__default["default"](".fixed.w-100.h-100.left-0.top-0.flex.items-center.justify-center.z-max.fade-in", {
                class: classes,
                tabIndex: -1
            }, children);
        }
    }

    class DialogConfirm extends Themable {
        oninit({ attrs: { config: { applyTheme } } }) {
            this.createTheme(applyTheme);
        }
        onbeforeupdate({ attrs: { config: { applyTheme } } }) {
            this.updateTheme(applyTheme);
        }
        view({ attrs: { config, handler } }) {
            const { icon, title, message, context, buttonContext = buttonContextMapper(context), confirmButton, cancelButton } = config;
            return handler.active && m__default["default"](DialogWrapper, { handler }, m__default["default"](".w-75-ns.mw-90.measure.pa3", {
                class: joinClasses([
                    this.overwrite.uiDialogWrapper,
                    getContextClass(context),
                    theme().uiDialogWrapper
                ])
            }, [
                icon && m__default["default"]("i", {
                    class: joinClasses([
                        icon,
                        this.overwrite.uiDialogIcon,
                        theme().uiDialogIcon
                    ])
                }),
                title && m__default["default"]("h2", {
                    class: joinClasses([
                        this.overwrite.uiDialogTitle,
                        theme().uiDialogTitle
                    ])
                }, title),
                message && buildComponent({
                    type: "sdx-blockLines",
                    data: {
                        lines: message,
                        applyTheme: {
                            uiBlockLinesWrapper: {
                                classes: joinClasses([
                                    this.overwrite.uiDialogText,
                                    theme().uiDialogText
                                ])
                            }
                        }
                    }
                }),
                // Button wrapper
                m__default["default"](".flex.items-end.justify-end", {
                    class: joinClasses([
                        this.overwrite.uiDialogButtonWrapper,
                        theme().uiDialogButtonWrapper
                    ])
                }, [
                    m__default["default"](uiWidgets.Button, {
                        classes: joinClasses([
                            this.overwrite.uiDialogCancelButton,
                            theme().uiDialogCancelButton
                        ]),
                        label: (cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.label) || "Cancel",
                        icon: cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.icon,
                        rightIcon: cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.rightIcon,
                        type: "button",
                        context: buttonContext,
                        onclick: () => {
                            handler.close();
                            if (cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.onclick) {
                                cancelButton.onclick();
                            }
                            m__default["default"].redraw();
                        }
                    }),
                    (confirmButton === null || confirmButton === void 0 ? void 0 : confirmButton.onclick) && m__default["default"](uiWidgets.Button, {
                        classes: joinClasses([
                            this.overwrite.uiDialogConfirmButton,
                            theme().uiDialogConfirmButton
                        ]),
                        label: confirmButton.label || "Confirm",
                        icon: confirmButton.icon,
                        rightIcon: confirmButton.rightIcon,
                        type: "button",
                        context: buttonContext,
                        onclick: () => {
                            handler.close();
                            if (confirmButton.onclick) {
                                confirmButton.onclick();
                            }
                            m__default["default"].redraw();
                        }
                    })
                ])
            ]));
        }
    }

    class DialogForm extends Themable {
        oninit({ attrs: { config: { applyTheme } } }) {
            this.createTheme(applyTheme);
        }
        onbeforeupdate({ attrs: { config: { applyTheme } } }) {
            this.updateTheme(applyTheme);
        }
        view({ attrs: { config, handler } }) {
            const { context, buttonContext = buttonContextMapper(context), cancelButton, children } = config;
            return handler.active ? m__default["default"](DialogWrapper, {
                handler,
                // Override wrapper fullscreen opacity background
                classes: "pa3"
            }, m__default["default"](".w-75-ns.mw-90.measure.pa3.flex.flex-column", {
                class: joinClasses([
                    this.overwrite.uiDialogWrapper,
                    getContextClass(context),
                    theme().uiDialogWrapper
                ]),
                style: {
                    marginRight: 'auto',
                    marginBottom: 'auto',
                    background: '#cfe1ec',
                    width: '16rem',
                    height: '100vh'
                }
            }, [
                children,
                m__default["default"](uiWidgets.Button, {
                    classes: joinClasses([
                        this.overwrite.uiDialogCancelButton,
                        theme().uiDialogCancelButton,
                    ]),
                    style: {
                        marginTop: 'auto'
                    },
                    label: "Close",
                    rightIcon: cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.rightIcon,
                    type: "button",
                    context: buttonContext,
                    onclick: () => {
                        handler.close();
                        if (cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.onclick) {
                            cancelButton.onclick();
                        }
                        m__default["default"].redraw();
                    }
                }),
            ])) : null;
        }
    }

    const wrapperClassesMap = {
        [exports.DialogPosition.bottom]: ".w-100.h-100.pa3.fixed.left-0.top-0.flex.justify-center.items-end.z-max",
        [exports.DialogPosition.bottomLeft]: ".w-100.h-100.pa3.fixed.left-0.top-0.flex.items-end.z-max",
        [exports.DialogPosition.bottomRight]: ".w-100.h-100.pa3.fixed.left-0.top-0.flex.flex-row-reverse.items-end.z-max",
        [exports.DialogPosition.top]: ".w-100.h-100.pa3.fixed.left-0.top-0.flex.justify-center.items-start.z-max",
        [exports.DialogPosition.topLeft]: ".w-100.h-100.pa3.fixed.left-0.top-0.z-max",
        [exports.DialogPosition.topRight]: ".w-100.h-100.pa3.fixed.right-0.top-0.flex-row-reverse.z-max",
    };
    function wrapperClasses(position) {
        if (position in wrapperClassesMap) {
            return wrapperClassesMap[position];
        }
        else {
            return ".flex.items-center.justify-center.w-100.h-100.pa3.fixed.left-0.top-0.z-max";
        }
    }
    class DialogNotification extends Themable {
        constructor() {
            super(...arguments);
            this.timeout = null;
        }
        oninit({ attrs: { config: { applyTheme } } }) {
            this.createTheme(applyTheme);
        }
        onbeforeupdate({ attrs: { config: { applyTheme } } }) {
            this.updateTheme(applyTheme);
        }
        view({ attrs: { config, handler } }) {
            const { position, title, message, context, duration } = config;
            if (duration && !this.timeout && handler.active) {
                this.timeout = setTimeout(() => {
                    handler.close();
                    m__default["default"].redraw();
                }, duration);
            }
            return m__default["default"](wrapperClasses(position), {
                style: {
                    pointerEvents: "none",
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    tabIndex: -1
                }
            }, handler.active && m__default["default"](getPositionClasses(position), {
                id: "this-element",
                class: joinClasses([
                    getAnimateInClass(position),
                    getContextClass(context),
                    this.overwrite.uiDialogNotificationWrapper,
                    theme().uiDialogNotificationWrapper,
                ]),
                onclick: () => handler.close(),
                onbeforeremove: ({ dom }) => {
                    dom.classList.remove(getAnimateInClass(position));
                    dom.classList.add(getAnimateOutClass(position));
                    if (this.timeout) {
                        clearTimeout(this.timeout);
                    }
                    this.timeout = null;
                    return new Promise((resolve) => {
                        dom.addEventListener("animationend", () => {
                            handler.hide();
                            m__default["default"].redraw();
                            resolve();
                        });
                    });
                }
            }, m__default["default"](".flex-row.center-items.justify-center", title && m__default["default"]("h4.w-100.pl3.pr3", {
                class: joinClasses([
                    this.overwrite.uiDialogTitle,
                    theme().uiDialogTitle
                ])
            }, title), message && m__default["default"]("p.w-100.pa1", {
                class: joinClasses([
                    this.overwrite.uiDialogText,
                    theme().uiDialogText
                ])
            }, message && buildComponent({
                type: "sdx-blockLines",
                data: {
                    lines: message,
                    applyTheme: {
                        uiBlockLinesWrapper: {
                            classes: joinClasses([
                                this.overwrite.uiDialogText,
                                theme().uiDialogText
                            ])
                        }
                    }
                }
            })))));
        }
    }

    function loginSubmit(endpoint, config) {
        return (evt) => {
            evt.preventDefault();
            m.request({
                method: "POST",
                url: endpoint,
                body: new FormData(evt.target),
                deserialize: simpleResponse
            }).then(config.onSuccess).catch(config.onFailure);
        };
    }
    function loginForm(auth) {
        const { username, pinInput } = auth;
        const { uiLoginInputWrapper, uiLoginInput, uiInput, uiInputWrapper, uiLoginInputFieldset, uiInputFieldset, uiLoginInputLabel, uiInputLabel, uiLoginInputFieldsetDob, uiLoginInputFieldsetPostcode, uiLoginInputFieldsetPin } = theme();
        // Username field is common to all form configurations
        const formFields = [{
                key: "username",
                input: {
                    id: "username",
                    type: "hidden" /* FieldType.hidden */,
                    readonly: true
                },
                // Set fixed username
                initialValue: username
            }];
        if (auth.type === "dobPostcode" /* AuthType.DOBPostcode */) {
            // Assemble DOB Postcode/PIN form config
            const { dobLabel = "DOB", dobPlaceholder = "DOB e.g. 23/02/1973", postcodeLabel = "Postcode", postcodePlaceholder = "Postcode e.g. AB12 3CD", } = auth;
            formFields.push({
                key: "dob",
                input: {
                    id: "dob", label: dobLabel,
                    type: "dateInput" /* FieldType.dateInput */,
                    placeholder: dobPlaceholder,
                    title: dobPlaceholder,
                    required: true,
                    uiClass: {
                        wrapper: joinClasses([uiLoginInputFieldsetDob, uiLoginInputFieldset, uiInputFieldset]),
                        inputWrapper: joinClasses([uiLoginInputWrapper, uiInputWrapper]),
                        input: joinClasses([uiLoginInput, uiInput]),
                        label: joinClasses([uiLoginInputLabel, uiInputLabel]),
                    },
                    config: {
                        datePickerIcn: "dn"
                    }
                }
            });
            formFields.push(pinInput
                ? {
                    key: "pin",
                    input: {
                        id: "pin", label: postcodeLabel,
                        type: "password" /* FieldType.password */,
                        placeholder: postcodePlaceholder, title: postcodePlaceholder,
                        pattern: "[0-9]*", inputmode: "numeric",
                        required: true, instant: true,
                        uiClass: {
                            wrapper: joinClasses([uiLoginInputFieldsetPin, uiLoginInputFieldset, uiInputFieldset]),
                            inputWrapper: joinClasses([uiLoginInputWrapper, uiInputWrapper]),
                            input: joinClasses([uiLoginInput, uiInput]),
                            label: joinClasses([uiLoginInputLabel, uiInputLabel]),
                        }
                    }
                }
                : {
                    key: "postcode",
                    input: {
                        id: "postcode", label: postcodeLabel,
                        type: "text" /* FieldType.text */,
                        placeholder: postcodePlaceholder, title: postcodePlaceholder,
                        required: true, instant: true,
                        uiClass: {
                            wrapper: joinClasses([uiLoginInputFieldsetPostcode, uiLoginInputFieldset, uiInputFieldset]),
                            inputWrapper: joinClasses([uiLoginInputWrapper, uiInputWrapper]),
                            input: joinClasses([uiLoginInput, uiInput]),
                            label: joinClasses([uiLoginInputLabel, uiInputLabel]),
                        }
                    }
                });
            // Add computed fields for validation
            formFields.push({
                key: "dob-format",
                computed: {
                    keys: ["dob"],
                    map: "dateStr-format"
                }
            });
            formFields.push({
                key: "dob-valid",
                computed: {
                    keys: ["dob-format"],
                    map: "test-dob"
                }
            });
            if (pinInput) {
                formFields.push({
                    key: "pin-valid",
                    computed: {
                        keys: ["pin"],
                        map: "strLenEq",
                        args: [6]
                    }
                });
            }
            else {
                formFields.push({
                    key: "postcode-remove-whitespace",
                    computed: {
                        keys: ["postcode"],
                        map: "remove-whitespace"
                    }
                });
                formFields.push({
                    key: "postcode-upper",
                    computed: {
                        keys: ["postcode-remove-whitespace"],
                        map: "upper"
                    }
                });
                formFields.push({
                    key: "postcode-valid",
                    computed: {
                        keys: ["postcode-upper"],
                        map: "test-postcode"
                    }
                });
            }
            formFields.push({
                key: "form-valid",
                computed: {
                    keys: ["dob-valid", pinInput ? "pin-valid" : "postcode-valid"],
                    merge: "and"
                }
            });
            formFields.push({
                key: "password",
                input: {
                    id: "password",
                    type: "hidden" /* FieldType.hidden */,
                    autocomplete: "off",
                    readonly: true
                },
                computed: {
                    keys: ["dob-format", pinInput ? "pin" : "postcode-upper"],
                    merge: "join-underscore"
                }
            });
        }
        else {
            // Assemble Password/PIN form config
            const { passwordLabel = "PASSWORD", passwordPlaceholder = "PASSWORD", } = auth;
            formFields.push(pinInput
                ? {
                    key: "password",
                    input: {
                        id: "password", label: passwordLabel,
                        type: "password" /* FieldType.password */,
                        placeholder: passwordPlaceholder,
                        autocomplete: "current-password",
                        pattern: "[0-9]+", inputmode: "numeric",
                        required: true, instant: true,
                        uiClass: {
                            wrapper: joinClasses([uiLoginInputFieldset, uiInputFieldset]),
                            inputWrapper: joinClasses([uiLoginInputWrapper, uiInputWrapper]),
                            input: joinClasses([uiLoginInput, uiInput]),
                            label: joinClasses([uiLoginInputLabel, uiInputLabel]),
                        },
                    }
                }
                : {
                    key: "password",
                    input: {
                        id: "password", label: passwordLabel,
                        type: "password" /* FieldType.password */,
                        placeholder: passwordPlaceholder,
                        autocomplete: "current-password",
                        required: true, instant: true,
                        uiClass: {
                            wrapper: joinClasses([uiLoginInputFieldset, uiInputFieldset]),
                            inputWrapper: joinClasses([uiLoginInputWrapper, uiInputWrapper]),
                            input: joinClasses([uiLoginInput, uiInput]),
                            label: joinClasses([uiLoginInputLabel, uiInputLabel]),
                        }
                    }
                });
            // Add computed fields for validation
            formFields.push({
                key: "form-valid",
                computed: pinInput
                    ? {
                        keys: ["password"],
                        map: "strLenEq",
                        args: [6]
                    }
                    : {
                        keys: ["password"],
                        map: "strLenGt",
                        args: [0]
                    }
            });
        }
        // Build form from config
        return new FormBuilder(formFields);
    }

    class PasswordReset {
        constructor() {
            this.resetId = stream__default["default"]("");
            this.mobileValid = stream__default["default"]();
            this.emailValid = stream__default["default"]();
        }
        // TODO: Create "clean resetId" from resetId, validate and submit that value
        oninit({ attrs: { reset: { hash } } }) {
            this.mobileValid = this.resetId.map((mobile) => {
                // Take only numbers, and the last 9 (ignore countro code) before hashing
                return hash === jsSha256.sha256(lodash__default["default"].replace(lodash__default["default"].toLower(mobile), /\D/g, '').slice(-9));
            });
            this.emailValid = this.resetId.map((email) => {
                // Trim leading/trailing spaces before hashing
                return hash === jsSha256.sha256(lodash__default["default"].trim(lodash__default["default"].toLower(email)));
            });
        }
        view({ attrs: { auth, reset, onReset, onToggle, minimal } }) {
            const { type, inputLabel, inputPlaceholder } = reset;
            const { helpBtnText = "SEND PIN", helpBtnIcon = "", loginFormClass = "", loginBtnClass = "", returnLinkText = "Return", helpInputLines } = auth;
            return m__default["default"]("form[enctype=multipart/form-data]", {
                onsubmit: (evt) => {
                    evt.preventDefault();
                    onReset(type === "email" /* ResetType.Email */ ?
                        lodash__default["default"].trim(lodash__default["default"].toLower(this.resetId())) :
                        lodash__default["default"].trim(lodash__default["default"].replace(lodash__default["default"].toLower(this.resetId()), /\D/g, '').slice(-9)), this.resetId());
                    // Reset input to empty
                    this.resetId("");
                },
                class: joinClasses([
                    loginFormClass,
                    theme().uiLoginForm,
                    theme().uiLoginFormReset
                ]),
            }, [
                m__default["default"]("div", {
                    class: joinClasses([theme().uiLoginFormInputWrapper]),
                }, m__default["default"](uiWidgets.BaseInput, {
                    field: lodash__default["default"].extend({}, {
                        id: "resetpassword",
                        instant: true,
                        uiClass: {
                            wrapper: joinClasses([theme().uiInputFieldset]),
                            inputWrapper: joinClasses([theme().uiLoginInputWrapper, theme().uiInputWrapper, theme().uiLoginInputWrapperReset]),
                            input: joinClasses(["pa2", theme().uiLoginInput, theme().uiInput]),
                            label: joinClasses([theme().uiLoginInputLabel, theme().uiInputLabel]),
                        },
                    }, type === "email" /* ResetType.Email */
                        ? {
                            label: inputLabel ? inputLabel : "EMAIL",
                            type: "email" /* FieldType.email */,
                            placeholder: inputPlaceholder ? inputPlaceholder : "Enter e-mail address",
                            inputmode: "email"
                        } : {
                        label: inputLabel ? inputLabel : "MOBILE",
                        type: "tel" /* FieldType.tel */,
                        placeholder: inputPlaceholder ? inputPlaceholder : "Enter mobile number",
                        pattern: "\\+*[0-9]*"
                    }),
                    value: this.resetId
                })),
                !minimal && helpInputLines && lodash__default["default"].map(helpInputLines, (line) => m__default["default"]("p.f5", {
                    class: joinClasses([theme().uiLoginLines])
                }, m__default["default"].trust(line))),
                m__default["default"](`.flex ${minimal ? '.flex-column.items-center' : '.flex-row-reverse-ns.flex-column.items-center'}`, {
                    class: joinClasses([theme().uiLoginButtonWrapper])
                }, [
                    m__default["default"](uiWidgets.Button, {
                        label: helpBtnText,
                        type: "submit",
                        rightIcon: helpBtnIcon,
                        classes: joinClasses([
                            theme().uiLoginButton,
                            loginBtnClass,
                        ]),
                        disabled: type === "email" /* ResetType.Email */ ? !this.emailValid() : !this.mobileValid()
                    }),
                    m__default["default"]("span.pv2.f6.pointer", {
                        class: joinClasses([
                            theme().uiLoginResetReturn,
                            theme().uiLoginResetButton
                        ]),
                        onclick: onToggle
                    }, returnLinkText)
                ])
            ]);
        }
    }

    class HelpForm {
        view({ attrs: { auth, minimal, onReturn } }) {
            const { helpTitle, helpLines, postHelpLines = [], reset, } = auth;
            return m__default["default"](".flex-column.w-100", {
                class: joinClasses([
                    theme().uiLogin
                ])
            }, [
                !minimal && m__default["default"](".f3.f2-l.fw5.mv3.mv4-l", {
                    class: joinClasses([theme().uiLoginResetHeader, theme().uiLoginHeader])
                }, m__default["default"].trust(helpTitle)),
                lodash__default["default"].map(helpLines, (line) => m__default["default"]("p.f5", m__default["default"].trust(line))),
                reset && m__default["default"](PasswordReset, {
                    auth,
                    reset,
                    minimal,
                    onReset: (shortId, fullId) => {
                        onReturn();
                        resetAuth(shortId, fullId);
                    },
                    onToggle: onReturn,
                }),
                !minimal && lodash__default["default"].map(postHelpLines, (line) => m__default["default"]("p.f5", m__default["default"].trust(line)))
            ]);
        }
    }

    class LoginForm {
        constructor() {
            this.toggleHelp = false;
        }
        oninit({ attrs: { auth } }) {
            this.form = loginForm(auth);
        }
        view({ attrs: { auth, config, minimal } }) {
            const { endpoint, title, lines = [], postLines = [], loginFormClass = "", loginBtnText = "Login", loginBtnIcon = "", loginBtnClass = "", reset, helpLinkText = "Trouble logging in?", preForm } = auth;
            return m__default["default"](".flex.flex-column", {
                class: minimal ? '' : theme().uiLoginWrapper
            }, [
                // Login form
                !this.toggleHelp ? m__default["default"](".flex-column.w-100", {
                    class: joinClasses([
                        theme().uiLogin
                    ])
                }, [
                    !minimal && m__default["default"](".f3.f2-l.fw5", {
                        class: theme().uiLoginHeader
                    }, m__default["default"].trust(title)),
                    lodash__default["default"].map(lines, (line) => m__default["default"]("p.f5", {
                        class: joinClasses([theme().uiLoginLines])
                    }, m__default["default"].trust(line))),
                    m__default["default"](`form[enctype=multipart/form-data][method=post][accept=utf-8].w-100 ${minimal ? '' : '.justify-between'}`, {
                        action: endpoint,
                        class: joinClasses([
                            loginFormClass,
                            theme().uiLoginForm
                        ]),
                        onsubmit: config ? loginSubmit(endpoint, config) : undefined
                    }, [
                        preForm && m__default["default"]('div', { class: theme().uiLoginPreForm }, lodash__default["default"].map(preForm, (data) => buildComponent({ type: 'sdx-blockLines', data }))),
                        m__default["default"]("div", {
                            class: joinClasses([theme().uiLoginFormInputWrapper]),
                        }, lodash__default["default"].map(this.form.fields, assembleFormField)),
                        !minimal && lodash__default["default"].map(postLines, (line) => m__default["default"]("p.f5", {
                            class: joinClasses([theme().uiLoginPostLines])
                        }, m__default["default"].trust(line))),
                        m__default["default"](`.flex.items-center ${minimal ? '.flex-column' : '.flex-row-reverse-ns.flex-column'}`, {
                            class: joinClasses([theme().uiLoginButtonWrapper])
                        }, m__default["default"](uiWidgets.Button, {
                            label: loginBtnText,
                            type: "submit",
                            rightIcon: loginBtnIcon,
                            classes: joinClasses([
                                theme().uiLoginButton,
                                theme().uiButton,
                                loginBtnClass,
                            ]),
                            disabled: Boolean(!this.form.streamMap["form-valid"].value())
                        }), 
                        // Show reset form (onePanel layout only)
                        reset ? m__default["default"]("span.pv2.nt2.fr.f6.pointer", {
                            class: joinClasses([
                                theme().uiLoginResetButton
                            ]),
                            onclick: () => this.toggleHelp = true,
                        }, helpLinkText) : null)
                    ]),
                ]) : null,
                // Help form
                this.toggleHelp && m__default["default"](HelpForm, { auth, minimal, onReturn: () => this.toggleHelp = false })
            ]);
        }
    }

    class DialogLogin extends Themable {
        constructor() {
            super(...arguments);
            this.shake = false;
        }
        oninit({ attrs: { handler, config: { login, applyTheme } } }) {
            this.createTheme(applyTheme);
            this.loginSuccess = () => {
                handler.close();
                if (login === null || login === void 0 ? void 0 : login.onSuccess) {
                    login.onSuccess();
                }
            };
            this.loginFailure = () => {
                this.shake = true;
                this.failMessage = "Invalid credentials - please try again";
                if (login === null || login === void 0 ? void 0 : login.onFailure) {
                    login.onFailure();
                }
            };
        }
        onbeforeupdate({ attrs: { config: { applyTheme } } }) {
            this.updateTheme(applyTheme);
        }
        onupdate() {
            // Remove the shake class if present
            if (this.shake) {
                this.shake = false;
            }
        }
        view({ attrs: { config, handler } }) {
            const { context, title, message } = config;
            const { auth } = application();
            return handler.active ? m__default["default"](DialogWrapper, { handler }, m__default["default"](".measure-wide.pa3", {
                class: joinClasses([
                    theme().uiDialogLoginWrapper,
                    theme().uiDialogWrapper,
                    getContextClass(context),
                    this.shake ? "shake" : ''
                ])
            }, m__default["default"](".pa2", [
                m__default["default"]("h2.w-100", {
                    class: joinClasses([
                        this.overwrite.uiDialogTitle,
                        theme().uiDialogTitle
                    ])
                }, title),
                m__default["default"]("p.tc", {
                    class: joinClasses([
                        this.failMessage ? "red" : "",
                        theme().uiDialogFailMessage,
                    ])
                }, this.failMessage ? this.failMessage :
                    message && buildComponent({
                        type: "sdx-blockLines",
                        data: {
                            lines: message,
                            applyTheme: {
                                uiBlockLinesWrapper: {
                                    classes: joinClasses([
                                        this.overwrite.uiDialogText,
                                        theme().uiDialogText
                                    ])
                                }
                            }
                        }
                    }))
            ]), auth ? m__default["default"](LoginForm, {
                auth,
                config: {
                    onSuccess: this.loginSuccess,
                    onFailure: this.loginFailure
                },
                minimal: true
            }) : null)) : null;
        }
    }

    const profile = stream__default["default"]({
        licensee: "NOTSET",
        // // role: 'admin',
        firstName: 'Mr',
        lastName: 'Test'
    });
    function loadProfile() {
        const path = application().profilePath;
        return path
            ? m.request(path).then(profile).catch(lodash__default["default"].noop)
            : Promise.resolve();
    }

    class DialogFeedback extends Themable {
        constructor() {
            super(...arguments);
            this.uiClass = {
                wrapper: joinClasses([theme().uiInputFieldset]),
                inputWrapper: joinClasses(["ba b--light-gray mb2", theme().uiInputWrapper]),
                input: joinClasses([theme().uiInput]),
                label: joinClasses([theme().uiInputLabel]),
            };
            this.feedbackFormFields = new FormBuilder([{
                    key: "feedback",
                    group: "feedback",
                    input: {
                        id: "feedback", type: "textarea" /* FieldType.textarea */,
                        required: true, uiClass: this.uiClass
                    }
                }, {
                    key: "email",
                    group: "email",
                    input: {
                        id: "email", type: "email" /* FieldType.email */,
                        required: true, uiClass: this.uiClass
                    }
                }, {
                    key: "phone_number",
                    group: "phone_number",
                    input: {
                        id: "phone_number", type: "tel" /* FieldType.tel */,
                        required: true, uiClass: this.uiClass
                    }
                }]);
        }
        oninit({ attrs: { config: { applyTheme, useProfile } } }) {
            this.createTheme(applyTheme);
            const { email = "", mobile = "" } = useProfile ? useProfile() : profile() || {};
            if (email) {
                this.feedbackFormFields.streamMap["email"].value(email);
            }
            if (mobile) {
                this.feedbackFormFields.streamMap["phone_number"].value(mobile);
            }
        }
        onbeforeupdate({ attrs: { config: { applyTheme } } }) {
            this.updateTheme(applyTheme);
        }
        view({ attrs: { config, handler } }) {
            const { title, subTitle, bodyText, cancelButton, submitButton, postUrl } = config;
            const feedbackFormGroup = lodash__default["default"].groupBy(this.feedbackFormFields ? this.feedbackFormFields.fields : [], "group");
            return handler.active ? m__default["default"](DialogWrapper, { handler }, m__default["default"](".w-75-ns.mw-90.measure", {
                class: joinClasses([
                    this.overwrite.uiDialogFeedbackWrapper,
                    this.overwrite.uiDialogWrapper,
                    theme().uiDialogFeedbackWrapper,
                    theme().uiDialogWrapper
                ])
            }, [
                m__default["default"](".pa3", [
                    m__default["default"]("h2.w-100", {
                        class: joinClasses([
                            this.overwrite.uiDialogFeedbackTitle,
                            theme().uiDialogFeedbackTitle
                        ])
                    }, title),
                    m__default["default"]("h5.w-100", {
                        class: joinClasses([
                            this.overwrite.uiDialogFeedbackSubTitle,
                            theme().uiDialogFeedbackSubTitle
                        ])
                    }, subTitle),
                    m__default["default"]("h5.w-100", {
                        class: joinClasses([
                            this.overwrite.uiDialogFeedbackBodyText,
                            theme().uiDialogFeedbackBodyText
                        ])
                    }, bodyText && m__default["default"].trust(bodyText)),
                    m__default["default"]("p.f6.b.pt3.mv1", {
                        class: joinClasses([
                            this.overwrite.uiDialogFeedbackLabel,
                            theme().uiDialogFeedbackLabel
                        ])
                    }, "Feedback"),
                    m__default["default"]("p.f6.pt1.ma0", lodash__default["default"].map(feedbackFormGroup["feedback"], assembleFormField)),
                    m__default["default"]("p.f6.b.pt3.mv1", {
                        class: joinClasses([
                            this.overwrite.uiDialogFeedbackLabel,
                            theme().uiDialogFeedbackLabel
                        ])
                    }, "Email Address"),
                    m__default["default"]("p.f6.ma0", "We may need to contact you if we need more information on the feedback you have provided."),
                    m__default["default"]("p.f6.pt1.ma0", lodash__default["default"].map(feedbackFormGroup["email"], assembleFormField)),
                    m__default["default"]("p.f6.b.pt3.mv1", {
                        class: joinClasses([
                            this.overwrite.uiDialogFeedbackLabel,
                            theme().uiDialogFeedbackLabel
                        ])
                    }, "Phone Number"),
                    m__default["default"]("p.f6.pt1.ma0", lodash__default["default"].map(feedbackFormGroup["phone_number"], assembleFormField)),
                ]),
                //Button wrapper
                m__default["default"](".flex.flex-column.w-100.items-center.pa3", {
                    class: joinClasses([
                        theme().uiDialogFeedbackButtonWrapper,
                        this.overwrite.uiDialogText,
                        theme().uiDialogButtonWrapper
                    ]),
                }, [
                    m__default["default"](uiWidgets.Button, {
                        classes: joinClasses([
                            this.overwrite.uiDialogConfirmButton,
                            theme().uiDialogConfirmButton
                        ]),
                        label: (submitButton === null || submitButton === void 0 ? void 0 : submitButton.label) || "Confirm",
                        type: "button",
                        onclick: () => {
                            if (postUrl) {
                                m__default["default"].request({
                                    url: postUrl,
                                    method: "POST",
                                    body: {
                                        dialogFeedbackEmail: this.feedbackFormFields.streamMap["email"].value(),
                                        dialogFeedbackPhone: this.feedbackFormFields.streamMap["phone_number"].value(),
                                        dialogFeedbackText: this.feedbackFormFields.streamMap["feedback"].value()
                                    }
                                }).then(() => {
                                    handler.close();
                                    dialog({
                                        message: "Thank you for your feedback",
                                        position: exports.DialogPosition.center,
                                        priority: true,
                                        type: exports.DialogType.notification
                                    });
                                }).catch(() => {
                                    handler.close();
                                    dialog({
                                        type: exports.DialogType.notification,
                                        position: exports.DialogPosition.top,
                                        context: "error" /* ColorContext.error */,
                                        duration: 0,
                                        title: "Sorry!",
                                        message: "Your feedback failed to send, please try again later."
                                    });
                                });
                            }
                            else {
                                handler.close();
                            }
                            if (submitButton === null || submitButton === void 0 ? void 0 : submitButton.onclick) {
                                submitButton.onclick();
                            }
                            m__default["default"].redraw();
                        }
                    }),
                    m__default["default"]("span.dim.pointer.pa1.underline", {
                        class: joinClasses([
                            theme().uiDialogLinkButton,
                            this.overwrite.uiDialogLinkButton,
                        ]),
                        onclick: () => {
                            handler.close();
                            if (cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.onclick) {
                                cancelButton.onclick();
                            }
                        }
                    }, (cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.label) || "Back")
                ])
            ])) : null;
        }
    }

    class DialogComponent extends Themable {
        oninit({ attrs: { config: { applyTheme } } }) {
            this.createTheme(applyTheme);
        }
        onbeforeupdate({ attrs: { config: { applyTheme } } }) {
            this.updateTheme(applyTheme);
        }
        view({ attrs: { config: { context, cancelButton, buttonContext, component, attrs }, handler } }) {
            return handler.active ? m__default["default"](DialogWrapper, { handler }, m__default["default"](uiWidgets.Button, {
                classes: joinClasses([
                    this.overwrite.uiDialogComponentCancelButton,
                    theme().uiDialogComponentCancelButton
                ]),
                label: (cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.label) || "",
                icon: (cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.icon) || "fas fa-times",
                rightIcon: (cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.rightIcon) || "",
                type: "button",
                context: buttonContext,
                onclick: () => {
                    handler.close();
                    if (cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.onclick) {
                        cancelButton.onclick();
                    }
                    m__default["default"].redraw();
                }
            }), m__default["default"](".w-75-ns.mw-90.measure.pa3", {
                class: joinClasses([
                    this.overwrite.uiDialogWrapper,
                    getContextClass(context),
                    theme().uiDialogWrapper
                ])
            }, m__default["default"](component, attrs))) : null;
        }
    }

    class DialogInvite extends Themable {
        oninit({ attrs: { config: { applyTheme } } }) {
            this.createTheme(applyTheme);
            const uiClass = {
                wrapper: joinClasses([theme().uiInputFieldset]),
                inputWrapper: joinClasses(["ba b--light-gray mb2", theme().uiDialogInviteInputWrapper]),
                input: joinClasses([theme().uiInput]),
                label: joinClasses([theme().uiInputLabel]),
            };
            this.inviteFormFields = new FormBuilder([{
                    key: "full_name",
                    group: "full_name",
                    input: {
                        id: "full_name",
                        type: "text" /* FieldType.text */, required: true, uiClass
                    }
                }, {
                    key: "email",
                    group: "email",
                    input: {
                        id: "email",
                        type: "email" /* FieldType.email */, required: true, uiClass
                    }
                }, {
                    key: "phone_number",
                    group: "phone_number",
                    input: {
                        id: "phone_number",
                        type: "tel" /* FieldType.tel */, required: true, uiClass
                    }
                }]);
        }
        onbeforeupdate({ attrs: { config: { applyTheme } } }) {
            this.updateTheme(applyTheme);
        }
        view({ attrs: { config, handler } }) {
            const { title, subTitle, bodyText, cancelButton, submitButton } = config;
            const inviteFormGroup = lodash__default["default"].groupBy(this.inviteFormFields ? this.inviteFormFields.fields : [], "group");
            return handler.active ? m__default["default"](DialogWrapper, { handler }, m__default["default"](".w-75-ns.mw-90.measure", {
                class: joinClasses([
                    this.overwrite.uiDialogInviteWrapper,
                    theme().uiDialogInviteWrapper,
                ])
            }, [
                m__default["default"](".pv3.ph4.mb3", [
                    m__default["default"]("h2.w-100", {
                        class: joinClasses([
                            this.overwrite.uiDialogInviteTitle,
                            theme().uiDialogInviteTitle
                        ])
                    }, title),
                    m__default["default"]("h5.w-100", {
                        class: joinClasses([
                            this.overwrite.uiDialogInviteSubTitle,
                            theme().uiDialogInviteSubTitle
                        ])
                    }, subTitle),
                    m__default["default"]("h5.w-100", {
                        class: joinClasses([
                            this.overwrite.uiDialogInviteBodyText,
                            theme().uiDialogInviteBodyText
                        ])
                    }, bodyText && m__default["default"].trust(bodyText)),
                    m__default["default"]("p.f6.b.pt3.mv1", {
                        class: joinClasses([
                            this.overwrite.uiDialogInviteLabel,
                            theme().uiDialogInviteLabel
                        ])
                    }, "Full Name"),
                    m__default["default"]("p.f6.pt1.ma0", lodash__default["default"].map(inviteFormGroup["full_name"], assembleFormField)),
                    m__default["default"]("p.f6.b.pt3.mv1", {
                        class: joinClasses([
                            this.overwrite.uiDialogInviteLabel,
                            theme().uiDialogInviteLabel
                        ])
                    }, "Email Address"),
                    m__default["default"]("p.f6.pt1.ma0", lodash__default["default"].map(inviteFormGroup["email"], assembleFormField)),
                    m__default["default"]("p.f6.b.pt3.mv1", {
                        class: joinClasses([
                            this.overwrite.uiDialogInviteLabel,
                            theme().uiDialogInviteLabel
                        ])
                    }, "Phone Number"),
                    m__default["default"]("p.f6.pt1.ma0", lodash__default["default"].map(inviteFormGroup["phone_number"], assembleFormField)),
                ]),
                //Button wrapper
                m__default["default"](".flex.flex-column.w-100.items-center.pa3", {
                    class: joinClasses([
                        theme().uiDialogInviteActionAreaWrapper,
                        this.overwrite.uiDialogInviteActionAreaWrapper,
                    ]),
                }, [
                    m__default["default"](uiWidgets.Button, {
                        classes: joinClasses([
                            this.overwrite.uiDialogInviteConfirmButton,
                            theme().uiDialogInviteConfirmButton
                        ]),
                        label: (submitButton === null || submitButton === void 0 ? void 0 : submitButton.label) || "Send Invite",
                        type: "button",
                        onclick: () => {
                            if (submitButton === null || submitButton === void 0 ? void 0 : submitButton.onclick) {
                                submitButton === null || submitButton === void 0 ? void 0 : submitButton.onclick({
                                    fullName: this.inviteFormFields.streamMap["full_name"].value(),
                                    email: this.inviteFormFields.streamMap["email"].value(),
                                    mobile: this.inviteFormFields.streamMap["phone_number"].value(),
                                });
                                handler.close();
                            }
                            m__default["default"].redraw();
                        }
                    }),
                    m__default["default"]("span.dim.pointer.pa1.underline", {
                        class: joinClasses([
                            theme().uiDialogLinkButton,
                            this.overwrite.uiDialogLinkButton,
                        ]),
                        onclick: () => {
                            handler.close();
                            if (cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.onclick) {
                                cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.onclick();
                            }
                        }
                    }, (cancelButton === null || cancelButton === void 0 ? void 0 : cancelButton.label) || "Back")
                ])
            ])) : null;
        }
    }

    function renamePureFile(fileList, updateId) {
        return ({ target: { value } }) => {
            const newFileList = fileList;
            const idx = lodash__default["default"].findIndex(newFileList, { guid: updateId });
            if (idx === -1) {
                return;
            }
            const updateFile = newFileList[idx];
            const ext = uiWidgets.fileNameExtSplit(updateFile.name)[1];
            updateFile.name = value + ext;
            newFileList.splice(idx, 1, updateFile);
        };
    }

    class SingleFile {
        removeFile(fileList, index) {
            fileList(lodash__default["default"].remove(fileList(), (_val, idx) => idx !== index));
        }
        view({ attrs: { fileList, combineFiles, maxFileSize, file: { file, name, guid }, fileIndex, iconLeft } }) {
            const fileTooBig = !combineFiles() && maxFileSize !== -1 && file && file.size > maxFileSize;
            return m__default["default"]('.flex.flex-row.fade-in.scale-out-center', {
                class: joinClasses([
                    theme().uiDialogUploadFileWrapper
                ]),
                style: {
                    marginLeft: !combineFiles() ? '0rem' : iconLeft ? '0rem' : '2.5rem',
                }
            }, [
                combineFiles() && iconLeft && m__default["default"]('span.mr2.ml3', {
                    class: joinClasses([
                        iconLeft,
                        theme().uiDialogUploadFileIconLeft
                    ])
                }),
                m__default["default"]('div.mr2', {
                    class: joinClasses([
                        fileTooBig ? theme().uiDialogUploadFileTypeInvalid : undefined,
                        combineFiles() ? theme().uiDialogUploadFileTypeSmall : theme().uiDialogUploadFileType,
                        theme().uiDialogContextNeutral
                    ])
                }, fileTooBig ? m__default["default"]('i.fa-solid.fa-exclamation') : fileExtNameOnly((file === null || file === void 0 ? void 0 : file.type) || '')),
                m__default["default"]('.flex.flex-column.w-75', [
                    m__default["default"]('.flex', [
                        m__default["default"]("input.input-reset.flex-auto.pv1.fw2.dark-gray[type=text].bn.pl0.truncate", {
                            class: theme().uiDialogContextNeutral,
                            style: {
                                fontSize: combineFiles() ? '.7rem' : '1rem'
                            },
                            id: guid,
                            readonly: combineFiles(),
                            value: uiWidgets.fileNameExtSplit(name)[0],
                            onchange: renamePureFile(fileList(), guid)
                        }),
                        !combineFiles() && m__default["default"]('label.fa-thin.fa-pencil.self-center.pointer', {
                            for: guid,
                        })
                    ]),
                    file && m__default["default"]('div', {
                        class: joinClasses([
                            fileTooBig ? theme().uiDialogUploadFileSizeInvalid : undefined,
                            theme().uiDialogUploadFileSize,
                        ]),
                    }, `${humaniseByteCount(file.size)}`),
                ]),
                m__default["default"]('i.pointer', {
                    class: joinClasses([
                        fileTooBig ? theme().uiDialogUploadFileDeleteIconInvalid : undefined,
                        theme().uiDialogUploadFileDeleteIcon,
                    ]),
                    onclick: () => {
                        this.removeFile(fileList, fileIndex);
                    }
                })
            ]);
        }
    }

    class CombineSingleFile {
        view({ attrs: { accMaxFileSize, fileListSize, combinedFileNamePdf } }) {
            const fileTooBig = fileListSize() > accMaxFileSize;
            return m__default["default"]('.flex.flex-row', {
                class: joinClasses([
                    theme().uiDialogUploadFileWrapper,
                ]),
            }, [
                m__default["default"]('div.mr2', {
                    class: joinClasses([
                        fileTooBig ? theme().uiDialogUploadFileTypeInvalid : undefined,
                        theme().uiDialogUploadFileType,
                        theme().uiDialogContextNeutral
                    ])
                }, fileExtNameOnly('application/pdf')),
                m__default["default"]('.flex.flex-column.w-100', [
                    m__default["default"]('.flex', [
                        m__default["default"]("input.input-reset.flex-auto.pv1.fw2.dark-gray[type=text].bn.pl0.truncate", {
                            id: 'combineSingleFile',
                            value: combinedFileNamePdf(),
                            class: theme().uiDialogContextNeutral,
                            onchange: ({ target: { value } }) => combinedFileNamePdf(value)
                        }),
                        m__default["default"]('label.fa-thin.fa-pencil.self-center.pointer', {
                            for: 'combineSingleFile',
                        })
                    ]),
                    m__default["default"]('div', {
                        class: joinClasses([
                            fileTooBig ? theme().uiDialogUploadFileSizeInvalid : undefined,
                            theme().uiDialogUploadFileSize,
                        ]),
                    }, `${humaniseByteCount(fileListSize())}`),
                ]),
            ]);
        }
    }

    function getFilesWrapperClassFirst() {
        return createResponsiveClass({
            key: 'stacked-files-first',
            style: {
                overflowY: 'visible',
            }
        });
    }
    function getFilesWrapperClass() {
        return createResponsiveClass({
            key: 'stacked-files',
            style: {
                overflowY: 'auto',
            },
            styleNS: {
                overflowY: 'auto',
            }
        });
    }
    class Files {
        view({ attrs: { fileListSize, fileList, maxFileSize, combineFiles, maxAccFileSize, combinedFileNamePdf } }) {
            const fileCount = fileList().length;
            return m__default["default"]('div', {
                style: {
                    maxHeight: '19rem',
                    height: '100%',
                }
            }, [
                combineFiles() && fileListSize() > 0 && m__default["default"](CombineSingleFile, {
                    accMaxFileSize: maxAccFileSize,
                    fileList,
                    fileListSize,
                    combinedFileNamePdf
                }),
                m__default["default"]("div", {
                    class: fileCount > 2 ? getFilesWrapperClass() : getFilesWrapperClassFirst(),
                    style: {
                        maxHeight: combineFiles() ? '16rem' : '19rem',
                        paddingRight: '.5rem',
                    }
                }, lodash__default["default"].map(fileList(), (file, i) => {
                    return m__default["default"](SingleFile, {
                        iconLeft: 'fa-regular fa-turn-down-right',
                        key: file.guid,
                        file,
                        fileList,
                        fileIndex: i,
                        maxFileSize,
                        combineFiles
                    });
                }))
            ]);
        }
    }

    var __awaiter$2 = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    class PdfBuilder {
        constructor() {
            this.pageSize = pdfLib.PageSizes.A4;
        }
        init(font) {
            return __awaiter$2(this, void 0, void 0, function* () {
                this.pdf = yield pdfLib.PDFDocument.create();
                this.font = yield this.pdf.embedFont(font);
            });
        }
        pageCount() {
            return this.pdf.getPageCount();
        }
        addTextPage(text) {
            const page = this.pdf.addPage();
            page.setSize(this.pageSize[0], this.pageSize[1]);
            const { height } = page.getSize();
            page.drawText(text, {
                x: 60,
                y: height - 90,
                size: 30,
                font: this.font
            });
        }
        addFiles(fileList) {
            return __awaiter$2(this, void 0, void 0, function* () {
                for (const file of fileList) {
                    if (file.type === "application/pdf") {
                        yield this.addPdf(file);
                    }
                    if (["image/png", "image/jpeg"].indexOf(file.type) !== -1) {
                        yield this.addImage(file);
                    }
                    if (["image/png", "image/jpeg", "application/pdf"].indexOf(file.type) === -1) {
                        throw new Error("Unsupported file type of " + file.type);
                    }
                }
            });
        }
        fileToUint8Array(file) {
            return __awaiter$2(this, void 0, void 0, function* () {
                const reader = new FileReader();
                return new Promise((resolve, reject) => {
                    reader.readAsArrayBuffer(file);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    reader.onloadend = function (evt) {
                        if (evt.target.readyState === FileReader.DONE) {
                            const arrayBuffer = evt.target.result;
                            resolve(new Uint8Array(arrayBuffer));
                        }
                        reject('Buffer could not be created');
                    };
                });
            });
        }
        addPdf(pdf) {
            return __awaiter$2(this, void 0, void 0, function* () {
                const pdfUint = yield this.fileToUint8Array(pdf);
                const pdfBytes = yield pdfLib.PDFDocument.load(pdfUint);
                for (const page of pdfBytes.getPages()) {
                    const embed = yield this.pdf.embedPage(page);
                    const pageSize = embed.height < embed.width
                        ? [this.pageSize[1], this.pageSize[0]]
                        : [this.pageSize[0], this.pageSize[1]];
                    const newPage = this.pdf.addPage(pageSize);
                    newPage.drawPage(embed, { height: pageSize[1], width: pageSize[0] });
                }
            });
        }
        addImage(image) {
            return __awaiter$2(this, void 0, void 0, function* () {
                const imageBytes = yield this.fileToUint8Array(image);
                const embed = image.type === "image/jpeg" ? yield this.pdf.embedJpg(imageBytes) : yield this.pdf.embedPng(imageBytes);
                const pageSize = embed.height < embed.width
                    ? [this.pageSize[1], this.pageSize[0]]
                    : [this.pageSize[0], this.pageSize[1]];
                const { width, height } = embed.scaleToFit(pageSize[0], pageSize[1]);
                const newPage = this.pdf.addPage();
                newPage.setSize(pageSize[0], pageSize[1]);
                newPage.drawImage(embed, { x: 0, y: pageSize[1] - height, width, height });
            });
        }
        toBase64() {
            return __awaiter$2(this, void 0, void 0, function* () {
                return this.pdf.saveAsBase64({ dataUri: true });
            });
        }
        toFile() {
            return __awaiter$2(this, void 0, void 0, function* () {
                const base64 = yield this.toBase64();
                return new File([
                    uiWidgets.dataURItoBlob(base64)
                ], "file.pdf", { type: "application/pdf" });
            });
        }
        toUint8Array() {
            return this.pdf.save();
        }
    }
    function pdfBuilderFactory(font = pdfLib.StandardFonts.Helvetica) {
        return __awaiter$2(this, void 0, void 0, function* () {
            const builder = new PdfBuilder();
            yield builder.init(font);
            return builder;
        });
    }

    var __awaiter$1 = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    function smallFileUploader(maxFileSize, maxAccFileSize, combinedMode) {
        return m__default["default"]('.flex.flex-column.items-center', [
            m__default["default"]('i', {
                class: joinClasses([theme().uiDialogUploadIcon])
            }),
            m__default["default"]('p.f5', 'Choose files...'),
            !combinedMode && maxFileSize !== -1 && m__default["default"]('p.f7', `Max file size ${humaniseByteCount(maxFileSize)}`),
            combinedMode && maxAccFileSize !== -1 && m__default["default"]('p.f7', `Maximum combined file size is ${humaniseByteCount(maxAccFileSize)}`)
        ]);
    }
    function NSFileUploader(maxFileSize, maxAccFileSize, combinedMode) {
        return m__default["default"](".flex.flex-column.items-center", m__default["default"]("i.fa-thin.fa-upload.fa-2x", { style: { marginBottom: "1rem" } }), m__default["default"]("div", "Drop files here"), m__default["default"]("div.mt2", "or"), m__default["default"]("div", {
            class: joinClasses([
                theme().uiDialogUploadFileButton,
                theme().uiDialogContextNeutral
            ])
        }, "Choose file"), !combinedMode && maxFileSize !== -1 && m__default["default"]('p.f7', `Maximum file size is ${humaniseByteCount(maxFileSize)}`), combinedMode && maxAccFileSize !== -1 && m__default["default"]('p.f7', `Maximum combined file size is ${humaniseByteCount(maxAccFileSize)}`));
    }
    const getTransitionClassNoFile = createResponsiveClass({
        key: 'getTransitionClassNoFile',
        style: {
            marginLeft: 'unset',
        },
        styleNS: {
            marginLeft: '50%',
            transition: "margin-left 0.2s ease-in-out",
        }
    });
    const getTransitionClassWithFile = createResponsiveClass({
        key: 'getTransitionClassWithFile',
        style: {
            marginLeft: 'unset',
        },
        styleNS: {
            marginLeft: 'unset',
            transition: "margin-left 0.2s ease-in-out",
        }
    });
    const uploadAreaWrapper = createResponsiveClass({
        key: "upload_area_wrapper",
        style: {
            height: '9rem',
            pointerEvents: "none",
            position: "relative",
            border: "2px dashed var(--ui-builder-text)",
            borderRadius: "1rem"
        },
        styleNS: {
            height: '19rem'
        }
    });
    const uiClass = {
        wrapper: createResponsiveClass({
            key: "file_uploader_wrapper",
            style: {
                display: "block",
                position: "absolute",
                top: "0",
                opacity: "0",
                pointerEvents: "auto",
                minWidth: "100%",
                minHeight: "100%"
            },
        }),
        inputWrapper: createResponsiveClass({
            key: "file_uploader_inner",
            style: {
                minWidth: "100%",
                minHeight: '9rem',
            },
            styleNS: {
                minWidth: "100%",
                minHeight: '15rem'
            }
        })
    };
    function fileConstructor(fileList, fileName) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const pdfBuilder = yield pdfBuilderFactory();
            const files = lodash__default["default"](fileList()).map(({ file }) => file).compact().value();
            yield pdfBuilder.addFiles(files);
            const bytes = yield pdfBuilder.toUint8Array();
            return new File([bytes], fileName, {
                type: "application/pdf",
                lastModified: Date.now()
            });
        });
    }
    function constructUploadBody(fileList, fileName = 'upload.pdf', stitch) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (stitch) {
                const file = yield fileConstructor(fileList, fileName);
                const [{ guid, path }] = fileList();
                return [{
                        name: fileName,
                        _id: guid,
                        prop: "tableUpload",
                        file,
                        remoteUrl: path,
                        lastModified: Date.now(),
                        size: file.size,
                        type: file.type
                    }];
            }
            else {
                const files = [];
                for (const singleFile of fileList()) {
                    const file = singleFile.file;
                    files.push({
                        _id: singleFile.guid,
                        prop: "tableUpload",
                        file,
                        name: singleFile.name,
                        remoteUrl: singleFile.path,
                        lastModified: (file === null || file === void 0 ? void 0 : file.lastModified) || Date.now(),
                        size: (file === null || file === void 0 ? void 0 : file.size) || 0,
                        type: (file === null || file === void 0 ? void 0 : file.type) || ''
                    });
                }
                return files;
            }
        });
    }

    function pluralSentenceBuilder(count) {
        return count === 1 ? 'file exceeds' : 'files exceed';
    }
    class WarningMessage {
        view({ attrs: { combineFiles, fileSizeValid, maxAccFileSize, maxIndividualFileSize, filesTooBigCount = 0 } }) {
            return m__default["default"](".gr1-ns.gc1-ns.self-center", {
                class: joinClasses([
                    theme().uiDialogUploadWarning
                ])
            }, [
                combineFiles() && maxAccFileSize && !fileSizeValid() && m__default["default"]('span', `Maximum file size exceeded. The combined maximum upload size is ${humaniseByteCount(maxAccFileSize)}`),
                !combineFiles() && maxIndividualFileSize !== -1 && m__default["default"]('span', `${filesTooBigCount} ${pluralSentenceBuilder(filesTooBigCount)} the maximum upload size of ${humaniseByteCount(maxIndividualFileSize)}`)
            ]);
        }
    }

    const mutableSize = stream__default["default"]();
    const size = mutableSize;
    const mutableScreenSize = mutableSize.map(({ width }) => {
        const page = window.document.querySelector('body');
        const compStyles = window.getComputedStyle(page);
        const fontSize = Number(compStyles.getPropertyValue('font-size').split("px")[0]);
        // breakpoint sizes 
        const NS = 30 * fontSize; // 30em
        const med = 60 * fontSize; // 60em
        if (width <= NS) {
            return {
                small: true,
                medium: false,
                large: false,
                ns: false,
            };
        }
        else if (width > NS && width <= med) {
            return {
                small: false,
                medium: true,
                large: false,
                ns: true,
            };
        }
        else {
            return {
                small: false,
                medium: false,
                large: true,
                ns: true,
            };
        }
    });
    const screenSize = mutableScreenSize;
    function setSize() {
        mutableSize({
            height: window.innerHeight,
            width: window.innerWidth
        });
    }
    function onResize() {
        setSize();
        m.redraw();
    }
    // Update window size stream after a small delay
    window.addEventListener("resize", lodash__default["default"].debounce(onResize, 250));
    // Set initial size
    setSize();

    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    class Uploader {
        constructor() {
            this.maxAccFileSize = -1;
            this.maxFileSize = -1;
            this.acceptList = ["application/pdf", "image/jpeg", "image/png"];
            this.acceptListStr = this.acceptList.join(", ");
            this.fileList = stream__default["default"]([]);
            this.fileInput = stream__default["default"]([]);
            this.combineFiles = stream__default["default"](false);
            this.displayCombineToggle = false;
            this.combinedFileName = stream__default["default"](`${new Date().toJSON().slice(0, 10)}`);
            this.notes = stream__default["default"]('');
            this.displayNotes = false;
            // ensure a filename always exists
            this.combinedFileNamePdf = this.combinedFileName.map((fileName) => {
                return fileName.trim() ? fileName : `${new Date().toJSON().slice(0, 10)}.pdf`;
            });
            // Sum size of files
            this.fileListSize = this.fileList.map((list) => lodash__default["default"]
                .reduce(list, (acc, { file }) => acc + (file ? file.size : 0), 0));
            // Check against max file size (final pdf may vary slightly compared to parts)
            this.fileSizeValid = this.fileListSize.map((size) => {
                return this.maxAccFileSize === -1 ? true : size <= this.maxAccFileSize;
            });
            this.filesTooBigChecker = this.fileList.map((list) => {
                // return as valid if max
                if (this.maxFileSize === -1)
                    return [false];
                return lodash__default["default"].map(list, ({ file }) => {
                    if (file === null || file === void 0 ? void 0 : file.size) {
                        return file.size > this.maxFileSize;
                    }
                    return false;
                });
            });
            this.filesTooBigCount = this.filesTooBigChecker.map((files) => {
                return files.filter((tooBig) => tooBig === true).length;
            });
            this.allFileSizesValid = this.filesTooBigCount.map((count) => count === 0);
            // Ensure all files in list are of accepted types
            this.fileTypeValid = this.fileList.map((list) => lodash__default["default"].every(list, ({ file }) => file ? lodash__default["default"].includes(this.acceptList, file.type) : false));
            // Combine size & type validation
            this.combinedFileValid = stream__default["default"].lift((sizePass, typePass) => sizePass && typePass, this.fileSizeValid, this.fileTypeValid);
            this.singleFileValid = stream__default["default"].lift((allSizePass, typePass) => allSizePass && typePass, this.allFileSizesValid, this.fileTypeValid);
            this.hasFile = () => {
                return this.fileList().length > 0;
            };
            this.saving = false;
        }
        isValid() {
            if (this.saving || this.fileList().length === 0) {
                return false;
            }
            return this.combineFiles() ? this.combinedFileValid() : this.singleFileValid();
        }
        oninit() {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                const config = (_a = application().vault) === null || _a === void 0 ? void 0 : _a.assetUpload;
                if (typeof config === 'object') {
                    this.maxAccFileSize = config.accMaxSize || -1;
                    this.maxFileSize = config.singleMaxSize || -1;
                    this.combineFiles(config.combineFiles || false);
                    this.displayCombineToggle = config.combineFilesToggle || false;
                }
            });
        }
        view({ attrs: { onSubmit, isDialog = false } }) {
            const { fileList } = this;
            const isMobile = screenSize().small;
            return m__default["default"](".flex.flex-column.pa2", {
                style: {
                    minHeight: "calc(100% - 32rem)",
                    maxWidth: "45rem",
                    margin: "2rem auto"
                }
            }, m__default["default"](".grid.gap3.template-cols.relative.br4.pa4.3.pb4.pa4-ns", {
                class: joinClasses([
                    theme().uiDialogContextNeutral
                ]),
                style: {
                    "--ui-builder-cols": 1,
                    "--ui-builder-cols-ns": 2,
                    "grid-auto-columns": "minmax(0, 1fr)"
                }
            }, [
                // 1) combine files toggle
                m__default["default"]('.gc2-ns.gc1.items-center', [
                    this.displayCombineToggle && m__default["default"](uiWidgets.ToggleInput, {
                        field: {
                            id: "combineFiles",
                            label: "Combine files",
                            uiClass: {
                                wrapper: 'f5 ml2',
                                inputWrapper: createResponsiveClass({
                                    key: '',
                                    style: {
                                        background: 'transparent !important'
                                    }
                                })
                            }
                        },
                        value: this.combineFiles
                    }),
                ]),
                // 2) drop zone
                m__default["default"](`.gc1.flex.flex-column.w-100`, {
                    class: joinClasses([
                        this.hasFile() ? getTransitionClassWithFile : getTransitionClassNoFile,
                    ]),
                }, [
                    m__default["default"](".flex.items-center.justify-center", {
                        class: joinClasses([
                            uploadAreaWrapper,
                            theme().uiDialogContextNeutral
                        ])
                    }, isMobile
                        ? smallFileUploader(this.maxFileSize, this.maxAccFileSize, this.combineFiles())
                        : NSFileUploader(this.maxFileSize, this.maxAccFileSize, this.combineFiles()), m__default["default"](uiWidgets.MultiOmniFileInput, {
                        value: fileList,
                        showDisplay: false,
                        field: {
                            id: "input",
                            accept: this.acceptListStr,
                            uiClass
                        }
                    }))
                ]),
                // 3) Files
                m__default["default"]('.gc1.gr1-ns.w-100.ml0', {
                    style: {
                        width: this.hasFile() ? '100%' : '0',
                    }
                }, m__default["default"](Files, {
                    fileList,
                    maxFileSize: this.maxFileSize,
                    combineFiles: this.combineFiles,
                    fileListSize: this.fileListSize,
                    maxAccFileSize: this.maxAccFileSize,
                    combinedFileNamePdf: this.combinedFileNamePdf
                })),
                // 5) Upload Button
                m__default["default"](`.gc1.w-100`, {
                    class: this.hasFile() ? getTransitionClassWithFile : getTransitionClassNoFile,
                }, m__default["default"](uiWidgets.Button, {
                    label: this.saving ? "Uploading..." : 'Upload',
                    classes: joinClasses([
                        theme().uiDialogUploadSubmitButton,
                        theme().uiDialogContextDefault
                    ]),
                    style: {
                        // important to line up with the floating label notes input
                        marginTop: '.6rem'
                    },
                    disabled: !this.isValid(),
                    onclick: () => __awaiter(this, void 0, void 0, function* () {
                        this.saving = true;
                        const iFile = yield constructUploadBody(this.fileList, this.combinedFileNamePdf(), this.combineFiles());
                        onSubmit && onSubmit(iFile).catch((e) => {
                            console.error('problem submitting file: ', e);
                        }).then(() => {
                            this.saving = false;
                            this.fileInput([]);
                            dialogHandler.close();
                        });
                    }),
                    rightIcon: this.saving ? 'fas fa-spinner fa-spin' : ''
                })),
                // 4) notes area
                this.displayNotes && this.hasFile() && m__default["default"]('.gc1.w-100', {
                    class: this.hasFile() ? getTransitionClassWithFile : getTransitionClassNoFile,
                }, m__default["default"](uiWidgets.TextareaInput, {
                    field: {
                        id: "text-area-input",
                        label: "Notes",
                        type: "textarea",
                        uiClass: {
                            wrapper: theme().uiDialogUploadNotesWrapper,
                            inputWrapper: theme().uiDialogUploadNotesInputWrapper,
                            input: theme().uiDialogUploadNotesInput,
                            label: theme().uiDialogUploadNotesLabel
                        },
                        layout: "floatLabel" /* LayoutType.floatLabel */,
                    },
                    value: this.notes,
                })),
                // 6) Warning
                m__default["default"]('.gc2-ns', !this.allFileSizesValid() && this.hasFile() && m__default["default"](WarningMessage, {
                    combineFiles: this.combineFiles,
                    maxIndividualFileSize: this.maxFileSize,
                    maxAccFileSize: this.maxAccFileSize,
                    filesTooBigCount: this.filesTooBigCount(),
                    fileSizeValid: this.fileSizeValid
                })),
                isDialog && m__default["default"]('i.fa-regular.fa-circle-xmark.pointer', {
                    style: {
                        position: 'absolute',
                        top: '18px',
                        right: '16px',
                        fontSize: '1.3rem'
                    },
                    onclick() {
                        dialogHandler.close();
                    }
                })
            ]));
        }
    }

    class DialogUpload extends Themable {
        view({ attrs: { handler, config: { onSubmit } } }) {
            return handler.active && m__default["default"](DialogWrapper, { handler }, m__default["default"](".mw-90.w-100.absolute.top-0", {
                class: theme().uiDialogWrapper
            }, m__default["default"](Uploader, {
                onSubmit,
                isDialog: true
            })));
        }
    }

    class Dialog {
        onbeforeupdate() {
            dialogHandler.next();
        }
        view() {
            const { config } = dialogHandler;
            if (config) {
                if (config.closeDialog) {
                    dialogHandler.close();
                }
                switch (config.type) {
                    case exports.DialogType.notification: return m__default["default"](DialogNotification, { config, handler: dialogHandler });
                    case exports.DialogType.confirm: return m__default["default"](DialogConfirm, { config, handler: dialogHandler });
                    case exports.DialogType.login: return m__default["default"](DialogLogin, { config, handler: dialogHandler });
                    case exports.DialogType.feedback: return m__default["default"](DialogFeedback, { config, handler: dialogHandler });
                    case exports.DialogType.invite: return m__default["default"](DialogInvite, { config, handler: dialogHandler });
                    case exports.DialogType.component: return m__default["default"](DialogComponent, { config, handler: dialogHandler });
                    case exports.DialogType.upload: return m__default["default"](DialogUpload, { config, handler: dialogHandler });
                    case exports.DialogType.form: return m__default["default"](DialogForm, { config, handler: dialogHandler });
                    default: return null;
                }
            }
            return null;
        }
    }

    class SearchBox {
        constructor() {
            this.id = lodash__default["default"].uniqueId("search-");
        }
        view({ attrs: { placeholder, searchValue } }) {
            return m__default["default"]("form.flex.flex-row.items-center.bg-light-gray", {
                class: joinClasses([theme().uiSearchBoxWrapper]),
                onsubmit: () => false
            }, m__default["default"]("label.fal.fa-fw.fa-search.w2.pv2.pl2.tc.pointer", {
                class: joinClasses([theme().uiSearchBoxIcon, theme().uiIcon]),
                for: this.id
            }), m__default["default"](uiWidgets.BaseInput, {
                field: {
                    id: this.id,
                    label: "",
                    type: "search" /* FieldType.search */,
                    uiClass: {
                        wrapper: "pa0 bn flex-auto",
                        input: theme().uiSearchBoxInput
                    },
                    placeholder,
                    instant: true
                },
                value: searchValue
            }), 
            // Clear button when search has value
            searchValue() ? m__default["default"]("i.fal.fa-fw.fa-times.pa2.tc.pointer.dim", {
                class: joinClasses([
                    theme().uiSearchBoxClearIcon
                ]),
                title: "Reset Search",
                onclick: () => searchValue("")
            }) : null);
        }
    }

    const mutablePusher = stream__default["default"]();
    const pusher = mutablePusher;

    var BrandingRoute;
    (function (BrandingRoute) {
        BrandingRoute["list"] = "list";
        BrandingRoute["root"] = "root";
        BrandingRoute["single"] = "single";
        BrandingRoute["new"] = "new";
        BrandingRoute["view"] = "view";
        BrandingRoute["edit"] = "edit";
        BrandingRoute["comp"] = "comp";
        BrandingRoute["pdf"] = "pdf";
        BrandingRoute["default"] = "default";
    })(BrandingRoute || (BrandingRoute = {}));

    const mutableItem = stream__default["default"](null);
    stream__default["default"]();

    const mutableBaseBranding = stream__default["default"]({});
    const mutableRouteType = stream__default["default"](BrandingRoute.root);
    const branding = stream__default["default"].lift((route, base, selectedItem) => {
        const routes = base.routes || {};
        const routeBranding = routes[route] || [];
        const selectedBranding = filterRouteBranding(routeBranding, selectedItem);
        return lodash__default["default"].assign({}, base, selectedBranding || {});
    }, mutableRouteType, mutableBaseBranding, mutableItem);
    function filterRouteBranding(brandingArr, selectedItem) {
        const tags = selectedItem && "content" in selectedItem ? selectedItem.content : selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.tags;
        const _id = selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem._id;
        const brandingById = _id ? pickByProperty(brandingArr, { _id }) : null;
        const brandingByTags = (tags === null || tags === void 0 ? void 0 : tags.length) ? pickByProperty(brandingArr, { tags }) : null;
        const rootBranding = lodash__default["default"].filter(brandingArr, (brandItem) => !brandItem.tags || !brandItem.tags.length)[0];
        return brandingById || brandingByTags || rootBranding || {};
    }
    // Push new branding into brandMap, setting default values
    function updateBrandmap({ company = "", copyright = "", tel = "", email = "", address = "", poweredBy, header = [
        { type: 0 /* NavType.spacer */ },
        { type: 7 /* NavType.logoutLarge */ }
    ], subheader = [], footer = [
        { type: 9 /* NavType.poweredBy */ },
        { type: 0 /* NavType.spacer */ },
        { type: 8 /* NavType.copyright */ },
        { type: 0 /* NavType.spacer */ },
        { type: 10 /* NavType.progress */ },
        { type: 6 /* NavType.logoutSmall */ }
    ], routes = {} }) {
        mutableBaseBranding({
            company, copyright,
            tel, email, address,
            poweredBy,
            header, subheader, footer, routes
        });
    }
    // Apply default value
    updateBrandmap({});
    function loadBranding() {
        const path = application().brandingPath;
        return path
            ? m.request(path)
                .then(updateBrandmap).catch(lodash__default["default"].noop)
            : Promise.resolve();
    }

    const colorMapper = {
        body: {
            background: "bg-washed-blue",
            color: "ui-builder-text"
        },
        default: {
            background: "bg-white",
            color: "ui-builder-accent"
        },
        lighter: {
            background: "bg-white",
            color: "ui-builder-accent-lighter"
        },
        darker: {
            background: "bg-white",
            color: "ui-builder-accent-darker"
        },
        alt: {
            background: "bg-ui-builder-accent",
            color: "white"
        },
        altLighter: {
            background: "bg-ui-builder-lighter",
            color: "ui-builder-text"
        },
        altDarker: {
            background: "bg-ui-builder-accent-darker",
            color: "white"
        },
        error: {
            background: "bg-ui-builder-error",
            color: "white"
        },
        warn: {
            background: "bg-ui-builder-warn",
            color: "white"
        },
        neutral: {
            background: "bg-white",
            color: "ui-builder-text"
        },
        user1: {
            background: "bg-transparent",
            color: "ui-builder-user1"
        },
        user2: {
            background: "bg-transparent",
            color: "ui-builder-user2"
        },
        user3: {
            background: "bg-transparent",
            color: "ui-builder-user3"
        },
        user4: {
            background: "bg-transparent",
            color: "ui-builder-user4"
        },
        user5: {
            background: "bg-transparent",
            color: "ui-builder-user5"
        }
    };
    const colorContextMapper = {
        ["default" /* ColorContext.default */]: "ui-builder-accent invert bg-ui-builder-accent-invert",
        ["lighter" /* ColorContext.lighter */]: "ui-builder-accent-light bg-ui-builder-accent-invert",
        ["darker" /* ColorContext.darker */]: "ui-builder-accent-dark bg-ui-builder-accent-invert",
        ["alt" /* ColorContext.alt */]: "ui-builder-text-invert bg-ui-builder-accent",
        ["altLighter" /* ColorContext.altLighter */]: "ui-builder-text bg-ui-builder-lighter",
        ["altDarker" /* ColorContext.altDarker */]: "ui-builder-text-invert bg-ui-builder-accent-dark",
        ["error" /* ColorContext.error */]: "ui-builder-text-invert bg-ui-builder-danger",
        ["warn" /* ColorContext.warn */]: "ui-builder-text-invert bg-ui-builder-warn",
        ["neutral" /* ColorContext.neutral */]: "ui-builder-text bg-ui-builder-accent-invert"
    };

    const dataMap = new Map();
    function loadDataList() {
        const pathList = application().dataPathList;
        return Promise.all(lodash__default["default"].map(pathList, ({ id, path }) => m.request(path)
            .then((res) => dataMap.set(id, res))
            .catch(lodash__default["default"].noop)));
    }
    function getData(id) {
        return dataMap.get(id);
    }

    class GridCellRenderer {
        constructor() {
            this.element = document.createElement("div");
            this.classList = ["h-100"];
        }
        init(params) {
            this.element.classList.add(...this.classList);
            this.render(params);
        }
        refresh(params) {
            this.render(params);
            return true;
        }
        destroy() {
            m__default["default"].render(this.element, null);
        }
        getGui() {
            return this.element;
        }
        render(params) {
            m__default["default"].render(this.element, this.view(params));
        }
    }

    class AnimatedFabItem {
        constructor() {
            this.animationClass = "";
        }
        static openStyle(index) {
            return {
                transitionDelay: `${index / 9}s`,
                opacity: "1",
                width: "12rem"
            };
        }
        static closedStyle(offset) {
            return {
                transitionDelay: `${offset / 9}s`,
                opacity: "0",
                width: "0"
            };
        }
        oninit({ attrs: { open, index, offset } }) {
            open.map((isOpen) => {
                this.animationClass = isOpen ? "fab-item-in" : "fab-item-out";
                this.animationStyle = isOpen ? AnimatedFabItem.openStyle(index) : AnimatedFabItem.closedStyle(offset);
                m__default["default"].redraw();
            });
        }
    }

    /*!
     * matrix 3.8.0
     * https://greensock.com
     *
     * Copyright 2008-2021, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
    */

    /* eslint-disable */
    var _doc$2,
        _win$2,
        _docElement$1,
        _body$2,
        _divContainer,
        _svgContainer,
        _identityMatrix$1,
        _gEl,
        _transformProp$2 = "transform",
        _transformOriginProp$1 = _transformProp$2 + "Origin",
        _hasOffsetBug,
        _setDoc = function _setDoc(element) {
      var doc = element.ownerDocument || element;

      if (!(_transformProp$2 in element.style) && "msTransform" in element.style) {
        //to improve compatibility with old Microsoft browsers
        _transformProp$2 = "msTransform";
        _transformOriginProp$1 = _transformProp$2 + "Origin";
      }

      while (doc.parentNode && (doc = doc.parentNode)) {}

      _win$2 = window;
      _identityMatrix$1 = new Matrix2D();

      if (doc) {
        _doc$2 = doc;
        _docElement$1 = doc.documentElement;
        _body$2 = doc.body;
        _gEl = _doc$2.createElementNS("http://www.w3.org/2000/svg", "g"); // prevent any existing CSS from transforming it

        _gEl.style.transform = "none"; // now test for the offset reporting bug. Use feature detection instead of browser sniffing to make things more bulletproof and future-proof. Hopefully Safari will fix their bug soon but it's 2020 and it's still not fixed.

        var d1 = doc.createElement("div"),
            d2 = doc.createElement("div");

        _body$2.appendChild(d1);

        d1.appendChild(d2);
        d1.style.position = "static";
        d1.style[_transformProp$2] = "translate3d(0,0,1px)";
        _hasOffsetBug = d2.offsetParent !== d1;

        _body$2.removeChild(d1);
      }

      return doc;
    },
        _forceNonZeroScale = function _forceNonZeroScale(e) {
      // walks up the element's ancestors and finds any that had their scale set to 0 via GSAP, and changes them to 0.0001 to ensure that measurements work. Firefox has a bug that causes it to incorrectly report getBoundingClientRect() when scale is 0.
      var a, cache;

      while (e && e !== _body$2) {
        cache = e._gsap;
        cache && cache.uncache && cache.get(e, "x"); // force re-parsing of transforms if necessary

        if (cache && !cache.scaleX && !cache.scaleY && cache.renderTransform) {
          cache.scaleX = cache.scaleY = 1e-4;
          cache.renderTransform(1, cache);
          a ? a.push(cache) : a = [cache];
        }

        e = e.parentNode;
      }

      return a;
    },
        // possible future addition: pass an element to _forceDisplay() and it'll walk up all its ancestors and make sure anything with display: none is set to display: block, and if there's no parentNode, it'll add it to the body. It returns an Array that you can then feed to _revertDisplay() to have it revert all the changes it made.
    // _forceDisplay = e => {
    // 	let a = [],
    // 		parent;
    // 	while (e && e !== _body) {
    // 		parent = e.parentNode;
    // 		(_win.getComputedStyle(e).display === "none" || !parent) && a.push(e, e.style.display, parent) && (e.style.display = "block");
    // 		parent || _body.appendChild(e);
    // 		e = parent;
    // 	}
    // 	return a;
    // },
    // _revertDisplay = a => {
    // 	for (let i = 0; i < a.length; i+=3) {
    // 		a[i+1] ? (a[i].style.display = a[i+1]) : a[i].style.removeProperty("display");
    // 		a[i+2] || a[i].parentNode.removeChild(a[i]);
    // 	}
    // },
    _svgTemps = [],
        //we create 3 elements for SVG, and 3 for other DOM elements and cache them for performance reasons. They get nested in _divContainer and _svgContainer so that just one element is added to the DOM on each successive attempt. Again, performance is key.
    _divTemps = [],
        _getDocScrollTop$1 = function _getDocScrollTop() {
      return _win$2.pageYOffset || _doc$2.scrollTop || _docElement$1.scrollTop || _body$2.scrollTop || 0;
    },
        _getDocScrollLeft$1 = function _getDocScrollLeft() {
      return _win$2.pageXOffset || _doc$2.scrollLeft || _docElement$1.scrollLeft || _body$2.scrollLeft || 0;
    },
        _svgOwner = function _svgOwner(element) {
      return element.ownerSVGElement || ((element.tagName + "").toLowerCase() === "svg" ? element : null);
    },
        _isFixed$1 = function _isFixed(element) {
      if (_win$2.getComputedStyle(element).position === "fixed") {
        return true;
      }

      element = element.parentNode;

      if (element && element.nodeType === 1) {
        // avoid document fragments which will throw an error.
        return _isFixed(element);
      }
    },
        _createSibling = function _createSibling(element, i) {
      if (element.parentNode && (_doc$2 || _setDoc(element))) {
        var svg = _svgOwner(element),
            ns = svg ? svg.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml",
            type = svg ? i ? "rect" : "g" : "div",
            x = i !== 2 ? 0 : 100,
            y = i === 3 ? 100 : 0,
            css = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;",
            e = _doc$2.createElementNS ? _doc$2.createElementNS(ns.replace(/^https/, "http"), type) : _doc$2.createElement(type);

        if (i) {
          if (!svg) {
            if (!_divContainer) {
              _divContainer = _createSibling(element);
              _divContainer.style.cssText = css;
            }

            e.style.cssText = css + "width:0.1px;height:0.1px;top:" + y + "px;left:" + x + "px";

            _divContainer.appendChild(e);
          } else {
            _svgContainer || (_svgContainer = _createSibling(element));
            e.setAttribute("width", 0.01);
            e.setAttribute("height", 0.01);
            e.setAttribute("transform", "translate(" + x + "," + y + ")");

            _svgContainer.appendChild(e);
          }
        }

        return e;
      }

      throw "Need document and parent.";
    },
        _consolidate = function _consolidate(m) {
      // replaces SVGTransformList.consolidate() because a bug in Firefox causes it to break pointer events. See https://greensock.com/forums/topic/23248-touch-is-not-working-on-draggable-in-firefox-windows-v324/?tab=comments#comment-109800
      var c = new Matrix2D(),
          i = 0;

      for (; i < m.numberOfItems; i++) {
        c.multiply(m.getItem(i).matrix);
      }

      return c;
    },
        _getCTM = function _getCTM(svg) {
      var m = svg.getCTM(),
          transform;

      if (!m) {
        // Firefox returns null for getCTM() on root <svg> elements, so this is a workaround using a <g> that we temporarily append.
        transform = svg.style[_transformProp$2];
        svg.style[_transformProp$2] = "none"; // a bug in Firefox causes css transforms to contaminate the getCTM()

        svg.appendChild(_gEl);
        m = _gEl.getCTM();
        svg.removeChild(_gEl);
        transform ? svg.style[_transformProp$2] = transform : svg.style.removeProperty(_transformProp$2.replace(/([A-Z])/g, "-$1").toLowerCase());
      }

      return m || _identityMatrix$1.clone(); // Firefox will still return null if the <svg> has a width/height of 0 in the browser.
    },
        _placeSiblings = function _placeSiblings(element, adjustGOffset) {
      var svg = _svgOwner(element),
          isRootSVG = element === svg,
          siblings = svg ? _svgTemps : _divTemps,
          parent = element.parentNode,
          container,
          m,
          b,
          x,
          y,
          cs;

      if (element === _win$2) {
        return element;
      }

      siblings.length || siblings.push(_createSibling(element, 1), _createSibling(element, 2), _createSibling(element, 3));
      container = svg ? _svgContainer : _divContainer;

      if (svg) {
        if (isRootSVG) {
          b = _getCTM(element);
          x = -b.e / b.a;
          y = -b.f / b.d;
          m = _identityMatrix$1;
        } else {
          b = element.getBBox();
          m = element.transform ? element.transform.baseVal : {}; // IE11 doesn't follow the spec.

          m = !m.numberOfItems ? _identityMatrix$1 : m.numberOfItems > 1 ? _consolidate(m) : m.getItem(0).matrix; // don't call m.consolidate().matrix because a bug in Firefox makes pointer events not work when consolidate() is called on the same tick as getBoundingClientRect()! See https://greensock.com/forums/topic/23248-touch-is-not-working-on-draggable-in-firefox-windows-v324/?tab=comments#comment-109800

          x = m.a * b.x + m.c * b.y;
          y = m.b * b.x + m.d * b.y;
        }

        if (adjustGOffset && element.tagName.toLowerCase() === "g") {
          x = y = 0;
        }

        (isRootSVG ? svg : parent).appendChild(container);
        container.setAttribute("transform", "matrix(" + m.a + "," + m.b + "," + m.c + "," + m.d + "," + (m.e + x) + "," + (m.f + y) + ")");
      } else {
        x = y = 0;

        if (_hasOffsetBug) {
          // some browsers (like Safari) have a bug that causes them to misreport offset values. When an ancestor element has a transform applied, it's supposed to treat it as if it's position: relative (new context). Safari botches this, so we need to find the closest ancestor (between the element and its offsetParent) that has a transform applied and if one is found, grab its offsetTop/Left and subtract them to compensate.
          m = element.offsetParent;
          b = element;

          while (b && (b = b.parentNode) && b !== m && b.parentNode) {
            if ((_win$2.getComputedStyle(b)[_transformProp$2] + "").length > 4) {
              x = b.offsetLeft;
              y = b.offsetTop;
              b = 0;
            }
          }
        }

        cs = _win$2.getComputedStyle(element);

        if (cs.position !== "absolute" && cs.position !== "fixed") {
          m = element.offsetParent;

          while (parent && parent !== m) {
            // if there's an ancestor element between the element and its offsetParent that's scrolled, we must factor that in.
            x += parent.scrollLeft || 0;
            y += parent.scrollTop || 0;
            parent = parent.parentNode;
          }
        }

        b = container.style;
        b.top = element.offsetTop - y + "px";
        b.left = element.offsetLeft - x + "px";
        b[_transformProp$2] = cs[_transformProp$2];
        b[_transformOriginProp$1] = cs[_transformOriginProp$1]; // b.border = m.border;
        // b.borderLeftStyle = m.borderLeftStyle;
        // b.borderTopStyle = m.borderTopStyle;
        // b.borderLeftWidth = m.borderLeftWidth;
        // b.borderTopWidth = m.borderTopWidth;

        b.position = cs.position === "fixed" ? "fixed" : "absolute";
        element.parentNode.appendChild(container);
      }

      return container;
    },
        _setMatrix = function _setMatrix(m, a, b, c, d, e, f) {
      m.a = a;
      m.b = b;
      m.c = c;
      m.d = d;
      m.e = e;
      m.f = f;
      return m;
    };

    var Matrix2D = /*#__PURE__*/function () {
      function Matrix2D(a, b, c, d, e, f) {
        if (a === void 0) {
          a = 1;
        }

        if (b === void 0) {
          b = 0;
        }

        if (c === void 0) {
          c = 0;
        }

        if (d === void 0) {
          d = 1;
        }

        if (e === void 0) {
          e = 0;
        }

        if (f === void 0) {
          f = 0;
        }

        _setMatrix(this, a, b, c, d, e, f);
      }

      var _proto = Matrix2D.prototype;

      _proto.inverse = function inverse() {
        var a = this.a,
            b = this.b,
            c = this.c,
            d = this.d,
            e = this.e,
            f = this.f,
            determinant = a * d - b * c || 1e-10;
        return _setMatrix(this, d / determinant, -b / determinant, -c / determinant, a / determinant, (c * f - d * e) / determinant, -(a * f - b * e) / determinant);
      };

      _proto.multiply = function multiply(matrix) {
        var a = this.a,
            b = this.b,
            c = this.c,
            d = this.d,
            e = this.e,
            f = this.f,
            a2 = matrix.a,
            b2 = matrix.c,
            c2 = matrix.b,
            d2 = matrix.d,
            e2 = matrix.e,
            f2 = matrix.f;
        return _setMatrix(this, a2 * a + c2 * c, a2 * b + c2 * d, b2 * a + d2 * c, b2 * b + d2 * d, e + e2 * a + f2 * c, f + e2 * b + f2 * d);
      };

      _proto.clone = function clone() {
        return new Matrix2D(this.a, this.b, this.c, this.d, this.e, this.f);
      };

      _proto.equals = function equals(matrix) {
        var a = this.a,
            b = this.b,
            c = this.c,
            d = this.d,
            e = this.e,
            f = this.f;
        return a === matrix.a && b === matrix.b && c === matrix.c && d === matrix.d && e === matrix.e && f === matrix.f;
      };

      _proto.apply = function apply(point, decoratee) {
        if (decoratee === void 0) {
          decoratee = {};
        }

        var x = point.x,
            y = point.y,
            a = this.a,
            b = this.b,
            c = this.c,
            d = this.d,
            e = this.e,
            f = this.f;
        decoratee.x = x * a + y * c + e || 0;
        decoratee.y = x * b + y * d + f || 0;
        return decoratee;
      };

      return Matrix2D;
    }(); // Feed in an element and it'll return a 2D matrix (optionally inverted) so that you can translate between coordinate spaces.
    // Inverting lets you translate a global point into a local coordinate space. No inverting lets you go the other way.
    // We needed this to work around various browser bugs, like Firefox doesn't accurately report getScreenCTM() when there
    // are transforms applied to ancestor elements.
    // The matrix math to convert any x/y coordinate is as follows, which is wrapped in a convenient apply() method of Matrix2D above:
    //     tx = m.a * x + m.c * y + m.e
    //     ty = m.b * x + m.d * y + m.f

    function getGlobalMatrix(element, inverse, adjustGOffset, includeScrollInFixed) {
      // adjustGOffset is typically used only when grabbing an element's PARENT's global matrix, and it ignores the x/y offset of any SVG <g> elements because they behave in a special way.
      if (!element || !element.parentNode || (_doc$2 || _setDoc(element)).documentElement === element) {
        return new Matrix2D();
      }

      var zeroScales = _forceNonZeroScale(element),
          svg = _svgOwner(element),
          temps = svg ? _svgTemps : _divTemps,
          container = _placeSiblings(element, adjustGOffset),
          b1 = temps[0].getBoundingClientRect(),
          b2 = temps[1].getBoundingClientRect(),
          b3 = temps[2].getBoundingClientRect(),
          parent = container.parentNode,
          isFixed = !includeScrollInFixed && _isFixed$1(element),
          m = new Matrix2D((b2.left - b1.left) / 100, (b2.top - b1.top) / 100, (b3.left - b1.left) / 100, (b3.top - b1.top) / 100, b1.left + (isFixed ? 0 : _getDocScrollLeft$1()), b1.top + (isFixed ? 0 : _getDocScrollTop$1()));

      parent.removeChild(container);

      if (zeroScales) {
        b1 = zeroScales.length;

        while (b1--) {
          b2 = zeroScales[b1];
          b2.scaleX = b2.scaleY = 0;
          b2.renderTransform(1, b2);
        }
      }

      return inverse ? m.inverse() : m;
    }
    // 	_doc || _setDoc(element);
    // 	let m = (_win.getComputedStyle(element)[_transformProp] + "").substr(7).match(/[-.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g),
    // 		is2D = m && m.length === 6;
    // 	return !m || m.length < 6 ? new Matrix2D() : new Matrix2D(+m[0], +m[1], +m[is2D ? 2 : 4], +m[is2D ? 3 : 5], +m[is2D ? 4 : 12], +m[is2D ? 5 : 13]);
    // }

    function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

    function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

    var gsap$1,
        _win$1,
        _doc$1,
        _docElement,
        _body$1,
        _tempDiv,
        _placeholderDiv,
        _coreInitted$1,
        _checkPrefix,
        _toArray$1,
        _supportsPassive,
        _isTouchDevice,
        _touchEventLookup,
        _dragCount,
        _isMultiTouching,
        _isAndroid,
        InertiaPlugin,
        _defaultCursor,
        _supportsPointer,
        _windowExists$1 = function _windowExists() {
      return typeof window !== "undefined";
    },
        _getGSAP$1 = function _getGSAP() {
      return gsap$1 || _windowExists$1() && (gsap$1 = window.gsap) && gsap$1.registerPlugin && gsap$1;
    },
        _isFunction$1 = function _isFunction(value) {
      return typeof value === "function";
    },
        _isObject$1 = function _isObject(value) {
      return typeof value === "object";
    },
        _isUndefined = function _isUndefined(value) {
      return typeof value === "undefined";
    },
        _emptyFunc = function _emptyFunc() {
      return false;
    },
        _transformProp$1 = "transform",
        _transformOriginProp = "transformOrigin",
        _round$1 = function _round(value) {
      return Math.round(value * 10000) / 10000;
    },
        _isArray = Array.isArray,
        _createElement = function _createElement(type, ns) {
      var e = _doc$1.createElementNS ? _doc$1.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc$1.createElement(type); //some servers swap in https for http in the namespace which can break things, making "style" inaccessible.

      return e.style ? e : _doc$1.createElement(type); //some environments won't allow access to the element's style when created with a namespace in which case we default to the standard createElement() to work around the issue. Also note that when GSAP is embedded directly inside an SVG file, createElement() won't allow access to the style object in Firefox (see https://greensock.com/forums/topic/20215-problem-using-tweenmax-in-standalone-self-containing-svg-file-err-cannot-set-property-csstext-of-undefined/).
    },
        _RAD2DEG = 180 / Math.PI,
        _bigNum = 1e20,
        _identityMatrix = new Matrix2D(),
        _getTime$1 = Date.now || function () {
      return new Date().getTime();
    },
        _renderQueue = [],
        _lookup = {},
        //when a Draggable is created, the target gets a unique _gsDragID property that allows gets associated with the Draggable instance for quick lookups in Draggable.get(). This avoids circular references that could cause gc problems.
    _lookupCount = 0,
        _clickableTagExp = /^(?:a|input|textarea|button|select)$/i,
        _lastDragTime = 0,
        _temp1 = {},
        // a simple object we reuse and populate (usually x/y properties) to conserve memory and improve performance.
    _windowProxy = {},
        //memory/performance optimization - we reuse this object during autoScroll to store window-related bounds/offsets.
    _copy = function _copy(obj, factor) {
      var copy = {},
          p;

      for (p in obj) {
        copy[p] = factor ? obj[p] * factor : obj[p];
      }

      return copy;
    },
        _extend = function _extend(obj, defaults) {
      for (var p in defaults) {
        if (!(p in obj)) {
          obj[p] = defaults[p];
        }
      }

      return obj;
    },
        _setTouchActionForAllDescendants = function _setTouchActionForAllDescendants(elements, value) {
      var i = elements.length,
          children;

      while (i--) {
        value ? elements[i].style.touchAction = value : elements[i].style.removeProperty("touch-action");
        children = elements[i].children;
        children && children.length && _setTouchActionForAllDescendants(children, value);
      }
    },
        _renderQueueTick = function _renderQueueTick() {
      return _renderQueue.forEach(function (func) {
        return func();
      });
    },
        _addToRenderQueue = function _addToRenderQueue(func) {
      _renderQueue.push(func);

      if (_renderQueue.length === 1) {
        gsap$1.ticker.add(_renderQueueTick);
      }
    },
        _renderQueueTimeout = function _renderQueueTimeout() {
      return !_renderQueue.length && gsap$1.ticker.remove(_renderQueueTick);
    },
        _removeFromRenderQueue = function _removeFromRenderQueue(func) {
      var i = _renderQueue.length;

      while (i--) {
        if (_renderQueue[i] === func) {
          _renderQueue.splice(i, 1);
        }
      }

      gsap$1.to(_renderQueueTimeout, {
        overwrite: true,
        delay: 15,
        duration: 0,
        onComplete: _renderQueueTimeout,
        data: "_draggable"
      }); //remove the "tick" listener only after the render queue is empty for 15 seconds (to improve performance). Adding/removing it constantly for every click/touch wouldn't deliver optimal speed, and we also don't want the ticker to keep calling the render method when things are idle for long periods of time (we want to improve battery life on mobile devices).
    },
        _setDefaults$1 = function _setDefaults(obj, defaults) {
      for (var p in defaults) {
        if (!(p in obj)) {
          obj[p] = defaults[p];
        }
      }

      return obj;
    },
        _addListener$1 = function _addListener(element, type, func, capture) {
      if (element.addEventListener) {
        var touchType = _touchEventLookup[type];
        capture = capture || (_supportsPassive ? {
          passive: false
        } : null);
        element.addEventListener(touchType || type, func, capture);
        touchType && type !== touchType && element.addEventListener(type, func, capture); //some browsers actually support both, so must we. But pointer events cover all.
      }
    },
        _removeListener$1 = function _removeListener(element, type, func) {
      if (element.removeEventListener) {
        var touchType = _touchEventLookup[type];
        element.removeEventListener(touchType || type, func);
        touchType && type !== touchType && element.removeEventListener(type, func);
      }
    },
        _preventDefault = function _preventDefault(event) {
      event.preventDefault && event.preventDefault();
      event.preventManipulation && event.preventManipulation(); //for some Microsoft browsers
    },
        _hasTouchID = function _hasTouchID(list, ID) {
      var i = list.length;

      while (i--) {
        if (list[i].identifier === ID) {
          return true;
        }
      }
    },
        _onMultiTouchDocumentEnd = function _onMultiTouchDocumentEnd(event) {
      _isMultiTouching = event.touches && _dragCount < event.touches.length;

      _removeListener$1(event.target, "touchend", _onMultiTouchDocumentEnd);
    },
        _onMultiTouchDocument = function _onMultiTouchDocument(event) {
      _isMultiTouching = event.touches && _dragCount < event.touches.length;

      _addListener$1(event.target, "touchend", _onMultiTouchDocumentEnd);
    },
        _getDocScrollTop = function _getDocScrollTop(doc) {
      return _win$1.pageYOffset || doc.scrollTop || doc.documentElement.scrollTop || doc.body.scrollTop || 0;
    },
        _getDocScrollLeft = function _getDocScrollLeft(doc) {
      return _win$1.pageXOffset || doc.scrollLeft || doc.documentElement.scrollLeft || doc.body.scrollLeft || 0;
    },
        _addScrollListener = function _addScrollListener(e, callback) {
      _addListener$1(e, "scroll", callback);

      if (!_isRoot(e.parentNode)) {
        _addScrollListener(e.parentNode, callback);
      }
    },
        _removeScrollListener = function _removeScrollListener(e, callback) {
      _removeListener$1(e, "scroll", callback);

      if (!_isRoot(e.parentNode)) {
        _removeScrollListener(e.parentNode, callback);
      }
    },
        _isRoot = function _isRoot(e) {
      return !!(!e || e === _docElement || e.nodeType === 9 || e === _doc$1.body || e === _win$1 || !e.nodeType || !e.parentNode);
    },
        _getMaxScroll = function _getMaxScroll(element, axis) {
      var dim = axis === "x" ? "Width" : "Height",
          scroll = "scroll" + dim,
          client = "client" + dim;
      return Math.max(0, _isRoot(element) ? Math.max(_docElement[scroll], _body$1[scroll]) - (_win$1["inner" + dim] || _docElement[client] || _body$1[client]) : element[scroll] - element[client]);
    },
        _recordMaxScrolls = function _recordMaxScrolls(e, skipCurrent) {
      //records _gsMaxScrollX and _gsMaxScrollY properties for the element and all ancestors up the chain so that we can cap it, otherwise dragging beyond the edges with autoScroll on can endlessly scroll.
      var x = _getMaxScroll(e, "x"),
          y = _getMaxScroll(e, "y");

      if (_isRoot(e)) {
        e = _windowProxy;
      } else {
        _recordMaxScrolls(e.parentNode, skipCurrent);
      }

      e._gsMaxScrollX = x;
      e._gsMaxScrollY = y;

      if (!skipCurrent) {
        e._gsScrollX = e.scrollLeft || 0;
        e._gsScrollY = e.scrollTop || 0;
      }
    },
        _setStyle = function _setStyle(element, property, value) {
      var style = element.style;

      if (!style) {
        return;
      }

      if (_isUndefined(style[property])) {
        property = _checkPrefix(property, element) || property;
      }

      if (value == null) {
        style.removeProperty && style.removeProperty(property.replace(/([A-Z])/g, "-$1").toLowerCase());
      } else {
        style[property] = value;
      }
    },
        _getComputedStyle$1 = function _getComputedStyle(element) {
      return _win$1.getComputedStyle(element instanceof Element ? element : element.host || (element.parentNode || {}).host || element);
    },
        //the "host" stuff helps to accommodate ShadowDom objects.
    _tempRect = {},
        //reuse to reduce garbage collection tasks
    _parseRect = function _parseRect(e) {
      //accepts a DOM element, a mouse event, or a rectangle object and returns the corresponding rectangle with left, right, width, height, top, and bottom properties
      if (e === _win$1) {
        _tempRect.left = _tempRect.top = 0;
        _tempRect.width = _tempRect.right = _docElement.clientWidth || e.innerWidth || _body$1.clientWidth || 0;
        _tempRect.height = _tempRect.bottom = (e.innerHeight || 0) - 20 < _docElement.clientHeight ? _docElement.clientHeight : e.innerHeight || _body$1.clientHeight || 0;
        return _tempRect;
      }

      var doc = e.ownerDocument || _doc$1,
          r = !_isUndefined(e.pageX) ? {
        left: e.pageX - _getDocScrollLeft(doc),
        top: e.pageY - _getDocScrollTop(doc),
        right: e.pageX - _getDocScrollLeft(doc) + 1,
        bottom: e.pageY - _getDocScrollTop(doc) + 1
      } : !e.nodeType && !_isUndefined(e.left) && !_isUndefined(e.top) ? e : _toArray$1(e)[0].getBoundingClientRect();

      if (_isUndefined(r.right) && !_isUndefined(r.width)) {
        r.right = r.left + r.width;
        r.bottom = r.top + r.height;
      } else if (_isUndefined(r.width)) {
        //some browsers don't include width and height properties. We can't just set them directly on r because some browsers throw errors, so create a new generic object.
        r = {
          width: r.right - r.left,
          height: r.bottom - r.top,
          right: r.right,
          left: r.left,
          bottom: r.bottom,
          top: r.top
        };
      }

      return r;
    },
        _dispatchEvent = function _dispatchEvent(target, type, callbackName) {
      var vars = target.vars,
          callback = vars[callbackName],
          listeners = target._listeners[type],
          result;

      if (_isFunction$1(callback)) {
        result = callback.apply(vars.callbackScope || target, vars[callbackName + "Params"] || [target.pointerEvent]);
      }

      if (listeners && target.dispatchEvent(type) === false) {
        result = false;
      }

      return result;
    },
        _getBounds$1 = function _getBounds(target, context) {
      //accepts any of the following: a DOM element, jQuery object, selector text, or an object defining bounds as {top, left, width, height} or {minX, maxX, minY, maxY}. Returns an object with left, top, width, and height properties.
      var e = _toArray$1(target)[0],
          top,
          left,
          offset;

      if (!e.nodeType && e !== _win$1) {
        if (!_isUndefined(target.left)) {
          offset = {
            x: 0,
            y: 0
          }; //_getOffsetTransformOrigin(context); //the bounds should be relative to the origin

          return {
            left: target.left - offset.x,
            top: target.top - offset.y,
            width: target.width,
            height: target.height
          };
        }

        left = target.min || target.minX || target.minRotation || 0;
        top = target.min || target.minY || 0;
        return {
          left: left,
          top: top,
          width: (target.max || target.maxX || target.maxRotation || 0) - left,
          height: (target.max || target.maxY || 0) - top
        };
      }

      return _getElementBounds(e, context);
    },
        _point1 = {},
        //we reuse to minimize garbage collection tasks.
    _getElementBounds = function _getElementBounds(element, context) {
      context = _toArray$1(context)[0];
      var isSVG = element.getBBox && element.ownerSVGElement,
          doc = element.ownerDocument || _doc$1,
          left,
          right,
          top,
          bottom,
          matrix,
          p1,
          p2,
          p3,
          p4,
          bbox,
          width,
          height,
          cs,
          contextParent;

      if (element === _win$1) {
        top = _getDocScrollTop(doc);
        left = _getDocScrollLeft(doc);
        right = left + (doc.documentElement.clientWidth || element.innerWidth || doc.body.clientWidth || 0);
        bottom = top + ((element.innerHeight || 0) - 20 < doc.documentElement.clientHeight ? doc.documentElement.clientHeight : element.innerHeight || doc.body.clientHeight || 0); //some browsers (like Firefox) ignore absolutely positioned elements, and collapse the height of the documentElement, so it could be 8px, for example, if you have just an absolutely positioned div. In that case, we use the innerHeight to resolve this.
      } else if (context === _win$1 || _isUndefined(context)) {
        return element.getBoundingClientRect();
      } else {
        left = top = 0;

        if (isSVG) {
          bbox = element.getBBox();
          width = bbox.width;
          height = bbox.height;
        } else {
          if (element.viewBox && (bbox = element.viewBox.baseVal)) {
            left = bbox.x || 0;
            top = bbox.y || 0;
            width = bbox.width;
            height = bbox.height;
          }

          if (!width) {
            cs = _getComputedStyle$1(element);
            bbox = cs.boxSizing === "border-box";
            width = (parseFloat(cs.width) || element.clientWidth || 0) + (bbox ? 0 : parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth));
            height = (parseFloat(cs.height) || element.clientHeight || 0) + (bbox ? 0 : parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth));
          }
        }

        right = width;
        bottom = height;
      }

      if (element === context) {
        return {
          left: left,
          top: top,
          width: right - left,
          height: bottom - top
        };
      }

      matrix = getGlobalMatrix(context, true).multiply(getGlobalMatrix(element));
      p1 = matrix.apply({
        x: left,
        y: top
      });
      p2 = matrix.apply({
        x: right,
        y: top
      });
      p3 = matrix.apply({
        x: right,
        y: bottom
      });
      p4 = matrix.apply({
        x: left,
        y: bottom
      });
      left = Math.min(p1.x, p2.x, p3.x, p4.x);
      top = Math.min(p1.y, p2.y, p3.y, p4.y);
      contextParent = context.parentNode || {};
      return {
        left: left + (contextParent.scrollLeft || 0),
        top: top + (contextParent.scrollTop || 0),
        width: Math.max(p1.x, p2.x, p3.x, p4.x) - left,
        height: Math.max(p1.y, p2.y, p3.y, p4.y) - top
      };
    },
        _parseInertia = function _parseInertia(draggable, snap, max, min, factor, forceZeroVelocity) {
      var vars = {},
          a,
          i,
          l;

      if (snap) {
        if (factor !== 1 && snap instanceof Array) {
          //some data must be altered to make sense, like if the user passes in an array of rotational values in degrees, we must convert it to radians. Or for scrollLeft and scrollTop, we invert the values.
          vars.end = a = [];
          l = snap.length;

          if (_isObject$1(snap[0])) {
            //if the array is populated with objects, like points ({x:100, y:200}), make copies before multiplying by the factor, otherwise we'll mess up the originals and the user may reuse it elsewhere.
            for (i = 0; i < l; i++) {
              a[i] = _copy(snap[i], factor);
            }
          } else {
            for (i = 0; i < l; i++) {
              a[i] = snap[i] * factor;
            }
          }

          max += 1.1; //allow 1.1 pixels of wiggle room when snapping in order to work around some browser inconsistencies in the way bounds are reported which can make them roughly a pixel off. For example, if "snap:[-$('#menu').width(), 0]" was defined and #menu had a wrapper that was used as the bounds, some browsers would be one pixel off, making the minimum -752 for example when snap was [-753,0], thus instead of snapping to -753, it would snap to 0 since -753 was below the minimum.

          min -= 1.1;
        } else if (_isFunction$1(snap)) {
          vars.end = function (value) {
            var result = snap.call(draggable, value),
                copy,
                p;

            if (factor !== 1) {
              if (_isObject$1(result)) {
                copy = {};

                for (p in result) {
                  copy[p] = result[p] * factor;
                }

                result = copy;
              } else {
                result *= factor;
              }
            }

            return result; //we need to ensure that we can scope the function call to the Draggable instance itself so that users can access important values like maxX, minX, maxY, minY, x, and y from within that function.
          };
        } else {
          vars.end = snap;
        }
      }

      if (max || max === 0) {
        vars.max = max;
      }

      if (min || min === 0) {
        vars.min = min;
      }

      if (forceZeroVelocity) {
        vars.velocity = 0;
      }

      return vars;
    },
        _isClickable = function _isClickable(element) {
      //sometimes it's convenient to mark an element as clickable by adding a data-clickable="true" attribute (in which case we won't preventDefault() the mouse/touch event). This method checks if the element is an <a>, <input>, or <button> or has an onclick or has the data-clickable or contentEditable attribute set to true (or any of its parent elements).
      var data;
      return !element || !element.getAttribute || element === _body$1 ? false : (data = element.getAttribute("data-clickable")) === "true" || data !== "false" && (element.onclick || _clickableTagExp.test(element.nodeName + "") || element.getAttribute("contentEditable") === "true") ? true : _isClickable(element.parentNode);
    },
        _setSelectable = function _setSelectable(elements, selectable) {
      var i = elements.length,
          e;

      while (i--) {
        e = elements[i];
        e.ondragstart = e.onselectstart = selectable ? null : _emptyFunc;
        gsap$1.set(e, {
          lazy: true,
          userSelect: selectable ? "text" : "none"
        });
      }
    },
        _isFixed = function _isFixed(element) {
      if (_getComputedStyle$1(element).position === "fixed") {
        return true;
      }

      element = element.parentNode;

      if (element && element.nodeType === 1) {
        // avoid document fragments which will throw an error.
        return _isFixed(element);
      }
    },
        _supports3D,
        _addPaddingBR,
        //The ScrollProxy class wraps an element's contents into another div (we call it "content") that we either add padding when necessary or apply a translate3d() transform in order to overscroll (scroll past the boundaries). This allows us to simply set the scrollTop/scrollLeft (or top/left for easier reverse-axis orientation, which is what we do in Draggable) and it'll do all the work for us. For example, if we tried setting scrollTop to -100 on a normal DOM element, it wouldn't work - it'd look the same as setting it to 0, but if we set scrollTop of a ScrollProxy to -100, it'll give the correct appearance by either setting paddingTop of the wrapper to 100 or applying a 100-pixel translateY.
    ScrollProxy = function ScrollProxy(element, vars) {
      element = gsap$1.utils.toArray(element)[0];
      vars = vars || {};
      var content = document.createElement("div"),
          style = content.style,
          node = element.firstChild,
          offsetTop = 0,
          offsetLeft = 0,
          prevTop = element.scrollTop,
          prevLeft = element.scrollLeft,
          scrollWidth = element.scrollWidth,
          scrollHeight = element.scrollHeight,
          extraPadRight = 0,
          maxLeft = 0,
          maxTop = 0,
          elementWidth,
          elementHeight,
          contentHeight,
          nextNode,
          transformStart,
          transformEnd;

      if (_supports3D && vars.force3D !== false) {
        transformStart = "translate3d(";
        transformEnd = "px,0px)";
      } else if (_transformProp$1) {
        transformStart = "translate(";
        transformEnd = "px)";
      }

      this.scrollTop = function (value, force) {
        if (!arguments.length) {
          return -this.top();
        }

        this.top(-value, force);
      };

      this.scrollLeft = function (value, force) {
        if (!arguments.length) {
          return -this.left();
        }

        this.left(-value, force);
      };

      this.left = function (value, force) {
        if (!arguments.length) {
          return -(element.scrollLeft + offsetLeft);
        }

        var dif = element.scrollLeft - prevLeft,
            oldOffset = offsetLeft;

        if ((dif > 2 || dif < -2) && !force) {
          //if the user interacts with the scrollbar (or something else scrolls it, like the mouse wheel), we should kill any tweens of the ScrollProxy.
          prevLeft = element.scrollLeft;
          gsap$1.killTweensOf(this, {
            left: 1,
            scrollLeft: 1
          });
          this.left(-prevLeft);

          if (vars.onKill) {
            vars.onKill();
          }

          return;
        }

        value = -value; //invert because scrolling works in the opposite direction

        if (value < 0) {
          offsetLeft = value - 0.5 | 0;
          value = 0;
        } else if (value > maxLeft) {
          offsetLeft = value - maxLeft | 0;
          value = maxLeft;
        } else {
          offsetLeft = 0;
        }

        if (offsetLeft || oldOffset) {
          if (!this._skip) {
            style[_transformProp$1] = transformStart + -offsetLeft + "px," + -offsetTop + transformEnd;
          }

          if (offsetLeft + extraPadRight >= 0) {
            style.paddingRight = offsetLeft + extraPadRight + "px";
          }
        }

        element.scrollLeft = value | 0;
        prevLeft = element.scrollLeft; //don't merge this with the line above because some browsers adjust the scrollLeft after it's set, so in order to be 100% accurate in tracking it, we need to ask the browser to report it.
      };

      this.top = function (value, force) {
        if (!arguments.length) {
          return -(element.scrollTop + offsetTop);
        }

        var dif = element.scrollTop - prevTop,
            oldOffset = offsetTop;

        if ((dif > 2 || dif < -2) && !force) {
          //if the user interacts with the scrollbar (or something else scrolls it, like the mouse wheel), we should kill any tweens of the ScrollProxy.
          prevTop = element.scrollTop;
          gsap$1.killTweensOf(this, {
            top: 1,
            scrollTop: 1
          });
          this.top(-prevTop);

          if (vars.onKill) {
            vars.onKill();
          }

          return;
        }

        value = -value; //invert because scrolling works in the opposite direction

        if (value < 0) {
          offsetTop = value - 0.5 | 0;
          value = 0;
        } else if (value > maxTop) {
          offsetTop = value - maxTop | 0;
          value = maxTop;
        } else {
          offsetTop = 0;
        }

        if (offsetTop || oldOffset) {
          if (!this._skip) {
            style[_transformProp$1] = transformStart + -offsetLeft + "px," + -offsetTop + transformEnd;
          }
        }

        element.scrollTop = value | 0;
        prevTop = element.scrollTop;
      };

      this.maxScrollTop = function () {
        return maxTop;
      };

      this.maxScrollLeft = function () {
        return maxLeft;
      };

      this.disable = function () {
        node = content.firstChild;

        while (node) {
          nextNode = node.nextSibling;
          element.appendChild(node);
          node = nextNode;
        }

        if (element === content.parentNode) {
          //in case disable() is called when it's already disabled.
          element.removeChild(content);
        }
      };

      this.enable = function () {
        node = element.firstChild;

        if (node === content) {
          return;
        }

        while (node) {
          nextNode = node.nextSibling;
          content.appendChild(node);
          node = nextNode;
        }

        element.appendChild(content);
        this.calibrate();
      };

      this.calibrate = function (force) {
        var widthMatches = element.clientWidth === elementWidth,
            cs,
            x,
            y;
        prevTop = element.scrollTop;
        prevLeft = element.scrollLeft;

        if (widthMatches && element.clientHeight === elementHeight && content.offsetHeight === contentHeight && scrollWidth === element.scrollWidth && scrollHeight === element.scrollHeight && !force) {
          return; //no need to recalculate things if the width and height haven't changed.
        }

        if (offsetTop || offsetLeft) {
          x = this.left();
          y = this.top();
          this.left(-element.scrollLeft);
          this.top(-element.scrollTop);
        }

        cs = _getComputedStyle$1(element); //first, we need to remove any width constraints to see how the content naturally flows so that we can see if it's wider than the containing element. If so, we've got to record the amount of overage so that we can apply that as padding in order for browsers to correctly handle things. Then we switch back to a width of 100% (without that, some browsers don't flow the content correctly)

        if (!widthMatches || force) {
          style.display = "block";
          style.width = "auto";
          style.paddingRight = "0px";
          extraPadRight = Math.max(0, element.scrollWidth - element.clientWidth); //if the content is wider than the container, we need to add the paddingLeft and paddingRight in order for things to behave correctly.

          if (extraPadRight) {
            extraPadRight += parseFloat(cs.paddingLeft) + (_addPaddingBR ? parseFloat(cs.paddingRight) : 0);
          }
        }

        style.display = "inline-block";
        style.position = "relative";
        style.overflow = "visible";
        style.verticalAlign = "top";
        style.boxSizing = "content-box";
        style.width = "100%";
        style.paddingRight = extraPadRight + "px"; //some browsers neglect to factor in the bottom padding when calculating the scrollHeight, so we need to add that padding to the content when that happens. Allow a 2px margin for error

        if (_addPaddingBR) {
          style.paddingBottom = cs.paddingBottom;
        }

        elementWidth = element.clientWidth;
        elementHeight = element.clientHeight;
        scrollWidth = element.scrollWidth;
        scrollHeight = element.scrollHeight;
        maxLeft = element.scrollWidth - elementWidth;
        maxTop = element.scrollHeight - elementHeight;
        contentHeight = content.offsetHeight;
        style.display = "block";

        if (x || y) {
          this.left(x);
          this.top(y);
        }
      };

      this.content = content;
      this.element = element;
      this._skip = false;
      this.enable();
    },
        _initCore = function _initCore(required) {
      if (_windowExists$1() && document.body) {
        var nav = window && window.navigator;
        _win$1 = window;
        _doc$1 = document;
        _docElement = _doc$1.documentElement;
        _body$1 = _doc$1.body;
        _tempDiv = _createElement("div");
        _supportsPointer = !!window.PointerEvent;
        _placeholderDiv = _createElement("div");
        _placeholderDiv.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab";
        _defaultCursor = _placeholderDiv.style.cursor === "grab" ? "grab" : "move";
        _isAndroid = nav && nav.userAgent.toLowerCase().indexOf("android") !== -1; //Android handles touch events in an odd way and it's virtually impossible to "feature test" so we resort to UA sniffing

        _isTouchDevice = "ontouchstart" in _docElement && "orientation" in _win$1 || nav && (nav.MaxTouchPoints > 0 || nav.msMaxTouchPoints > 0);

        _addPaddingBR = function () {
          //this function is in charge of analyzing browser behavior related to padding. It sets the _addPaddingBR to true if the browser doesn't normally factor in the bottom or right padding on the element inside the scrolling area, and it sets _addPaddingLeft to true if it's a browser that requires the extra offset (offsetLeft) to be added to the paddingRight (like Opera).
          var div = _createElement("div"),
              child = _createElement("div"),
              childStyle = child.style,
              parent = _body$1,
              val;

          childStyle.display = "inline-block";
          childStyle.position = "relative";
          div.style.cssText = child.innerHTML = "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden";
          div.appendChild(child);
          parent.appendChild(div);
          val = child.offsetHeight + 18 > div.scrollHeight; //div.scrollHeight should be child.offsetHeight + 20 because of the 10px of padding on each side, but some browsers ignore one side. We allow a 2px margin of error.

          parent.removeChild(div);
          return val;
        }();

        _touchEventLookup = function (types) {
          //we create an object that makes it easy to translate touch event types into their "pointer" counterparts if we're in a browser that uses those instead. Like IE10 uses "MSPointerDown" instead of "touchstart", for example.
          var standard = types.split(","),
              converted = ("onpointerdown" in _tempDiv ? "pointerdown,pointermove,pointerup,pointercancel" : "onmspointerdown" in _tempDiv ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : types).split(","),
              obj = {},
              i = 4;

          while (--i > -1) {
            obj[standard[i]] = converted[i];
            obj[converted[i]] = standard[i];
          } //to avoid problems in iOS 9, test to see if the browser supports the "passive" option on addEventListener().


          try {
            _docElement.addEventListener("test", null, Object.defineProperty({}, "passive", {
              get: function get() {
                _supportsPassive = 1;
              }
            }));
          } catch (e) {}

          return obj;
        }("touchstart,touchmove,touchend,touchcancel");

        _addListener$1(_doc$1, "touchcancel", _emptyFunc); //some older Android devices intermittently stop dispatching "touchmove" events if we don't listen for "touchcancel" on the document. Very strange indeed.


        _addListener$1(_win$1, "touchmove", _emptyFunc); //works around Safari bugs that still allow the page to scroll even when we preventDefault() on the touchmove event.


        _body$1 && _body$1.addEventListener("touchstart", _emptyFunc); //works around Safari bug: https://greensock.com/forums/topic/21450-draggable-in-iframe-on-mobile-is-buggy/

        _addListener$1(_doc$1, "contextmenu", function () {
          for (var p in _lookup) {
            if (_lookup[p].isPressed) {
              _lookup[p].endDrag();
            }
          }
        });

        gsap$1 = _coreInitted$1 = _getGSAP$1();
      }

      if (gsap$1) {
        InertiaPlugin = gsap$1.plugins.inertia;
        _checkPrefix = gsap$1.utils.checkPrefix;
        _transformProp$1 = _checkPrefix(_transformProp$1);
        _transformOriginProp = _checkPrefix(_transformOriginProp);
        _toArray$1 = gsap$1.utils.toArray;
        _supports3D = !!_checkPrefix("perspective");
      } else if (required) {
        console.warn("Please gsap.registerPlugin(Draggable)");
      }
    };

    var EventDispatcher = /*#__PURE__*/function () {
      function EventDispatcher(target) {
        this._listeners = {};
        this.target = target || this;
      }

      var _proto = EventDispatcher.prototype;

      _proto.addEventListener = function addEventListener(type, callback) {
        var list = this._listeners[type] || (this._listeners[type] = []);

        if (!~list.indexOf(callback)) {
          list.push(callback);
        }
      };

      _proto.removeEventListener = function removeEventListener(type, callback) {
        var list = this._listeners[type],
            i = list && list.indexOf(callback) || -1;
        i > -1 && list.splice(i, 1);
      };

      _proto.dispatchEvent = function dispatchEvent(type) {
        var _this = this;

        var result;
        (this._listeners[type] || []).forEach(function (callback) {
          return callback.call(_this, {
            type: type,
            target: _this.target
          }) === false && (result = false);
        });
        return result; //if any of the callbacks return false, pass that along.
      };

      return EventDispatcher;
    }();

    var Draggable = /*#__PURE__*/function (_EventDispatcher) {
      _inheritsLoose(Draggable, _EventDispatcher);

      function Draggable(target, vars) {
        var _this2;

        _this2 = _EventDispatcher.call(this) || this;
        _coreInitted$1 || _initCore(1);
        target = _toArray$1(target)[0]; //in case the target is a selector object or selector text

        if (!InertiaPlugin) {
          InertiaPlugin = gsap$1.plugins.inertia;
        }

        _this2.vars = vars = _copy(vars || {});
        _this2.target = target;
        _this2.x = _this2.y = _this2.rotation = 0;
        _this2.dragResistance = parseFloat(vars.dragResistance) || 0;
        _this2.edgeResistance = isNaN(vars.edgeResistance) ? 1 : parseFloat(vars.edgeResistance) || 0;
        _this2.lockAxis = vars.lockAxis;
        _this2.autoScroll = vars.autoScroll || 0;
        _this2.lockedAxis = null;
        _this2.allowEventDefault = !!vars.allowEventDefault;
        gsap$1.getProperty(target, "x"); // to ensure that transforms are instantiated.

        var type = (vars.type || "x,y").toLowerCase(),
            xyMode = ~type.indexOf("x") || ~type.indexOf("y"),
            rotationMode = type.indexOf("rotation") !== -1,
            xProp = rotationMode ? "rotation" : xyMode ? "x" : "left",
            yProp = xyMode ? "y" : "top",
            allowX = !!(~type.indexOf("x") || ~type.indexOf("left") || type === "scroll"),
            allowY = !!(~type.indexOf("y") || ~type.indexOf("top") || type === "scroll"),
            minimumMovement = vars.minimumMovement || 2,
            self = _assertThisInitialized(_this2),
            triggers = _toArray$1(vars.trigger || vars.handle || target),
            killProps = {},
            dragEndTime = 0,
            checkAutoScrollBounds = false,
            autoScrollMarginTop = vars.autoScrollMarginTop || 40,
            autoScrollMarginRight = vars.autoScrollMarginRight || 40,
            autoScrollMarginBottom = vars.autoScrollMarginBottom || 40,
            autoScrollMarginLeft = vars.autoScrollMarginLeft || 40,
            isClickable = vars.clickableTest || _isClickable,
            clickTime = 0,
            gsCache = target._gsap || gsap$1.core.getCache(target),
            isFixed = _isFixed(target),
            getPropAsNum = function getPropAsNum(property, unit) {
          return parseFloat(gsCache.get(target, property, unit));
        },
            ownerDoc = target.ownerDocument || _doc$1,
            enabled,
            scrollProxy,
            startPointerX,
            startPointerY,
            startElementX,
            startElementY,
            hasBounds,
            hasDragCallback,
            hasMoveCallback,
            maxX,
            minX,
            maxY,
            minY,
            touch,
            touchID,
            rotationOrigin,
            dirty,
            old,
            snapX,
            snapY,
            snapXY,
            isClicking,
            touchEventTarget,
            matrix,
            interrupted,
            allowNativeTouchScrolling,
            touchDragAxis,
            isDispatching,
            clickDispatch,
            trustedClickDispatch,
            isPreventingDefault,
            innerMatrix,
            onContextMenu = function onContextMenu(e) {
          //used to prevent long-touch from triggering a context menu.
          // (self.isPressed && e.which < 2) && self.endDrag() // previously ended drag when context menu was triggered, but instead we should just stop propagation and prevent the default event behavior.
          _preventDefault(e);

          e.stopImmediatePropagation && e.stopImmediatePropagation();
          return false;
        },
            //this method gets called on every tick of TweenLite.ticker which allows us to synchronize the renders to the core engine (which is typically synchronized with the display refresh via requestAnimationFrame). This is an optimization - it's better than applying the values inside the "mousemove" or "touchmove" event handler which may get called many times inbetween refreshes.
        render = function render(suppressEvents) {
          if (self.autoScroll && self.isDragging && (checkAutoScrollBounds || dirty)) {
            var e = target,
                autoScrollFactor = self.autoScroll * 15,
                //multiplying by 15 just gives us a better "feel" speed-wise.
            parent,
                isRoot,
                rect,
                pointerX,
                pointerY,
                changeX,
                changeY,
                gap;
            checkAutoScrollBounds = false;
            _windowProxy.scrollTop = _win$1.pageYOffset != null ? _win$1.pageYOffset : ownerDoc.documentElement.scrollTop != null ? ownerDoc.documentElement.scrollTop : ownerDoc.body.scrollTop;
            _windowProxy.scrollLeft = _win$1.pageXOffset != null ? _win$1.pageXOffset : ownerDoc.documentElement.scrollLeft != null ? ownerDoc.documentElement.scrollLeft : ownerDoc.body.scrollLeft;
            pointerX = self.pointerX - _windowProxy.scrollLeft;
            pointerY = self.pointerY - _windowProxy.scrollTop;

            while (e && !isRoot) {
              //walk up the chain and sense wherever the pointer is within 40px of an edge that's scrollable.
              isRoot = _isRoot(e.parentNode);
              parent = isRoot ? _windowProxy : e.parentNode;
              rect = isRoot ? {
                bottom: Math.max(_docElement.clientHeight, _win$1.innerHeight || 0),
                right: Math.max(_docElement.clientWidth, _win$1.innerWidth || 0),
                left: 0,
                top: 0
              } : parent.getBoundingClientRect();
              changeX = changeY = 0;

              if (allowY) {
                gap = parent._gsMaxScrollY - parent.scrollTop;

                if (gap < 0) {
                  changeY = gap;
                } else if (pointerY > rect.bottom - autoScrollMarginBottom && gap) {
                  checkAutoScrollBounds = true;
                  changeY = Math.min(gap, autoScrollFactor * (1 - Math.max(0, rect.bottom - pointerY) / autoScrollMarginBottom) | 0);
                } else if (pointerY < rect.top + autoScrollMarginTop && parent.scrollTop) {
                  checkAutoScrollBounds = true;
                  changeY = -Math.min(parent.scrollTop, autoScrollFactor * (1 - Math.max(0, pointerY - rect.top) / autoScrollMarginTop) | 0);
                }

                if (changeY) {
                  parent.scrollTop += changeY;
                }
              }

              if (allowX) {
                gap = parent._gsMaxScrollX - parent.scrollLeft;

                if (gap < 0) {
                  changeX = gap;
                } else if (pointerX > rect.right - autoScrollMarginRight && gap) {
                  checkAutoScrollBounds = true;
                  changeX = Math.min(gap, autoScrollFactor * (1 - Math.max(0, rect.right - pointerX) / autoScrollMarginRight) | 0);
                } else if (pointerX < rect.left + autoScrollMarginLeft && parent.scrollLeft) {
                  checkAutoScrollBounds = true;
                  changeX = -Math.min(parent.scrollLeft, autoScrollFactor * (1 - Math.max(0, pointerX - rect.left) / autoScrollMarginLeft) | 0);
                }

                if (changeX) {
                  parent.scrollLeft += changeX;
                }
              }

              if (isRoot && (changeX || changeY)) {
                _win$1.scrollTo(parent.scrollLeft, parent.scrollTop);

                setPointerPosition(self.pointerX + changeX, self.pointerY + changeY);
              }

              e = parent;
            }
          }

          if (dirty) {
            var x = self.x,
                y = self.y;

            if (rotationMode) {
              self.deltaX = x - parseFloat(gsCache.rotation);
              self.rotation = x;
              gsCache.rotation = x + "deg";
              gsCache.renderTransform(1, gsCache);
            } else {
              if (scrollProxy) {
                if (allowY) {
                  self.deltaY = y - scrollProxy.top();
                  scrollProxy.top(y);
                }

                if (allowX) {
                  self.deltaX = x - scrollProxy.left();
                  scrollProxy.left(x);
                }
              } else if (xyMode) {
                if (allowY) {
                  self.deltaY = y - parseFloat(gsCache.y);
                  gsCache.y = y + "px";
                }

                if (allowX) {
                  self.deltaX = x - parseFloat(gsCache.x);
                  gsCache.x = x + "px";
                }

                gsCache.renderTransform(1, gsCache);
              } else {
                if (allowY) {
                  self.deltaY = y - parseFloat(target.style.top || 0);
                  target.style.top = y + "px";
                }

                if (allowX) {
                  self.deltaX = x - parseFloat(target.style.left || 0);
                  target.style.left = x + "px";
                }
              }
            }

            if (hasDragCallback && !suppressEvents && !isDispatching) {
              isDispatching = true; //in case onDrag has an update() call (avoid endless loop)

              if (_dispatchEvent(self, "drag", "onDrag") === false) {
                if (allowX) {
                  self.x -= self.deltaX;
                }

                if (allowY) {
                  self.y -= self.deltaY;
                }

                render(true);
              }

              isDispatching = false;
            }
          }

          dirty = false;
        },
            //copies the x/y from the element (whether that be transforms, top/left, or ScrollProxy's top/left) to the Draggable's x and y (and rotation if necessary) properties so that they reflect reality and it also (optionally) applies any snapping necessary. This is used by the InertiaPlugin tween in an onUpdate to ensure things are synced and snapped.
        syncXY = function syncXY(skipOnUpdate, skipSnap) {
          var x = self.x,
              y = self.y,
              snappedValue,
              cs;

          if (!target._gsap) {
            //just in case the _gsap cache got wiped, like if the user called clearProps on the transform or something (very rare).
            gsCache = gsap$1.core.getCache(target);
          }

          gsCache.uncache && gsap$1.getProperty(target, "x"); // trigger a re-cache

          if (xyMode) {
            self.x = parseFloat(gsCache.x);
            self.y = parseFloat(gsCache.y);
          } else if (rotationMode) {
            self.x = self.rotation = parseFloat(gsCache.rotation);
          } else if (scrollProxy) {
            self.y = scrollProxy.top();
            self.x = scrollProxy.left();
          } else {
            self.y = parseFloat(target.style.top || (cs = _getComputedStyle$1(target)) && cs.top) || 0;
            self.x = parseFloat(target.style.left || (cs || {}).left) || 0;
          }

          if ((snapX || snapY || snapXY) && !skipSnap && (self.isDragging || self.isThrowing)) {
            if (snapXY) {
              _temp1.x = self.x;
              _temp1.y = self.y;
              snappedValue = snapXY(_temp1);

              if (snappedValue.x !== self.x) {
                self.x = snappedValue.x;
                dirty = true;
              }

              if (snappedValue.y !== self.y) {
                self.y = snappedValue.y;
                dirty = true;
              }
            }

            if (snapX) {
              snappedValue = snapX(self.x);

              if (snappedValue !== self.x) {
                self.x = snappedValue;

                if (rotationMode) {
                  self.rotation = snappedValue;
                }

                dirty = true;
              }
            }

            if (snapY) {
              snappedValue = snapY(self.y);

              if (snappedValue !== self.y) {
                self.y = snappedValue;
              }

              dirty = true;
            }
          }

          dirty && render(true);

          if (!skipOnUpdate) {
            self.deltaX = self.x - x;
            self.deltaY = self.y - y;

            _dispatchEvent(self, "throwupdate", "onThrowUpdate");
          }
        },
            buildSnapFunc = function buildSnapFunc(snap, min, max, factor) {
          if (min == null) {
            min = -_bigNum;
          }

          if (max == null) {
            max = _bigNum;
          }

          if (_isFunction$1(snap)) {
            return function (n) {
              var edgeTolerance = !self.isPressed ? 1 : 1 - self.edgeResistance; //if we're tweening, disable the edgeTolerance because it's already factored into the tweening values (we don't want to apply it multiple times)

              return snap.call(self, n > max ? max + (n - max) * edgeTolerance : n < min ? min + (n - min) * edgeTolerance : n) * factor;
            };
          }

          if (_isArray(snap)) {
            return function (n) {
              var i = snap.length,
                  closest = 0,
                  absDif = _bigNum,
                  val,
                  dif;

              while (--i > -1) {
                val = snap[i];
                dif = val - n;

                if (dif < 0) {
                  dif = -dif;
                }

                if (dif < absDif && val >= min && val <= max) {
                  closest = i;
                  absDif = dif;
                }
              }

              return snap[closest];
            };
          }

          return isNaN(snap) ? function (n) {
            return n;
          } : function () {
            return snap * factor;
          };
        },
            buildPointSnapFunc = function buildPointSnapFunc(snap, minX, maxX, minY, maxY, radius, factor) {
          radius = radius && radius < _bigNum ? radius * radius : _bigNum; //so we don't have to Math.sqrt() in the functions. Performance optimization.

          if (_isFunction$1(snap)) {
            return function (point) {
              var edgeTolerance = !self.isPressed ? 1 : 1 - self.edgeResistance,
                  x = point.x,
                  y = point.y,
                  result,
                  dx,
                  dy; //if we're tweening, disable the edgeTolerance because it's already factored into the tweening values (we don't want to apply it multiple times)

              point.x = x = x > maxX ? maxX + (x - maxX) * edgeTolerance : x < minX ? minX + (x - minX) * edgeTolerance : x;
              point.y = y = y > maxY ? maxY + (y - maxY) * edgeTolerance : y < minY ? minY + (y - minY) * edgeTolerance : y;
              result = snap.call(self, point);

              if (result !== point) {
                point.x = result.x;
                point.y = result.y;
              }

              if (factor !== 1) {
                point.x *= factor;
                point.y *= factor;
              }

              if (radius < _bigNum) {
                dx = point.x - x;
                dy = point.y - y;

                if (dx * dx + dy * dy > radius) {
                  point.x = x;
                  point.y = y;
                }
              }

              return point;
            };
          }

          if (_isArray(snap)) {
            return function (p) {
              var i = snap.length,
                  closest = 0,
                  minDist = _bigNum,
                  x,
                  y,
                  point,
                  dist;

              while (--i > -1) {
                point = snap[i];
                x = point.x - p.x;
                y = point.y - p.y;
                dist = x * x + y * y;

                if (dist < minDist) {
                  closest = i;
                  minDist = dist;
                }
              }

              return minDist <= radius ? snap[closest] : p;
            };
          }

          return function (n) {
            return n;
          };
        },
            calculateBounds = function calculateBounds() {
          var bounds, targetBounds, snap, snapIsRaw;
          hasBounds = false;

          if (scrollProxy) {
            scrollProxy.calibrate();
            self.minX = minX = -scrollProxy.maxScrollLeft();
            self.minY = minY = -scrollProxy.maxScrollTop();
            self.maxX = maxX = self.maxY = maxY = 0;
            hasBounds = true;
          } else if (!!vars.bounds) {
            bounds = _getBounds$1(vars.bounds, target.parentNode); //could be a selector/jQuery object or a DOM element or a generic object like {top:0, left:100, width:1000, height:800} or {minX:100, maxX:1100, minY:0, maxY:800}

            if (rotationMode) {
              self.minX = minX = bounds.left;
              self.maxX = maxX = bounds.left + bounds.width;
              self.minY = minY = self.maxY = maxY = 0;
            } else if (!_isUndefined(vars.bounds.maxX) || !_isUndefined(vars.bounds.maxY)) {
              bounds = vars.bounds;
              self.minX = minX = bounds.minX;
              self.minY = minY = bounds.minY;
              self.maxX = maxX = bounds.maxX;
              self.maxY = maxY = bounds.maxY;
            } else {
              targetBounds = _getBounds$1(target, target.parentNode);
              self.minX = minX = Math.round(getPropAsNum(xProp, "px") + bounds.left - targetBounds.left - 0.5);
              self.minY = minY = Math.round(getPropAsNum(yProp, "px") + bounds.top - targetBounds.top - 0.5);
              self.maxX = maxX = Math.round(minX + (bounds.width - targetBounds.width));
              self.maxY = maxY = Math.round(minY + (bounds.height - targetBounds.height));
            }

            if (minX > maxX) {
              self.minX = maxX;
              self.maxX = maxX = minX;
              minX = self.minX;
            }

            if (minY > maxY) {
              self.minY = maxY;
              self.maxY = maxY = minY;
              minY = self.minY;
            }

            if (rotationMode) {
              self.minRotation = minX;
              self.maxRotation = maxX;
            }

            hasBounds = true;
          }

          if (vars.liveSnap) {
            snap = vars.liveSnap === true ? vars.snap || {} : vars.liveSnap;
            snapIsRaw = _isArray(snap) || _isFunction$1(snap);

            if (rotationMode) {
              snapX = buildSnapFunc(snapIsRaw ? snap : snap.rotation, minX, maxX, 1);
              snapY = null;
            } else {
              if (snap.points) {
                snapXY = buildPointSnapFunc(snapIsRaw ? snap : snap.points, minX, maxX, minY, maxY, snap.radius, scrollProxy ? -1 : 1);
              } else {
                if (allowX) {
                  snapX = buildSnapFunc(snapIsRaw ? snap : snap.x || snap.left || snap.scrollLeft, minX, maxX, scrollProxy ? -1 : 1);
                }

                if (allowY) {
                  snapY = buildSnapFunc(snapIsRaw ? snap : snap.y || snap.top || snap.scrollTop, minY, maxY, scrollProxy ? -1 : 1);
                }
              }
            }
          }
        },
            onThrowComplete = function onThrowComplete() {
          self.isThrowing = false;

          _dispatchEvent(self, "throwcomplete", "onThrowComplete");
        },
            onThrowInterrupt = function onThrowInterrupt() {
          self.isThrowing = false;
        },
            animate = function animate(inertia, forceZeroVelocity) {
          var snap, snapIsRaw, tween, overshootTolerance;

          if (inertia && InertiaPlugin) {
            if (inertia === true) {
              snap = vars.snap || vars.liveSnap || {};
              snapIsRaw = _isArray(snap) || _isFunction$1(snap);
              inertia = {
                resistance: (vars.throwResistance || vars.resistance || 1000) / (rotationMode ? 10 : 1)
              };

              if (rotationMode) {
                inertia.rotation = _parseInertia(self, snapIsRaw ? snap : snap.rotation, maxX, minX, 1, forceZeroVelocity);
              } else {
                if (allowX) {
                  inertia[xProp] = _parseInertia(self, snapIsRaw ? snap : snap.points || snap.x || snap.left, maxX, minX, scrollProxy ? -1 : 1, forceZeroVelocity || self.lockedAxis === "x");
                }

                if (allowY) {
                  inertia[yProp] = _parseInertia(self, snapIsRaw ? snap : snap.points || snap.y || snap.top, maxY, minY, scrollProxy ? -1 : 1, forceZeroVelocity || self.lockedAxis === "y");
                }

                if (snap.points || _isArray(snap) && _isObject$1(snap[0])) {
                  inertia.linkedProps = xProp + "," + yProp;
                  inertia.radius = snap.radius; //note: we also disable liveSnapping while throwing if there's a "radius" defined, otherwise it looks weird to have the item thrown past a snapping point but live-snapping mid-tween. We do this by altering the onUpdateParams so that "skipSnap" parameter is true for syncXY.
                }
              }
            }

            self.isThrowing = true;
            overshootTolerance = !isNaN(vars.overshootTolerance) ? vars.overshootTolerance : vars.edgeResistance === 1 ? 0 : 1 - self.edgeResistance + 0.2;

            if (!inertia.duration) {
              inertia.duration = {
                max: Math.max(vars.minDuration || 0, "maxDuration" in vars ? vars.maxDuration : 2),
                min: !isNaN(vars.minDuration) ? vars.minDuration : overshootTolerance === 0 || _isObject$1(inertia) && inertia.resistance > 1000 ? 0 : 0.5,
                overshoot: overshootTolerance
              };
            }

            self.tween = tween = gsap$1.to(scrollProxy || target, {
              inertia: inertia,
              data: "_draggable",
              onComplete: onThrowComplete,
              onInterrupt: onThrowInterrupt,
              onUpdate: vars.fastMode ? _dispatchEvent : syncXY,
              onUpdateParams: vars.fastMode ? [self, "onthrowupdate", "onThrowUpdate"] : snap && snap.radius ? [false, true] : []
            });

            if (!vars.fastMode) {
              if (scrollProxy) {
                scrollProxy._skip = true; // Microsoft browsers have a bug that causes them to briefly render the position incorrectly (it flashes to the end state when we seek() the tween even though we jump right back to the current position, and this only seems to happen when we're affecting both top and left), so we set a _suspendTransforms flag to prevent it from actually applying the values in the ScrollProxy.
              }

              tween.render(1e9, true, true); // force to the end. Remember, the duration will likely change upon initting because that's when InertiaPlugin calculates it.

              syncXY(true, true);
              self.endX = self.x;
              self.endY = self.y;

              if (rotationMode) {
                self.endRotation = self.x;
              }

              tween.play(0);
              syncXY(true, true);

              if (scrollProxy) {
                scrollProxy._skip = false; //Microsoft browsers have a bug that causes them to briefly render the position incorrectly (it flashes to the end state when we seek() the tween even though we jump right back to the current position, and this only seems to happen when we're affecting both top and left), so we set a _suspendTransforms flag to prevent it from actually applying the values in the ScrollProxy.
              }
            }
          } else if (hasBounds) {
            self.applyBounds();
          }
        },
            updateMatrix = function updateMatrix(shiftStart) {
          var start = matrix,
              p;
          matrix = getGlobalMatrix(target.parentNode, true);

          if (shiftStart && self.isPressed && !matrix.equals(start || new Matrix2D())) {
            //if the matrix changes WHILE the element is pressed, we must adjust the startPointerX and startPointerY accordingly, so we invert the original matrix and figure out where the pointerX and pointerY were in the global space, then apply the new matrix to get the updated coordinates.
            p = start.inverse().apply({
              x: startPointerX,
              y: startPointerY
            });
            matrix.apply(p, p);
            startPointerX = p.x;
            startPointerY = p.y;
          }

          if (matrix.equals(_identityMatrix)) {
            //if there are no transforms, we can optimize performance by not factoring in the matrix
            matrix = null;
          }
        },
            recordStartPositions = function recordStartPositions() {
          var edgeTolerance = 1 - self.edgeResistance,
              offsetX = isFixed ? _getDocScrollLeft(ownerDoc) : 0,
              offsetY = isFixed ? _getDocScrollTop(ownerDoc) : 0,
              parsedOrigin,
              x,
              y;
          updateMatrix(false);
          _point1.x = self.pointerX - offsetX;
          _point1.y = self.pointerY - offsetY;
          matrix && matrix.apply(_point1, _point1);
          startPointerX = _point1.x; //translate to local coordinate system

          startPointerY = _point1.y;

          if (dirty) {
            setPointerPosition(self.pointerX, self.pointerY);
            render(true);
          }

          innerMatrix = getGlobalMatrix(target);

          if (scrollProxy) {
            calculateBounds();
            startElementY = scrollProxy.top();
            startElementX = scrollProxy.left();
          } else {
            //if the element is in the process of tweening, don't force snapping to occur because it could make it jump. Imagine the user throwing, then before it's done, clicking on the element in its inbetween state.
            if (isTweening()) {
              syncXY(true, true);
              calculateBounds();
            } else {
              self.applyBounds();
            }

            if (rotationMode) {
              parsedOrigin = target.ownerSVGElement ? [gsCache.xOrigin - target.getBBox().x, gsCache.yOrigin - target.getBBox().y] : (_getComputedStyle$1(target)[_transformOriginProp] || "0 0").split(" ");
              rotationOrigin = self.rotationOrigin = getGlobalMatrix(target).apply({
                x: parseFloat(parsedOrigin[0]) || 0,
                y: parseFloat(parsedOrigin[1]) || 0
              });
              syncXY(true, true);
              x = self.pointerX - rotationOrigin.x - offsetX;
              y = rotationOrigin.y - self.pointerY + offsetY;
              startElementX = self.x; //starting rotation (x always refers to rotation in type:"rotation", measured in degrees)

              startElementY = self.y = Math.atan2(y, x) * _RAD2DEG;
            } else {
              //parent = !isFixed && target.parentNode;
              //startScrollTop = parent ? parent.scrollTop || 0 : 0;
              //startScrollLeft = parent ? parent.scrollLeft || 0 : 0;
              startElementY = getPropAsNum(yProp, "px"); //record the starting top and left values so that we can just add the mouse's movement to them later.

              startElementX = getPropAsNum(xProp, "px");
            }
          }

          if (hasBounds && edgeTolerance) {
            if (startElementX > maxX) {
              startElementX = maxX + (startElementX - maxX) / edgeTolerance;
            } else if (startElementX < minX) {
              startElementX = minX - (minX - startElementX) / edgeTolerance;
            }

            if (!rotationMode) {
              if (startElementY > maxY) {
                startElementY = maxY + (startElementY - maxY) / edgeTolerance;
              } else if (startElementY < minY) {
                startElementY = minY - (minY - startElementY) / edgeTolerance;
              }
            }
          }

          self.startX = startElementX = _round$1(startElementX);
          self.startY = startElementY = _round$1(startElementY);
        },
            isTweening = function isTweening() {
          return self.tween && self.tween.isActive();
        },
            removePlaceholder = function removePlaceholder() {
          if (_placeholderDiv.parentNode && !isTweening() && !self.isDragging) {
            //_placeholderDiv just props open auto-scrolling containers so they don't collapse as the user drags left/up. We remove it after dragging (and throwing, if necessary) finishes.
            _placeholderDiv.parentNode.removeChild(_placeholderDiv);
          }
        },
            //called when the mouse is pressed (or touch starts)
        onPress = function onPress(e, force) {
          var i;

          if (!enabled || self.isPressed || !e || (e.type === "mousedown" || e.type === "pointerdown") && !force && _getTime$1() - clickTime < 30 && _touchEventLookup[self.pointerEvent.type]) {
            //when we DON'T preventDefault() in order to accommodate touch-scrolling and the user just taps, many browsers also fire a mousedown/mouseup sequence AFTER the touchstart/touchend sequence, thus it'd result in two quick "click" events being dispatched. This line senses that condition and halts it on the subsequent mousedown.
            isPreventingDefault && e && enabled && _preventDefault(e); // in some browsers, we must listen for multiple event types like touchstart, pointerdown, mousedown. The first time this function is called, we record whether or not we _preventDefault() so that on duplicate calls, we can do the same if necessary.

            return;
          }

          interrupted = isTweening();
          self.pointerEvent = e;

          if (_touchEventLookup[e.type]) {
            //note: on iOS, BOTH touchmove and mousemove are dispatched, but the mousemove has pageY and pageX of 0 which would mess up the calculations and needlessly hurt performance.
            touchEventTarget = ~e.type.indexOf("touch") ? e.currentTarget || e.target : ownerDoc; //pointer-based touches (for Microsoft browsers) don't remain locked to the original target like other browsers, so we must use the document instead. The event type would be "MSPointerDown" or "pointerdown".

            _addListener$1(touchEventTarget, "touchend", onRelease);

            _addListener$1(touchEventTarget, "touchmove", onMove);

            _addListener$1(touchEventTarget, "touchcancel", onRelease);

            _addListener$1(ownerDoc, "touchstart", _onMultiTouchDocument);
          } else {
            touchEventTarget = null;

            _addListener$1(ownerDoc, "mousemove", onMove); //attach these to the document instead of the box itself so that if the user's mouse moves too quickly (and off of the box), things still work.

          }

          touchDragAxis = null;

          if (!_supportsPointer || !touchEventTarget) {
            _addListener$1(ownerDoc, "mouseup", onRelease);

            e && e.target && _addListener$1(e.target, "mouseup", onRelease); //we also have to listen directly on the element because some browsers don't bubble up the event to the _doc on elements with contentEditable="true"
          }

          isClicking = isClickable.call(self, e.target) && vars.dragClickables === false && !force;

          if (isClicking) {
            _addListener$1(e.target, "change", onRelease); //in some browsers, when you mousedown on a <select> element, no mouseup gets dispatched! So we listen for a "change" event instead.


            _dispatchEvent(self, "pressInit", "onPressInit");

            _dispatchEvent(self, "press", "onPress");

            _setSelectable(triggers, true); //accommodates things like inputs and elements with contentEditable="true" (otherwise user couldn't drag to select text)


            isPreventingDefault = false;
            return;
          }

          allowNativeTouchScrolling = !touchEventTarget || allowX === allowY || self.vars.allowNativeTouchScrolling === false || self.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2) ? false : allowX ? "y" : "x"; //note: in Chrome, right-clicking (for a context menu) fires onPress and it doesn't have the event.which set properly, so we must look for event.ctrlKey. If the user wants to allow context menus we should of course sense it here and not allow native touch scrolling.

          isPreventingDefault = !allowNativeTouchScrolling && !self.allowEventDefault;

          if (isPreventingDefault) {
            _preventDefault(e);

            _addListener$1(_win$1, "touchforcechange", _preventDefault); //works around safari bug: https://greensock.com/forums/topic/21450-draggable-in-iframe-on-mobile-is-buggy/

          }

          if (e.changedTouches) {
            //touch events store the data slightly differently
            e = touch = e.changedTouches[0];
            touchID = e.identifier;
          } else if (e.pointerId) {
            touchID = e.pointerId; //for some Microsoft browsers
          } else {
            touch = touchID = null;
          }

          _dragCount++;

          _addToRenderQueue(render); //causes the Draggable to render on each "tick" of TweenLite.ticker (performance optimization - updating values in a mousemove can cause them to happen too frequently, like multiple times between frame redraws which is wasteful, and it also prevents values from updating properly in IE8)


          startPointerY = self.pointerY = e.pageY; //record the starting x and y so that we can calculate the movement from the original in _onMouseMove

          startPointerX = self.pointerX = e.pageX;

          _dispatchEvent(self, "pressInit", "onPressInit");

          if (allowNativeTouchScrolling || self.autoScroll) {
            _recordMaxScrolls(target.parentNode);
          }

          if (target.parentNode && self.autoScroll && !scrollProxy && !rotationMode && target.parentNode._gsMaxScrollX && !_placeholderDiv.parentNode && !target.getBBox) {
            //add a placeholder div to prevent the parent container from collapsing when the user drags the element left.
            _placeholderDiv.style.width = target.parentNode.scrollWidth + "px";
            target.parentNode.appendChild(_placeholderDiv);
          }

          recordStartPositions();
          self.tween && self.tween.kill();
          self.isThrowing = false;
          gsap$1.killTweensOf(scrollProxy || target, killProps, true); //in case the user tries to drag it before the last tween is done.

          scrollProxy && gsap$1.killTweensOf(target, {
            scrollTo: 1
          }, true); //just in case the original target's scroll position is being tweened somewhere else.

          self.tween = self.lockedAxis = null;

          if (vars.zIndexBoost || !rotationMode && !scrollProxy && vars.zIndexBoost !== false) {
            target.style.zIndex = Draggable.zIndex++;
          }

          self.isPressed = true;
          hasDragCallback = !!(vars.onDrag || self._listeners.drag);
          hasMoveCallback = !!(vars.onMove || self._listeners.move);

          if (vars.cursor !== false || vars.activeCursor) {
            i = triggers.length;

            while (--i > -1) {
              gsap$1.set(triggers[i], {
                cursor: vars.activeCursor || vars.cursor || (_defaultCursor === "grab" ? "grabbing" : _defaultCursor)
              });
            }
          }

          _dispatchEvent(self, "press", "onPress");
        },
            //called every time the mouse/touch moves
        onMove = function onMove(e) {
          var originalEvent = e,
              touches,
              pointerX,
              pointerY,
              i,
              dx,
              dy;

          if (!enabled || _isMultiTouching || !self.isPressed || !e) {
            isPreventingDefault && e && enabled && _preventDefault(e); // in some browsers, we must listen for multiple event types like touchmove, pointermove, mousemove. The first time this function is called, we record whether or not we _preventDefault() so that on duplicate calls, we can do the same if necessary.

            return;
          }

          self.pointerEvent = e;
          touches = e.changedTouches;

          if (touches) {
            //touch events store the data slightly differently
            e = touches[0];

            if (e !== touch && e.identifier !== touchID) {
              //Usually changedTouches[0] will be what we're looking for, but in case it's not, look through the rest of the array...(and Android browsers don't reuse the event like iOS)
              i = touches.length;

              while (--i > -1 && (e = touches[i]).identifier !== touchID && e.target !== target) {} // Some Android devices dispatch a touchstart AND pointerdown initially, and then only pointermove thus the touchID may not match because it was grabbed from the touchstart event whereas the pointer event is the one that the browser dispatches for move, so if the event target matches this Draggable's target, let it through.


              if (i < 0) {
                return;
              }
            }
          } else if (e.pointerId && touchID && e.pointerId !== touchID) {
            //for some Microsoft browsers, we must attach the listener to the doc rather than the trigger so that when the finger moves outside the bounds of the trigger, things still work. So if the event we're receiving has a pointerId that doesn't match the touchID, ignore it (for multi-touch)
            return;
          }

          if (touchEventTarget && allowNativeTouchScrolling && !touchDragAxis) {
            //Android browsers force us to decide on the first "touchmove" event if we should allow the default (scrolling) behavior or preventDefault(). Otherwise, a "touchcancel" will be fired and then no "touchmove" or "touchend" will fire during the scrolling (no good).
            _point1.x = e.pageX - (isFixed ? _getDocScrollLeft(ownerDoc) : 0);
            _point1.y = e.pageY - (isFixed ? _getDocScrollTop(ownerDoc) : 0);
            matrix && matrix.apply(_point1, _point1);
            pointerX = _point1.x;
            pointerY = _point1.y;
            dx = Math.abs(pointerX - startPointerX);
            dy = Math.abs(pointerY - startPointerY);

            if (dx !== dy && (dx > minimumMovement || dy > minimumMovement) || _isAndroid && allowNativeTouchScrolling === touchDragAxis) {
              touchDragAxis = dx > dy && allowX ? "x" : "y";

              if (allowNativeTouchScrolling && touchDragAxis !== allowNativeTouchScrolling) {
                _addListener$1(_win$1, "touchforcechange", _preventDefault); // prevents native touch scrolling from taking over if the user started dragging in the other direction in iOS Safari

              }

              if (self.vars.lockAxisOnTouchScroll !== false && allowX && allowY) {
                self.lockedAxis = touchDragAxis === "x" ? "y" : "x";
                _isFunction$1(self.vars.onLockAxis) && self.vars.onLockAxis.call(self, originalEvent);
              }

              if (_isAndroid && allowNativeTouchScrolling === touchDragAxis) {
                onRelease(originalEvent);
                return;
              }
            }
          }

          if (!self.allowEventDefault && (!allowNativeTouchScrolling || touchDragAxis && allowNativeTouchScrolling !== touchDragAxis) && originalEvent.cancelable !== false) {
            _preventDefault(originalEvent);

            isPreventingDefault = true;
          } else if (isPreventingDefault) {
            isPreventingDefault = false;
          }

          if (self.autoScroll) {
            checkAutoScrollBounds = true;
          }

          setPointerPosition(e.pageX, e.pageY, hasMoveCallback);
        },
            setPointerPosition = function setPointerPosition(pointerX, pointerY, invokeOnMove) {
          var dragTolerance = 1 - self.dragResistance,
              edgeTolerance = 1 - self.edgeResistance,
              prevPointerX = self.pointerX,
              prevPointerY = self.pointerY,
              prevStartElementY = startElementY,
              prevX = self.x,
              prevY = self.y,
              prevEndX = self.endX,
              prevEndY = self.endY,
              prevEndRotation = self.endRotation,
              prevDirty = dirty,
              xChange,
              yChange,
              x,
              y,
              dif,
              temp;
          self.pointerX = pointerX;
          self.pointerY = pointerY;

          if (isFixed) {
            pointerX -= _getDocScrollLeft(ownerDoc);
            pointerY -= _getDocScrollTop(ownerDoc);
          }

          if (rotationMode) {
            y = Math.atan2(rotationOrigin.y - pointerY, pointerX - rotationOrigin.x) * _RAD2DEG;
            dif = self.y - y;

            if (dif > 180) {
              startElementY -= 360;
              self.y = y;
            } else if (dif < -180) {
              startElementY += 360;
              self.y = y;
            }

            if (self.x !== startElementX || Math.abs(startElementY - y) > minimumMovement) {
              self.y = y;
              x = startElementX + (startElementY - y) * dragTolerance;
            } else {
              x = startElementX;
            }
          } else {
            if (matrix) {
              temp = pointerX * matrix.a + pointerY * matrix.c + matrix.e;
              pointerY = pointerX * matrix.b + pointerY * matrix.d + matrix.f;
              pointerX = temp;
            }

            yChange = pointerY - startPointerY;
            xChange = pointerX - startPointerX;

            if (yChange < minimumMovement && yChange > -minimumMovement) {
              yChange = 0;
            }

            if (xChange < minimumMovement && xChange > -minimumMovement) {
              xChange = 0;
            }

            if ((self.lockAxis || self.lockedAxis) && (xChange || yChange)) {
              temp = self.lockedAxis;

              if (!temp) {
                self.lockedAxis = temp = allowX && Math.abs(xChange) > Math.abs(yChange) ? "y" : allowY ? "x" : null;

                if (temp && _isFunction$1(self.vars.onLockAxis)) {
                  self.vars.onLockAxis.call(self, self.pointerEvent);
                }
              }

              if (temp === "y") {
                yChange = 0;
              } else if (temp === "x") {
                xChange = 0;
              }
            }

            x = _round$1(startElementX + xChange * dragTolerance);
            y = _round$1(startElementY + yChange * dragTolerance);
          }

          if ((snapX || snapY || snapXY) && (self.x !== x || self.y !== y && !rotationMode)) {
            if (snapXY) {
              _temp1.x = x;
              _temp1.y = y;
              temp = snapXY(_temp1);
              x = _round$1(temp.x);
              y = _round$1(temp.y);
            }

            if (snapX) {
              x = _round$1(snapX(x));
            }

            if (snapY) {
              y = _round$1(snapY(y));
            }
          }

          if (hasBounds) {
            if (x > maxX) {
              x = maxX + Math.round((x - maxX) * edgeTolerance);
            } else if (x < minX) {
              x = minX + Math.round((x - minX) * edgeTolerance);
            }

            if (!rotationMode) {
              if (y > maxY) {
                y = Math.round(maxY + (y - maxY) * edgeTolerance);
              } else if (y < minY) {
                y = Math.round(minY + (y - minY) * edgeTolerance);
              }
            }
          }

          if (self.x !== x || self.y !== y && !rotationMode) {
            if (rotationMode) {
              self.endRotation = self.x = self.endX = x;
              dirty = true;
            } else {
              if (allowY) {
                self.y = self.endY = y;
                dirty = true; //a flag that indicates we need to render the target next time the TweenLite.ticker dispatches a "tick" event (typically on a requestAnimationFrame) - this is a performance optimization (we shouldn't render on every move because sometimes many move events can get dispatched between screen refreshes, and that'd be wasteful to render every time)
              }

              if (allowX) {
                self.x = self.endX = x;
                dirty = true;
              }
            }

            if (!invokeOnMove || _dispatchEvent(self, "move", "onMove") !== false) {
              if (!self.isDragging && self.isPressed) {
                self.isDragging = true;

                _dispatchEvent(self, "dragstart", "onDragStart");
              }
            } else {
              //revert because the onMove returned false!
              self.pointerX = prevPointerX;
              self.pointerY = prevPointerY;
              startElementY = prevStartElementY;
              self.x = prevX;
              self.y = prevY;
              self.endX = prevEndX;
              self.endY = prevEndY;
              self.endRotation = prevEndRotation;
              dirty = prevDirty;
            }
          }
        },
            //called when the mouse/touch is released
        onRelease = function onRelease(e, force) {
          if (!enabled || !self.isPressed || e && touchID != null && !force && (e.pointerId && e.pointerId !== touchID && e.target !== target || e.changedTouches && !_hasTouchID(e.changedTouches, touchID))) {
            //for some Microsoft browsers, we must attach the listener to the doc rather than the trigger so that when the finger moves outside the bounds of the trigger, things still work. So if the event we're receiving has a pointerId that doesn't match the touchID, ignore it (for multi-touch)
            isPreventingDefault && e && enabled && _preventDefault(e); // in some browsers, we must listen for multiple event types like touchend, pointerup, mouseup. The first time this function is called, we record whether or not we _preventDefault() so that on duplicate calls, we can do the same if necessary.

            return;
          }

          self.isPressed = false;
          var originalEvent = e,
              wasDragging = self.isDragging,
              isContextMenuRelease = self.vars.allowContextMenu && e && (e.ctrlKey || e.which > 2),
              placeholderDelayedCall = gsap$1.delayedCall(0.001, removePlaceholder),
              touches,
              i,
              syntheticEvent,
              eventTarget,
              syntheticClick;

          if (touchEventTarget) {
            _removeListener$1(touchEventTarget, "touchend", onRelease);

            _removeListener$1(touchEventTarget, "touchmove", onMove);

            _removeListener$1(touchEventTarget, "touchcancel", onRelease);

            _removeListener$1(ownerDoc, "touchstart", _onMultiTouchDocument);
          } else {
            _removeListener$1(ownerDoc, "mousemove", onMove);
          }

          _removeListener$1(_win$1, "touchforcechange", _preventDefault);

          if (!_supportsPointer || !touchEventTarget) {
            _removeListener$1(ownerDoc, "mouseup", onRelease);

            e && e.target && _removeListener$1(e.target, "mouseup", onRelease);
          }

          dirty = false;

          if (wasDragging) {
            dragEndTime = _lastDragTime = _getTime$1();
            self.isDragging = false;
          }

          if (isClicking && !isContextMenuRelease) {
            if (e) {
              _removeListener$1(e.target, "change", onRelease);

              self.pointerEvent = originalEvent;
            }

            _setSelectable(triggers, false);

            _dispatchEvent(self, "release", "onRelease");

            _dispatchEvent(self, "click", "onClick");

            isClicking = false;
            return;
          }

          _removeFromRenderQueue(render);

          i = triggers.length;

          while (--i > -1) {
            _setStyle(triggers[i], "cursor", vars.cursor || (vars.cursor !== false ? _defaultCursor : null));
          }

          _dragCount--;

          if (e) {
            touches = e.changedTouches;

            if (touches) {
              //touch events store the data slightly differently
              e = touches[0];

              if (e !== touch && e.identifier !== touchID) {
                //Usually changedTouches[0] will be what we're looking for, but in case it's not, look through the rest of the array...(and Android browsers don't reuse the event like iOS)
                i = touches.length;

                while (--i > -1 && (e = touches[i]).identifier !== touchID && e.target !== target) {}

                if (i < 0) {
                  return;
                }
              }
            }

            self.pointerEvent = originalEvent;
            self.pointerX = e.pageX;
            self.pointerY = e.pageY;
          }

          if (isContextMenuRelease && originalEvent) {
            _preventDefault(originalEvent);

            isPreventingDefault = true;

            _dispatchEvent(self, "release", "onRelease");
          } else if (originalEvent && !wasDragging) {
            isPreventingDefault = false;

            if (interrupted && (vars.snap || vars.bounds)) {
              //otherwise, if the user clicks on the object while it's animating to a snapped position, and then releases without moving 3 pixels, it will just stay there (it should animate/snap)
              animate(vars.inertia || vars.throwProps);
            }

            _dispatchEvent(self, "release", "onRelease");

            if ((!_isAndroid || originalEvent.type !== "touchmove") && originalEvent.type.indexOf("cancel") === -1) {
              //to accommodate native scrolling on Android devices, we have to immediately call onRelease() on the first touchmove event, but that shouldn't trigger a "click".
              _dispatchEvent(self, "click", "onClick");

              if (_getTime$1() - clickTime < 300) {
                _dispatchEvent(self, "doubleclick", "onDoubleClick");
              }

              eventTarget = originalEvent.target || target; //old IE uses srcElement

              clickTime = _getTime$1();

              syntheticClick = function syntheticClick() {
                // some browsers (like Firefox) won't trust script-generated clicks, so if the user tries to click on a video to play it, for example, it simply won't work. Since a regular "click" event will most likely be generated anyway (one that has its isTrusted flag set to true), we must slightly delay our script-generated click so that the "real"/trusted one is prioritized. Remember, when there are duplicate events in quick succession, we suppress all but the first one. Some browsers don't even trigger the "real" one at all, so our synthetic one is a safety valve that ensures that no matter what, a click event does get dispatched.
                if (clickTime !== clickDispatch && self.enabled() && !self.isPressed && !originalEvent.defaultPrevented) {
                  if (eventTarget.click) {
                    //some browsers (like mobile Safari) don't properly trigger the click event
                    eventTarget.click();
                  } else if (ownerDoc.createEvent) {
                    syntheticEvent = ownerDoc.createEvent("MouseEvents");
                    syntheticEvent.initMouseEvent("click", true, true, _win$1, 1, self.pointerEvent.screenX, self.pointerEvent.screenY, self.pointerX, self.pointerY, false, false, false, false, 0, null);
                    eventTarget.dispatchEvent(syntheticEvent);
                  }
                }
              };

              if (!_isAndroid && !originalEvent.defaultPrevented) {
                //iOS Safari requires the synthetic click to happen immediately or else it simply won't work, but Android doesn't play nice.
                gsap$1.delayedCall(0.05, syntheticClick); //in addition to the iOS bug workaround, there's a Firefox issue with clicking on things like a video to play, so we must fake a click event in a slightly delayed fashion. Previously, we listened for the "click" event with "capture" false which solved the video-click-to-play issue, but it would allow the "click" event to be dispatched twice like if you were using a jQuery.click() because that was handled in the capture phase, thus we had to switch to the capture phase to avoid the double-dispatching, but do the delayed synthetic click. Don't fire it too fast (like 0.00001) because we want to give the native event a chance to fire first as it's "trusted".
              }
            }
          } else {
            animate(vars.inertia || vars.throwProps); //will skip if inertia/throwProps isn't defined or IntertiaPlugin isn't loaded.

            if (!self.allowEventDefault && originalEvent && (vars.dragClickables !== false || !isClickable.call(self, originalEvent.target)) && wasDragging && (!allowNativeTouchScrolling || touchDragAxis && allowNativeTouchScrolling === touchDragAxis) && originalEvent.cancelable !== false) {
              isPreventingDefault = true;

              _preventDefault(originalEvent);
            } else {
              isPreventingDefault = false;
            }

            _dispatchEvent(self, "release", "onRelease");
          }

          isTweening() && placeholderDelayedCall.duration(self.tween.duration()); //sync the timing so that the placeholder DIV gets

          wasDragging && _dispatchEvent(self, "dragend", "onDragEnd");
          return true;
        },
            updateScroll = function updateScroll(e) {
          if (e && self.isDragging && !scrollProxy) {
            var parent = e.target || target.parentNode,
                deltaX = parent.scrollLeft - parent._gsScrollX,
                deltaY = parent.scrollTop - parent._gsScrollY;

            if (deltaX || deltaY) {
              if (matrix) {
                startPointerX -= deltaX * matrix.a + deltaY * matrix.c;
                startPointerY -= deltaY * matrix.d + deltaX * matrix.b;
              } else {
                startPointerX -= deltaX;
                startPointerY -= deltaY;
              }

              parent._gsScrollX += deltaX;
              parent._gsScrollY += deltaY;
              setPointerPosition(self.pointerX, self.pointerY);
            }
          }
        },
            onClick = function onClick(e) {
          //this was a huge pain in the neck to align all the various browsers and their behaviors. Chrome, Firefox, Safari, Opera, Android, and Microsoft Edge all handle events differently! Some will only trigger native behavior (like checkbox toggling) from trusted events. Others don't even support isTrusted, but require 2 events to flow through before triggering native behavior. Edge treats everything as trusted but also mandates that 2 flow through to trigger the correct native behavior.
          var time = _getTime$1(),
              recentlyClicked = time - clickTime < 100,
              recentlyDragged = time - dragEndTime < 50,
              alreadyDispatched = recentlyClicked && clickDispatch === clickTime,
              defaultPrevented = self.pointerEvent && self.pointerEvent.defaultPrevented,
              alreadyDispatchedTrusted = recentlyClicked && trustedClickDispatch === clickTime,
              trusted = e.isTrusted || e.isTrusted == null && recentlyClicked && alreadyDispatched; //note: Safari doesn't support isTrusted, and it won't properly execute native behavior (like toggling checkboxes) on the first synthetic "click" event - we must wait for the 2nd and treat it as trusted (but stop propagation at that point). Confusing, I know. Don't you love cross-browser compatibility challenges?


          if ((alreadyDispatched || recentlyDragged && self.vars.suppressClickOnDrag !== false) && e.stopImmediatePropagation) {
            e.stopImmediatePropagation();
          }

          if (recentlyClicked && !(self.pointerEvent && self.pointerEvent.defaultPrevented) && (!alreadyDispatched || trusted && !alreadyDispatchedTrusted)) {
            //let the first click pass through unhindered. Let the next one only if it's trusted, then no more (stop quick-succession ones)
            if (trusted && alreadyDispatched) {
              trustedClickDispatch = clickTime;
            }

            clickDispatch = clickTime;
            return;
          }

          if (self.isPressed || recentlyDragged || recentlyClicked) {
            if (!trusted || !e.detail || !recentlyClicked || defaultPrevented) {
              _preventDefault(e);
            }
          }

          if (!recentlyClicked && !recentlyDragged) {
            // for script-triggered event dispatches, like element.click()
            e && e.target && (self.pointerEvent = e);

            _dispatchEvent(self, "click", "onClick");
          }
        },
            localizePoint = function localizePoint(p) {
          return matrix ? {
            x: p.x * matrix.a + p.y * matrix.c + matrix.e,
            y: p.x * matrix.b + p.y * matrix.d + matrix.f
          } : {
            x: p.x,
            y: p.y
          };
        };

        old = Draggable.get(target);
        old && old.kill(); // avoids duplicates (an element can only be controlled by one Draggable)
        //give the user access to start/stop dragging...

        _this2.startDrag = function (event, align) {
          var r1, r2, p1, p2;
          onPress(event || self.pointerEvent, true); //if the pointer isn't on top of the element, adjust things accordingly

          if (align && !self.hitTest(event || self.pointerEvent)) {
            r1 = _parseRect(event || self.pointerEvent);
            r2 = _parseRect(target);
            p1 = localizePoint({
              x: r1.left + r1.width / 2,
              y: r1.top + r1.height / 2
            });
            p2 = localizePoint({
              x: r2.left + r2.width / 2,
              y: r2.top + r2.height / 2
            });
            startPointerX -= p1.x - p2.x;
            startPointerY -= p1.y - p2.y;
          }

          if (!self.isDragging) {
            self.isDragging = true;

            _dispatchEvent(self, "dragstart", "onDragStart");
          }
        };

        _this2.drag = onMove;

        _this2.endDrag = function (e) {
          return onRelease(e || self.pointerEvent, true);
        };

        _this2.timeSinceDrag = function () {
          return self.isDragging ? 0 : (_getTime$1() - dragEndTime) / 1000;
        };

        _this2.timeSinceClick = function () {
          return (_getTime$1() - clickTime) / 1000;
        };

        _this2.hitTest = function (target, threshold) {
          return Draggable.hitTest(self.target, target, threshold);
        };

        _this2.getDirection = function (from, diagonalThreshold) {
          //from can be "start" (default), "velocity", or an element
          var mode = from === "velocity" && InertiaPlugin ? from : _isObject$1(from) && !rotationMode ? "element" : "start",
              xChange,
              yChange,
              ratio,
              direction,
              r1,
              r2;

          if (mode === "element") {
            r1 = _parseRect(self.target);
            r2 = _parseRect(from);
          }

          xChange = mode === "start" ? self.x - startElementX : mode === "velocity" ? InertiaPlugin.getVelocity(target, xProp) : r1.left + r1.width / 2 - (r2.left + r2.width / 2);

          if (rotationMode) {
            return xChange < 0 ? "counter-clockwise" : "clockwise";
          } else {
            diagonalThreshold = diagonalThreshold || 2;
            yChange = mode === "start" ? self.y - startElementY : mode === "velocity" ? InertiaPlugin.getVelocity(target, yProp) : r1.top + r1.height / 2 - (r2.top + r2.height / 2);
            ratio = Math.abs(xChange / yChange);
            direction = ratio < 1 / diagonalThreshold ? "" : xChange < 0 ? "left" : "right";

            if (ratio < diagonalThreshold) {
              if (direction !== "") {
                direction += "-";
              }

              direction += yChange < 0 ? "up" : "down";
            }
          }

          return direction;
        };

        _this2.applyBounds = function (newBounds, sticky) {
          var x, y, forceZeroVelocity, e, parent, isRoot;

          if (newBounds && vars.bounds !== newBounds) {
            vars.bounds = newBounds;
            return self.update(true, sticky);
          }

          syncXY(true);
          calculateBounds();

          if (hasBounds && !isTweening()) {
            x = self.x;
            y = self.y;

            if (x > maxX) {
              x = maxX;
            } else if (x < minX) {
              x = minX;
            }

            if (y > maxY) {
              y = maxY;
            } else if (y < minY) {
              y = minY;
            }

            if (self.x !== x || self.y !== y) {
              forceZeroVelocity = true;
              self.x = self.endX = x;

              if (rotationMode) {
                self.endRotation = x;
              } else {
                self.y = self.endY = y;
              }

              dirty = true;
              render(true);

              if (self.autoScroll && !self.isDragging) {
                _recordMaxScrolls(target.parentNode);

                e = target;
                _windowProxy.scrollTop = _win$1.pageYOffset != null ? _win$1.pageYOffset : ownerDoc.documentElement.scrollTop != null ? ownerDoc.documentElement.scrollTop : ownerDoc.body.scrollTop;
                _windowProxy.scrollLeft = _win$1.pageXOffset != null ? _win$1.pageXOffset : ownerDoc.documentElement.scrollLeft != null ? ownerDoc.documentElement.scrollLeft : ownerDoc.body.scrollLeft;

                while (e && !isRoot) {
                  //walk up the chain and sense wherever the scrollTop/scrollLeft exceeds the maximum.
                  isRoot = _isRoot(e.parentNode);
                  parent = isRoot ? _windowProxy : e.parentNode;

                  if (allowY && parent.scrollTop > parent._gsMaxScrollY) {
                    parent.scrollTop = parent._gsMaxScrollY;
                  }

                  if (allowX && parent.scrollLeft > parent._gsMaxScrollX) {
                    parent.scrollLeft = parent._gsMaxScrollX;
                  }

                  e = parent;
                }
              }
            }

            if (self.isThrowing && (forceZeroVelocity || self.endX > maxX || self.endX < minX || self.endY > maxY || self.endY < minY)) {
              animate(vars.inertia || vars.throwProps, forceZeroVelocity);
            }
          }

          return self;
        };

        _this2.update = function (applyBounds, sticky, ignoreExternalChanges) {
          if (sticky && self.isPressed) {
            // in case the element was repositioned in the document flow, thus its x/y may be identical but its position is actually quite different.
            var m = getGlobalMatrix(target),
                p = innerMatrix.apply({
              x: self.x - startElementX,
              y: self.y - startElementY
            }),
                m2 = getGlobalMatrix(target.parentNode, true);
            m2.apply({
              x: m.e - p.x,
              y: m.f - p.y
            }, p);
            self.x -= p.x - m2.e;
            self.y -= p.y - m2.f;
            render(true);
            recordStartPositions();
          }

          var x = self.x,
              y = self.y;
          updateMatrix(!sticky);

          if (applyBounds) {
            self.applyBounds();
          } else {
            dirty && ignoreExternalChanges && render(true);
            syncXY(true);
          }

          if (sticky) {
            setPointerPosition(self.pointerX, self.pointerY);
            dirty && render(true);
          }

          if (self.isPressed && !sticky && (allowX && Math.abs(x - self.x) > 0.01 || allowY && Math.abs(y - self.y) > 0.01 && !rotationMode)) {
            recordStartPositions();
          }

          if (self.autoScroll) {
            _recordMaxScrolls(target.parentNode, self.isDragging);

            checkAutoScrollBounds = self.isDragging;
            render(true); //in case reparenting occurred.

            _removeScrollListener(target, updateScroll);

            _addScrollListener(target, updateScroll);
          }

          return self;
        };

        _this2.enable = function (type) {
          var setVars = {
            lazy: true
          },
              id,
              i,
              trigger;

          if (vars.cursor !== false) {
            setVars.cursor = vars.cursor || _defaultCursor;
          }

          if (gsap$1.utils.checkPrefix("touchCallout")) {
            setVars.touchCallout = "none";
          }

          if (type !== "soft") {
            _setTouchActionForAllDescendants(triggers, allowX === allowY ? "none" : vars.allowNativeTouchScrolling && target.scrollHeight === target.clientHeight === (target.scrollWidth === target.clientHeight) || vars.allowEventDefault ? "manipulation" : allowX ? "pan-y" : "pan-x"); // Some browsers like Internet Explorer will fire a pointercancel event when the user attempts to drag when touchAction is "manipulate" because it's perceived as a pan. If the element has scrollable content in only one direction, we should use pan-x or pan-y accordingly so that the pointercancel doesn't prevent dragging.


            i = triggers.length;

            while (--i > -1) {
              trigger = triggers[i];
              _supportsPointer || _addListener$1(trigger, "mousedown", onPress);

              _addListener$1(trigger, "touchstart", onPress);

              _addListener$1(trigger, "click", onClick, true); //note: used to pass true for capture but it prevented click-to-play-video functionality in Firefox.


              gsap$1.set(trigger, setVars);

              if (trigger.getBBox && trigger.ownerSVGElement) {
                // a bug in chrome doesn't respect touch-action on SVG elements - it only works if we set it on the parent SVG.
                gsap$1.set(trigger.ownerSVGElement, {
                  touchAction: allowX === allowY ? "none" : vars.allowNativeTouchScrolling || vars.allowEventDefault ? "manipulation" : allowX ? "pan-y" : "pan-x"
                });
              }

              vars.allowContextMenu || _addListener$1(trigger, "contextmenu", onContextMenu);
            }

            _setSelectable(triggers, false);
          }

          _addScrollListener(target, updateScroll);

          enabled = true;

          if (InertiaPlugin && type !== "soft") {
            InertiaPlugin.track(scrollProxy || target, xyMode ? "x,y" : rotationMode ? "rotation" : "top,left");
          }

          target._gsDragID = id = "d" + _lookupCount++;
          _lookup[id] = self;

          if (scrollProxy) {
            scrollProxy.enable();
            scrollProxy.element._gsDragID = id;
          }

          (vars.bounds || rotationMode) && recordStartPositions();
          vars.bounds && self.applyBounds();
          return self;
        };

        _this2.disable = function (type) {
          var dragging = self.isDragging,
              i = triggers.length,
              trigger;

          while (--i > -1) {
            _setStyle(triggers[i], "cursor", null);
          }

          if (type !== "soft") {
            _setTouchActionForAllDescendants(triggers, null);

            i = triggers.length;

            while (--i > -1) {
              trigger = triggers[i];

              _setStyle(trigger, "touchCallout", null);

              _removeListener$1(trigger, "mousedown", onPress);

              _removeListener$1(trigger, "touchstart", onPress);

              _removeListener$1(trigger, "click", onClick);

              _removeListener$1(trigger, "contextmenu", onContextMenu);
            }

            _setSelectable(triggers, true);

            if (touchEventTarget) {
              _removeListener$1(touchEventTarget, "touchcancel", onRelease);

              _removeListener$1(touchEventTarget, "touchend", onRelease);

              _removeListener$1(touchEventTarget, "touchmove", onMove);
            }

            _removeListener$1(ownerDoc, "mouseup", onRelease);

            _removeListener$1(ownerDoc, "mousemove", onMove);
          }

          _removeScrollListener(target, updateScroll);

          enabled = false;
          InertiaPlugin && type !== "soft" && InertiaPlugin.untrack(scrollProxy || target, xyMode ? "x,y" : rotationMode ? "rotation" : "top,left");
          scrollProxy && scrollProxy.disable();

          _removeFromRenderQueue(render);

          self.isDragging = self.isPressed = isClicking = false;
          dragging && _dispatchEvent(self, "dragend", "onDragEnd");
          return self;
        };

        _this2.enabled = function (value, type) {
          return arguments.length ? value ? self.enable(type) : self.disable(type) : enabled;
        };

        _this2.kill = function () {
          self.isThrowing = false;
          self.tween && self.tween.kill();
          self.disable();
          gsap$1.set(triggers, {
            clearProps: "userSelect"
          });
          delete _lookup[target._gsDragID];
          return self;
        };

        if (~type.indexOf("scroll")) {
          scrollProxy = _this2.scrollProxy = new ScrollProxy(target, _extend({
            onKill: function onKill() {
              //ScrollProxy's onKill() gets called if/when the ScrollProxy senses that the user interacted with the scroll position manually (like using the scrollbar). IE9 doesn't fire the "mouseup" properly when users drag the scrollbar of an element, so this works around that issue.
              self.isPressed && onRelease(null);
            }
          }, vars)); //a bug in many Android devices' stock browser causes scrollTop to get forced back to 0 after it is altered via JS, so we set overflow to "hidden" on mobile/touch devices (they hide the scroll bar anyway). That works around the bug. (This bug is discussed at https://code.google.com/p/android/issues/detail?id=19625)

          target.style.overflowY = allowY && !_isTouchDevice ? "auto" : "hidden";
          target.style.overflowX = allowX && !_isTouchDevice ? "auto" : "hidden";
          target = scrollProxy.content;
        }

        if (rotationMode) {
          killProps.rotation = 1;
        } else {
          if (allowX) {
            killProps[xProp] = 1;
          }

          if (allowY) {
            killProps[yProp] = 1;
          }
        }

        gsCache.force3D = "force3D" in vars ? vars.force3D : true; //otherwise, normal dragging would be in 2D and then as soon as it's released and there's an inertia tween, it'd jump to 3D which can create an initial jump due to the work the browser must to do layerize it.

        _this2.enable();

        return _this2;
      }

      Draggable.register = function register(core) {
        gsap$1 = core;

        _initCore();
      };

      Draggable.create = function create(targets, vars) {
        _coreInitted$1 || _initCore(true);
        return _toArray$1(targets).map(function (target) {
          return new Draggable(target, vars);
        });
      };

      Draggable.get = function get(target) {
        return _lookup[(_toArray$1(target)[0] || {})._gsDragID];
      };

      Draggable.timeSinceDrag = function timeSinceDrag() {
        return (_getTime$1() - _lastDragTime) / 1000;
      };

      Draggable.hitTest = function hitTest(obj1, obj2, threshold) {
        if (obj1 === obj2) {
          return false;
        }

        var r1 = _parseRect(obj1),
            r2 = _parseRect(obj2),
            top = r1.top,
            left = r1.left,
            right = r1.right,
            bottom = r1.bottom,
            width = r1.width,
            height = r1.height,
            isOutside = r2.left > right || r2.right < left || r2.top > bottom || r2.bottom < top,
            overlap,
            area,
            isRatio;

        if (isOutside || !threshold) {
          return !isOutside;
        }

        isRatio = (threshold + "").indexOf("%") !== -1;
        threshold = parseFloat(threshold) || 0;
        overlap = {
          left: Math.max(left, r2.left),
          top: Math.max(top, r2.top)
        };
        overlap.width = Math.min(right, r2.right) - overlap.left;
        overlap.height = Math.min(bottom, r2.bottom) - overlap.top;

        if (overlap.width < 0 || overlap.height < 0) {
          return false;
        }

        if (isRatio) {
          threshold *= 0.01;
          area = overlap.width * overlap.height;
          return area >= width * height * threshold || area >= r2.width * r2.height * threshold;
        }

        return overlap.width > threshold && overlap.height > threshold;
      };

      return Draggable;
    }(EventDispatcher);

    _setDefaults$1(Draggable.prototype, {
      pointerX: 0,
      pointerY: 0,
      startX: 0,
      startY: 0,
      deltaX: 0,
      deltaY: 0,
      isDragging: false,
      isPressed: false
    });

    Draggable.zIndex = 1000;
    Draggable.version = "3.8.0";
    _getGSAP$1() && gsap$1.registerPlugin(Draggable);

    /*!
     * ScrollTrigger 3.8.0
     * https://greensock.com
     *
     * @license Copyright 2008-2021, GreenSock. All rights reserved.
     * Subject to the terms at https://greensock.com/standard-license or for
     * Club GreenSock members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
    */

    /* eslint-disable */
    var gsap,
        _coreInitted,
        _win,
        _doc,
        _docEl,
        _body,
        _root,
        _resizeDelay,
        _raf,
        _request,
        _toArray,
        _clamp,
        _time2,
        _syncInterval,
        _refreshing,
        _pointerIsDown,
        _transformProp,
        _i,
        _prevWidth,
        _prevHeight,
        _autoRefresh,
        _sort,
        _suppressOverwrites,
        _ignoreResize,
        _limitCallbacks,
        // if true, we'll only trigger callbacks if the active state toggles, so if you scroll immediately past both the start and end positions of a ScrollTrigger (thus inactive to inactive), neither its onEnter nor onLeave will be called. This is useful during startup.
    _startup = 1,
        _proxies = [],
        _scrollers = [],
        _getTime = Date.now,
        _time1 = _getTime(),
        _lastScrollTime = 0,
        _enabled = 1,
        _passThrough = function _passThrough(v) {
      return v;
    },
        _getTarget = function _getTarget(t) {
      return _toArray(t)[0] || (_isString(t) ? console.warn("Element not found:", t) : null);
    },
        _round = function _round(value) {
      return Math.round(value * 100000) / 100000 || 0;
    },
        _windowExists = function _windowExists() {
      return typeof window !== "undefined";
    },
        _getGSAP = function _getGSAP() {
      return gsap || _windowExists() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
    },
        _isViewport = function _isViewport(e) {
      return !!~_root.indexOf(e);
    },
        _getProxyProp = function _getProxyProp(element, property) {
      return ~_proxies.indexOf(element) && _proxies[_proxies.indexOf(element) + 1][property];
    },
        _getScrollFunc = function _getScrollFunc(element, _ref) {
      var s = _ref.s,
          sc = _ref.sc;

      // we store the scroller functions in a alternating sequenced Array like [element, verticalScrollFunc, horizontalScrollFunc, ...] so that we can minimize memory, maximize performance, and we also record the last position as a ".rec" property in order to revert to that after refreshing to ensure things don't shift around.
      var i = _scrollers.indexOf(element),
          offset = sc === _vertical.sc ? 1 : 2;

      !~i && (i = _scrollers.push(element) - 1);
      return _scrollers[i + offset] || (_scrollers[i + offset] = _getProxyProp(element, s) || (_isViewport(element) ? sc : function (value) {
        return arguments.length ? element[s] = value : element[s];
      }));
    },
        _getBoundsFunc = function _getBoundsFunc(element) {
      return _getProxyProp(element, "getBoundingClientRect") || (_isViewport(element) ? function () {
        _winOffsets.width = _win.innerWidth;
        _winOffsets.height = _win.innerHeight;
        return _winOffsets;
      } : function () {
        return _getBounds(element);
      });
    },
        _getSizeFunc = function _getSizeFunc(scroller, isViewport, _ref2) {
      var d = _ref2.d,
          d2 = _ref2.d2,
          a = _ref2.a;
      return (a = _getProxyProp(scroller, "getBoundingClientRect")) ? function () {
        return a()[d];
      } : function () {
        return (isViewport ? _win["inner" + d2] : scroller["client" + d2]) || 0;
      };
    },
        _getOffsetsFunc = function _getOffsetsFunc(element, isViewport) {
      return !isViewport || ~_proxies.indexOf(element) ? _getBoundsFunc(element) : function () {
        return _winOffsets;
      };
    },
        _maxScroll = function _maxScroll(element, _ref3) {
      var s = _ref3.s,
          d2 = _ref3.d2,
          d = _ref3.d,
          a = _ref3.a;
      return (s = "scroll" + d2) && (a = _getProxyProp(element, s)) ? a() - _getBoundsFunc(element)()[d] : _isViewport(element) ? (_body[s] || _docEl[s]) - (_win["inner" + d2] || _docEl["client" + d2] || _body["client" + d2]) : element[s] - element["offset" + d2];
    },
        _iterateAutoRefresh = function _iterateAutoRefresh(func, events) {
      for (var i = 0; i < _autoRefresh.length; i += 3) {
        (!events || ~events.indexOf(_autoRefresh[i + 1])) && func(_autoRefresh[i], _autoRefresh[i + 1], _autoRefresh[i + 2]);
      }
    },
        _isString = function _isString(value) {
      return typeof value === "string";
    },
        _isFunction = function _isFunction(value) {
      return typeof value === "function";
    },
        _isNumber = function _isNumber(value) {
      return typeof value === "number";
    },
        _isObject = function _isObject(value) {
      return typeof value === "object";
    },
        _callIfFunc = function _callIfFunc(value) {
      return _isFunction(value) && value();
    },
        _combineFunc = function _combineFunc(f1, f2) {
      return function () {
        var result1 = _callIfFunc(f1),
            result2 = _callIfFunc(f2);

        return function () {
          _callIfFunc(result1);

          _callIfFunc(result2);
        };
      };
    },
        _endAnimation = function _endAnimation(animation, reversed, pause) {
      return animation && animation.progress(reversed ? 0 : 1) && pause && animation.pause();
    },
        _callback = function _callback(self, func) {
      var result = func(self);
      result && result.totalTime && (self.callbackAnimation = result);
    },
        _abs = Math.abs,
        _scrollLeft = "scrollLeft",
        _scrollTop = "scrollTop",
        _left = "left",
        _top = "top",
        _right = "right",
        _bottom = "bottom",
        _width = "width",
        _height = "height",
        _Right = "Right",
        _Left = "Left",
        _Top = "Top",
        _Bottom = "Bottom",
        _padding = "padding",
        _margin = "margin",
        _Width = "Width",
        _Height = "Height",
        _px = "px",
        _horizontal = {
      s: _scrollLeft,
      p: _left,
      p2: _Left,
      os: _right,
      os2: _Right,
      d: _width,
      d2: _Width,
      a: "x",
      sc: function sc(value) {
        return arguments.length ? _win.scrollTo(value, _vertical.sc()) : _win.pageXOffset || _doc[_scrollLeft] || _docEl[_scrollLeft] || _body[_scrollLeft] || 0;
      }
    },
        _vertical = {
      s: _scrollTop,
      p: _top,
      p2: _Top,
      os: _bottom,
      os2: _Bottom,
      d: _height,
      d2: _Height,
      a: "y",
      op: _horizontal,
      sc: function sc(value) {
        return arguments.length ? _win.scrollTo(_horizontal.sc(), value) : _win.pageYOffset || _doc[_scrollTop] || _docEl[_scrollTop] || _body[_scrollTop] || 0;
      }
    },
        _getComputedStyle = function _getComputedStyle(element) {
      return _win.getComputedStyle(element);
    },
        _makePositionable = function _makePositionable(element) {
      // if the element already has position: absolute or fixed, leave that, otherwise make it position: relative
      var position = _getComputedStyle(element).position;

      element.style.position = position === "absolute" || position === "fixed" ? position : "relative";
    },
        _setDefaults = function _setDefaults(obj, defaults) {
      for (var p in defaults) {
        p in obj || (obj[p] = defaults[p]);
      }

      return obj;
    },
        _getBounds = function _getBounds(element, withoutTransforms) {
      var tween = withoutTransforms && _getComputedStyle(element)[_transformProp] !== "matrix(1, 0, 0, 1, 0, 0)" && gsap.to(element, {
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        rotation: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        skewX: 0,
        skewY: 0
      }).progress(1),
          bounds = element.getBoundingClientRect();
      tween && tween.progress(0).kill();
      return bounds;
    },
        _getSize = function _getSize(element, _ref4) {
      var d2 = _ref4.d2;
      return element["offset" + d2] || element["client" + d2] || 0;
    },
        _getLabelRatioArray = function _getLabelRatioArray(timeline) {
      var a = [],
          labels = timeline.labels,
          duration = timeline.duration(),
          p;

      for (p in labels) {
        a.push(labels[p] / duration);
      }

      return a;
    },
        _getClosestLabel = function _getClosestLabel(animation) {
      return function (value) {
        return gsap.utils.snap(_getLabelRatioArray(animation), value);
      };
    },
        _snapDirectional = function _snapDirectional(snapIncrementOrArray) {
      var snap = gsap.utils.snap(snapIncrementOrArray),
          a = Array.isArray(snapIncrementOrArray) && snapIncrementOrArray.slice(0).sort(function (a, b) {
        return a - b;
      });
      return a ? function (value, direction) {
        var i;

        if (!direction) {
          return snap(value);
        }

        if (direction > 0) {
          value -= 1e-4; // to avoid rounding errors. If we're too strict, it might snap forward, then immediately again, and again.

          for (i = 0; i < a.length; i++) {
            if (a[i] >= value) {
              return a[i];
            }
          }

          return a[i - 1];
        } else {
          i = a.length;
          value += 1e-4;

          while (i--) {
            if (a[i] <= value) {
              return a[i];
            }
          }
        }

        return a[0];
      } : function (value, direction) {
        var snapped = snap(value);
        return !direction || Math.abs(snapped - value) < 0.001 || snapped - value < 0 === direction < 0 ? snapped : snap(direction < 0 ? value - snapIncrementOrArray : value + snapIncrementOrArray);
      };
    },
        _getLabelAtDirection = function _getLabelAtDirection(timeline) {
      return function (value, st) {
        return _snapDirectional(_getLabelRatioArray(timeline))(value, st.direction);
      };
    },
        _multiListener = function _multiListener(func, element, types, callback) {
      return types.split(",").forEach(function (type) {
        return func(element, type, callback);
      });
    },
        _addListener = function _addListener(element, type, func) {
      return element.addEventListener(type, func, {
        passive: true
      });
    },
        _removeListener = function _removeListener(element, type, func) {
      return element.removeEventListener(type, func);
    },
        _markerDefaults = {
      startColor: "green",
      endColor: "red",
      indent: 0,
      fontSize: "16px",
      fontWeight: "normal"
    },
        _defaults = {
      toggleActions: "play",
      anticipatePin: 0
    },
        _keywords = {
      top: 0,
      left: 0,
      center: 0.5,
      bottom: 1,
      right: 1
    },
        _offsetToPx = function _offsetToPx(value, size) {
      if (_isString(value)) {
        var eqIndex = value.indexOf("="),
            relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;

        if (~eqIndex) {
          value.indexOf("%") > eqIndex && (relative *= size / 100);
          value = value.substr(0, eqIndex - 1);
        }

        value = relative + (value in _keywords ? _keywords[value] * size : ~value.indexOf("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0);
      }

      return value;
    },
        _createMarker = function _createMarker(type, name, container, direction, _ref5, offset, matchWidthEl, containerAnimation) {
      var startColor = _ref5.startColor,
          endColor = _ref5.endColor,
          fontSize = _ref5.fontSize,
          indent = _ref5.indent,
          fontWeight = _ref5.fontWeight;

      var e = _doc.createElement("div"),
          useFixedPosition = _isViewport(container) || _getProxyProp(container, "pinType") === "fixed",
          isScroller = type.indexOf("scroller") !== -1,
          parent = useFixedPosition ? _body : container,
          isStart = type.indexOf("start") !== -1,
          color = isStart ? startColor : endColor,
          css = "border-color:" + color + ";font-size:" + fontSize + ";color:" + color + ";font-weight:" + fontWeight + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";

      css += "position:" + ((isScroller || containerAnimation) && useFixedPosition ? "fixed;" : "absolute;");
      (isScroller || containerAnimation || !useFixedPosition) && (css += (direction === _vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
      matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
      e._isStart = isStart;
      e.setAttribute("class", "gsap-marker-" + type + (name ? " marker-" + name : ""));
      e.style.cssText = css;
      e.innerText = name || name === 0 ? type + "-" + name : type;
      parent.children[0] ? parent.insertBefore(e, parent.children[0]) : parent.appendChild(e);
      e._offset = e["offset" + direction.op.d2];

      _positionMarker(e, 0, direction, isStart);

      return e;
    },
        _positionMarker = function _positionMarker(marker, start, direction, flipped) {
      var vars = {
        display: "block"
      },
          side = direction[flipped ? "os2" : "p2"],
          oppositeSide = direction[flipped ? "p2" : "os2"];
      marker._isFlipped = flipped;
      vars[direction.a + "Percent"] = flipped ? -100 : 0;
      vars[direction.a] = flipped ? "1px" : 0;
      vars["border" + side + _Width] = 1;
      vars["border" + oppositeSide + _Width] = 0;
      vars[direction.p] = start + "px";
      gsap.set(marker, vars);
    },
        _triggers = [],
        _ids = {},
        _sync = function _sync() {
      return _getTime() - _lastScrollTime > 20 && _updateAll();
    },
        _onScroll = function _onScroll() {
      var time = _getTime();

      if (_lastScrollTime !== time) {
        _updateAll();

        _lastScrollTime || _dispatch("scrollStart");
        _lastScrollTime = time;
      } else if (!_request) {
        _request = _raf(_updateAll);
      }
    },
        _onResize = function _onResize() {
      return !_refreshing && !_ignoreResize && !_doc.fullscreenElement && _resizeDelay.restart(true);
    },
        // ignore resizes triggered by refresh()
    _listeners = {},
        _emptyArray = [],
        _media = [],
        _creatingMedia,
        // when ScrollTrigger.matchMedia() is called, we record the current media key here (like "(min-width: 800px)") so that we can assign it to everything that's created during that call. Then we can revert just those when necessary. In the ScrollTrigger's init() call, the _creatingMedia is recorded as a "media" property on the instance.
    _lastMediaTick,
        _onMediaChange = function _onMediaChange(e) {
      var tick = gsap.ticker.frame,
          matches = [],
          i = 0,
          index;

      if (_lastMediaTick !== tick || _startup) {
        _revertAll();

        for (; i < _media.length; i += 4) {
          index = _win.matchMedia(_media[i]).matches;

          if (index !== _media[i + 3]) {
            // note: some browsers fire the matchMedia event multiple times, like when going full screen, so we shouldn't call the function multiple times. Check to see if it's already matched.
            _media[i + 3] = index;
            index ? matches.push(i) : _revertAll(1, _media[i]) || _isFunction(_media[i + 2]) && _media[i + 2](); // Firefox doesn't update the "matches" property of the MediaQueryList object correctly - it only does so as it calls its change handler - so we must re-create a media query here to ensure it's accurate.
          }
        }

        _revertRecorded(); // in case killing/reverting any of the animations actually added inline styles back.


        for (i = 0; i < matches.length; i++) {
          index = matches[i];
          _creatingMedia = _media[index];
          _media[index + 2] = _media[index + 1](e);
        }

        _creatingMedia = 0;
        _coreInitted && _refreshAll(0, 1);
        _lastMediaTick = tick;

        _dispatch("matchMedia");
      }
    },
        _softRefresh = function _softRefresh() {
      return _removeListener(ScrollTrigger, "scrollEnd", _softRefresh) || _refreshAll(true);
    },
        _dispatch = function _dispatch(type) {
      return _listeners[type] && _listeners[type].map(function (f) {
        return f();
      }) || _emptyArray;
    },
        _savedStyles = [],
        // when ScrollTrigger.saveStyles() is called, the inline styles are recorded in this Array in a sequential format like [element, cssText, gsCache, media]. This keeps it very memory-efficient and fast to iterate through.
    _revertRecorded = function _revertRecorded(media) {
      for (var i = 0; i < _savedStyles.length; i += 5) {
        if (!media || _savedStyles[i + 4] === media) {
          _savedStyles[i].style.cssText = _savedStyles[i + 1];
          _savedStyles[i].getBBox && _savedStyles[i].setAttribute("transform", _savedStyles[i + 2] || "");
          _savedStyles[i + 3].uncache = 1;
        }
      }
    },
        _revertAll = function _revertAll(kill, media) {
      var trigger;

      for (_i = 0; _i < _triggers.length; _i++) {
        trigger = _triggers[_i];

        if (!media || trigger.media === media) {
          if (kill) {
            trigger.kill(1);
          } else {
            trigger.revert();
          }
        }
      }

      media && _revertRecorded(media);
      media || _dispatch("revert");
    },
        _clearScrollMemory = function _clearScrollMemory() {
      return _scrollers.forEach(function (obj) {
        return typeof obj === "function" && (obj.rec = 0);
      });
    },
        // zero-out all the recorded scroll positions. Don't use _triggers because if, for example, .matchMedia() is used to create some ScrollTriggers and then the user resizes and it removes ALL ScrollTriggers, and then go back to a size where there are ScrollTriggers, it would have kept the position(s) saved from the initial state.
    _refreshingAll,
        _refreshAll = function _refreshAll(force, skipRevert) {
      if (_lastScrollTime && !force) {
        _addListener(ScrollTrigger, "scrollEnd", _softRefresh);

        return;
      }

      _refreshingAll = true;

      var refreshInits = _dispatch("refreshInit");

      _sort && ScrollTrigger.sort();
      skipRevert || _revertAll();

      _triggers.forEach(function (t) {
        return t.refresh();
      }); // don't loop with _i because during a refresh() someone could call ScrollTrigger.update() which would iterate through _i resulting in a skip.


      refreshInits.forEach(function (result) {
        return result && result.render && result.render(-1);
      }); // if the onRefreshInit() returns an animation (typically a gsap.set()), revert it. This makes it easy to put things in a certain spot before refreshing for measurement purposes, and then put things back.

      _clearScrollMemory();

      _resizeDelay.pause();

      _refreshingAll = false;

      _dispatch("refresh");
    },
        _lastScroll = 0,
        _direction = 1,
        _updateAll = function _updateAll() {
      if (!_refreshingAll) {
        var l = _triggers.length,
            time = _getTime(),
            recordVelocity = time - _time1 >= 50,
            scroll = l && _triggers[0].scroll();

        _direction = _lastScroll > scroll ? -1 : 1;
        _lastScroll = scroll;

        if (recordVelocity) {
          if (_lastScrollTime && !_pointerIsDown && time - _lastScrollTime > 200) {
            _lastScrollTime = 0;

            _dispatch("scrollEnd");
          }

          _time2 = _time1;
          _time1 = time;
        }

        if (_direction < 0) {
          _i = l;

          while (_i-- > 0) {
            _triggers[_i] && _triggers[_i].update(0, recordVelocity);
          }

          _direction = 1;
        } else {
          for (_i = 0; _i < l; _i++) {
            _triggers[_i] && _triggers[_i].update(0, recordVelocity);
          }
        }

        _request = 0;
      }
    },
        _propNamesToCopy = [_left, _top, _bottom, _right, _margin + _Bottom, _margin + _Right, _margin + _Top, _margin + _Left, "display", "flexShrink", "float", "zIndex", "grid-column-start", "grid-column-end", "grid-row-start", "grid-row-end", "grid-area", "justify-self", "align-self", "place-self"],
        _stateProps = _propNamesToCopy.concat([_width, _height, "boxSizing", "max" + _Width, "max" + _Height, "position", _margin, _padding, _padding + _Top, _padding + _Right, _padding + _Bottom, _padding + _Left]),
        _swapPinOut = function _swapPinOut(pin, spacer, state) {
      _setState(state);

      var cache = pin._gsap;

      if (cache.spacerIsNative) {
        _setState(cache.spacerState);
      } else if (pin.parentNode === spacer) {
        var parent = spacer.parentNode;

        if (parent) {
          parent.insertBefore(pin, spacer);
          parent.removeChild(spacer);
        }
      }
    },
        _swapPinIn = function _swapPinIn(pin, spacer, cs, spacerState) {
      if (pin.parentNode !== spacer) {
        var i = _propNamesToCopy.length,
            spacerStyle = spacer.style,
            pinStyle = pin.style,
            p;

        while (i--) {
          p = _propNamesToCopy[i];
          spacerStyle[p] = cs[p];
        }

        spacerStyle.position = cs.position === "absolute" ? "absolute" : "relative";
        cs.display === "inline" && (spacerStyle.display = "inline-block");
        pinStyle[_bottom] = pinStyle[_right] = "auto";
        spacerStyle.overflow = "visible";
        spacerStyle.boxSizing = "border-box";
        spacerStyle[_width] = _getSize(pin, _horizontal) + _px;
        spacerStyle[_height] = _getSize(pin, _vertical) + _px;
        spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";

        _setState(spacerState);

        pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
        pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
        pinStyle[_padding] = cs[_padding];
        pin.parentNode.insertBefore(spacer, pin);
        spacer.appendChild(pin);
      }
    },
        _capsExp = /([A-Z])/g,
        _setState = function _setState(state) {
      if (state) {
        var style = state.t.style,
            l = state.length,
            i = 0,
            p,
            value;
        (state.t._gsap || gsap.core.getCache(state.t)).uncache = 1; // otherwise transforms may be off

        for (; i < l; i += 2) {
          value = state[i + 1];
          p = state[i];

          if (value) {
            style[p] = value;
          } else if (style[p]) {
            style.removeProperty(p.replace(_capsExp, "-$1").toLowerCase());
          }
        }
      }
    },
        _getState = function _getState(element) {
      // returns an Array with alternating values like [property, value, property, value] and a "t" property pointing to the target (element). Makes it fast and cheap.
      var l = _stateProps.length,
          style = element.style,
          state = [],
          i = 0;

      for (; i < l; i++) {
        state.push(_stateProps[i], style[_stateProps[i]]);
      }

      state.t = element;
      return state;
    },
        _copyState = function _copyState(state, override, omitOffsets) {
      var result = [],
          l = state.length,
          i = omitOffsets ? 8 : 0,
          // skip top, left, right, bottom if omitOffsets is true
      p;

      for (; i < l; i += 2) {
        p = state[i];
        result.push(p, p in override ? override[p] : state[i + 1]);
      }

      result.t = state.t;
      return result;
    },
        _winOffsets = {
      left: 0,
      top: 0
    },
        // // potential future feature (?) Allow users to calculate where a trigger hits (scroll position) like getScrollPosition("#id", "top bottom")
    // _getScrollPosition = (trigger, position, {scroller, containerAnimation, horizontal}) => {
    // 	scroller = _getTarget(scroller || _win);
    // 	let direction = horizontal ? _horizontal : _vertical,
    // 		isViewport = _isViewport(scroller);
    // 	_getSizeFunc(scroller, isViewport, direction);
    // 	return _parsePosition(position, _getTarget(trigger), _getSizeFunc(scroller, isViewport, direction)(), direction, _getScrollFunc(scroller, direction)(), 0, 0, 0, _getOffsetsFunc(scroller, isViewport)(), isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0, 0, containerAnimation ? containerAnimation.duration() : _maxScroll(scroller), containerAnimation);
    // },
    _parsePosition = function _parsePosition(value, trigger, scrollerSize, direction, scroll, marker, markerScroller, self, scrollerBounds, borderWidth, useFixedPosition, scrollerMax, containerAnimation) {
      _isFunction(value) && (value = value(self));

      if (_isString(value) && value.substr(0, 3) === "max") {
        value = scrollerMax + (value.charAt(4) === "=" ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
      }

      var time = containerAnimation ? containerAnimation.time() : 0,
          p1,
          p2,
          element;
      containerAnimation && containerAnimation.seek(0);

      if (!_isNumber(value)) {
        _isFunction(trigger) && (trigger = trigger(self));
        var offsets = value.split(" "),
            bounds,
            localOffset,
            globalOffset,
            display;
        element = _getTarget(trigger) || _body;
        bounds = _getBounds(element) || {};

        if ((!bounds || !bounds.left && !bounds.top) && _getComputedStyle(element).display === "none") {
          // if display is "none", it won't report getBoundingClientRect() properly
          display = element.style.display;
          element.style.display = "block";
          bounds = _getBounds(element);
          display ? element.style.display = display : element.style.removeProperty("display");
        }

        localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
        globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
        value = bounds[direction.p] - scrollerBounds[direction.p] - borderWidth + localOffset + scroll - globalOffset;
        markerScroller && _positionMarker(markerScroller, globalOffset, direction, scrollerSize - globalOffset < 20 || markerScroller._isStart && globalOffset > 20);
        scrollerSize -= scrollerSize - globalOffset; // adjust for the marker
      } else if (markerScroller) {
        _positionMarker(markerScroller, scrollerSize, direction, true);
      }

      if (marker) {
        var position = value + scrollerSize,
            isStart = marker._isStart;
        p1 = "scroll" + direction.d2;

        _positionMarker(marker, position, direction, isStart && position > 20 || !isStart && (useFixedPosition ? Math.max(_body[p1], _docEl[p1]) : marker.parentNode[p1]) <= position + 1);

        if (useFixedPosition) {
          scrollerBounds = _getBounds(markerScroller);
          useFixedPosition && (marker.style[direction.op.p] = scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
        }
      }

      if (containerAnimation && element) {
        p1 = _getBounds(element);
        containerAnimation.seek(scrollerMax);
        p2 = _getBounds(element);
        containerAnimation._caScrollDist = p1[direction.p] - p2[direction.p];
        value = value / containerAnimation._caScrollDist * scrollerMax;
      }

      containerAnimation && containerAnimation.seek(time);
      return containerAnimation ? value : Math.round(value);
    },
        _prefixExp = /(?:webkit|moz|length|cssText|inset)/i,
        _reparent = function _reparent(element, parent, top, left) {
      if (element.parentNode !== parent) {
        var style = element.style,
            p,
            cs;

        if (parent === _body) {
          element._stOrig = style.cssText; // record original inline styles so we can revert them later

          cs = _getComputedStyle(element);

          for (p in cs) {
            // must copy all relevant styles to ensure that nothing changes visually when we reparent to the <body>. Skip the vendor prefixed ones.
            if (!+p && !_prefixExp.test(p) && cs[p] && typeof style[p] === "string" && p !== "0") {
              style[p] = cs[p];
            }
          }

          style.top = top;
          style.left = left;
        } else {
          style.cssText = element._stOrig;
        }

        gsap.core.getCache(element).uncache = 1;
        parent.appendChild(element);
      }
    },
        // _mergeAnimations = animations => {
    // 	let tl = gsap.timeline({smoothChildTiming: true}).startTime(Math.min(...animations.map(a => a.globalTime(0))));
    // 	animations.forEach(a => {let time = a.totalTime(); tl.add(a); a.totalTime(time); });
    // 	tl.smoothChildTiming = false;
    // 	return tl;
    // },
    // returns a function that can be used to tween the scroll position in the direction provided, and when doing so it'll add a .tween property to the FUNCTION itself, and remove it when the tween completes or gets killed. This gives us a way to have multiple ScrollTriggers use a central function for any given scroller and see if there's a scroll tween running (which would affect if/how things get updated)
    _getTweenCreator = function _getTweenCreator(scroller, direction) {
      var getScroll = _getScrollFunc(scroller, direction),
          prop = "_scroll" + direction.p2,
          // add a tweenable property to the scroller that's a getter/setter function, like _scrollTop or _scrollLeft. This way, if someone does gsap.killTweensOf(scroller) it'll kill the scroll tween.
      lastScroll1,
          lastScroll2,
          getTween = function getTween(scrollTo, vars, initialValue, change1, change2) {
        var tween = getTween.tween,
            onComplete = vars.onComplete,
            modifiers = {};
        tween && tween.kill();
        lastScroll1 = Math.round(initialValue);
        vars[prop] = scrollTo;
        vars.modifiers = modifiers;

        modifiers[prop] = function (value) {
          value = _round(getScroll()); // round because in some [very uncommon] Windows environments, it can get reported with decimals even though it was set without.

          if (value !== lastScroll1 && value !== lastScroll2 && Math.abs(value - lastScroll1) > 2) {
            // if the user scrolls, kill the tween. iOS Safari intermittently misreports the scroll position, it may be the most recently-set one or the one before that! When Safari is zoomed (CMD-+), it often misreports as 1 pixel off too! So if we set the scroll position to 125, for example, it'll actually report it as 124.
            tween.kill();
            getTween.tween = 0;
          } else {
            value = initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio;
          }

          lastScroll2 = lastScroll1;
          return lastScroll1 = _round(value);
        };

        vars.onComplete = function () {
          getTween.tween = 0;
          onComplete && onComplete.call(tween);
        };

        tween = getTween.tween = gsap.to(scroller, vars);
        return tween;
      };

      scroller[prop] = getScroll;
      scroller.addEventListener("wheel", function () {
        return getTween.tween && getTween.tween.kill() && (getTween.tween = 0);
      }, {
        passive: true
      }); // Windows machines handle mousewheel scrolling in chunks (like "3 lines per scroll") meaning the typical strategy for cancelling the scroll isn't as sensitive. It's much more likely to match one of the previous 2 scroll event positions. So we kill any snapping as soon as there's a wheel event.

      return getTween;
    };

    _horizontal.op = _vertical;
    var ScrollTrigger = /*#__PURE__*/function () {
      function ScrollTrigger(vars, animation) {
        _coreInitted || ScrollTrigger.register(gsap) || console.warn("Please gsap.registerPlugin(ScrollTrigger)");
        this.init(vars, animation);
      }

      var _proto = ScrollTrigger.prototype;

      _proto.init = function init(vars, animation) {
        this.progress = this.start = 0;
        this.vars && this.kill(1); // in case it's being initted again

        if (!_enabled) {
          this.update = this.refresh = this.kill = _passThrough;
          return;
        }

        vars = _setDefaults(_isString(vars) || _isNumber(vars) || vars.nodeType ? {
          trigger: vars
        } : vars, _defaults);

        var _vars = vars,
            onUpdate = _vars.onUpdate,
            toggleClass = _vars.toggleClass,
            id = _vars.id,
            onToggle = _vars.onToggle,
            onRefresh = _vars.onRefresh,
            scrub = _vars.scrub,
            trigger = _vars.trigger,
            pin = _vars.pin,
            pinSpacing = _vars.pinSpacing,
            invalidateOnRefresh = _vars.invalidateOnRefresh,
            anticipatePin = _vars.anticipatePin,
            onScrubComplete = _vars.onScrubComplete,
            onSnapComplete = _vars.onSnapComplete,
            once = _vars.once,
            snap = _vars.snap,
            pinReparent = _vars.pinReparent,
            pinSpacer = _vars.pinSpacer,
            containerAnimation = _vars.containerAnimation,
            fastScrollEnd = _vars.fastScrollEnd,
            preventOverlaps = _vars.preventOverlaps,
            direction = vars.horizontal || vars.containerAnimation && vars.horizontal !== false ? _horizontal : _vertical,
            isToggle = !scrub && scrub !== 0,
            scroller = _getTarget(vars.scroller || _win),
            scrollerCache = gsap.core.getCache(scroller),
            isViewport = _isViewport(scroller),
            useFixedPosition = ("pinType" in vars ? vars.pinType : _getProxyProp(scroller, "pinType") || isViewport && "fixed") === "fixed",
            callbacks = [vars.onEnter, vars.onLeave, vars.onEnterBack, vars.onLeaveBack],
            toggleActions = isToggle && vars.toggleActions.split(" "),
            markers = "markers" in vars ? vars.markers : _defaults.markers,
            borderWidth = isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0,
            self = this,
            onRefreshInit = vars.onRefreshInit && function () {
          return vars.onRefreshInit(self);
        },
            getScrollerSize = _getSizeFunc(scroller, isViewport, direction),
            getScrollerOffsets = _getOffsetsFunc(scroller, isViewport),
            lastSnap = 0,
            scrollFunc = _getScrollFunc(scroller, direction),
            tweenTo,
            pinCache,
            snapFunc,
            scroll1,
            scroll2,
            start,
            end,
            markerStart,
            markerEnd,
            markerStartTrigger,
            markerEndTrigger,
            markerVars,
            change,
            pinOriginalState,
            pinActiveState,
            pinState,
            spacer,
            offset,
            pinGetter,
            pinSetter,
            pinStart,
            pinChange,
            spacingStart,
            spacerState,
            markerStartSetter,
            markerEndSetter,
            cs,
            snap1,
            snap2,
            scrubTween,
            scrubSmooth,
            snapDurClamp,
            snapDelayedCall,
            prevProgress,
            prevScroll,
            prevAnimProgress,
            caMarkerSetter;

        self.media = _creatingMedia;
        anticipatePin *= 45;
        self.scroller = scroller;
        self.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;
        scroll1 = scrollFunc();
        self.vars = vars;
        animation = animation || vars.animation;
        "refreshPriority" in vars && (_sort = 1);
        scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
          top: _getTweenCreator(scroller, _vertical),
          left: _getTweenCreator(scroller, _horizontal)
        };
        self.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];

        if (animation) {
          animation.vars.lazy = false;
          animation._initted || animation.vars.immediateRender !== false && vars.immediateRender !== false && animation.render(0, true, true);
          self.animation = animation.pause();
          animation.scrollTrigger = self;
          scrubSmooth = _isNumber(scrub) && scrub;
          scrubSmooth && (scrubTween = gsap.to(animation, {
            ease: "power3",
            duration: scrubSmooth,
            onComplete: function onComplete() {
              return onScrubComplete && onScrubComplete(self);
            }
          }));
          snap1 = 0;
          id || (id = animation.vars.id);
        }

        _triggers.push(self);

        if (snap) {
          if (!_isObject(snap) || snap.push) {
            snap = {
              snapTo: snap
            };
          }

          "scrollBehavior" in _body.style && gsap.set(isViewport ? [_body, _docEl] : scroller, {
            scrollBehavior: "auto"
          }); // smooth scrolling doesn't work with snap.

          snapFunc = _isFunction(snap.snapTo) ? snap.snapTo : snap.snapTo === "labels" ? _getClosestLabel(animation) : snap.snapTo === "labelsDirectional" ? _getLabelAtDirection(animation) : snap.directional !== false ? function (value, st) {
            return _snapDirectional(snap.snapTo)(value, st.direction);
          } : gsap.utils.snap(snap.snapTo);
          snapDurClamp = snap.duration || {
            min: 0.1,
            max: 2
          };
          snapDurClamp = _isObject(snapDurClamp) ? _clamp(snapDurClamp.min, snapDurClamp.max) : _clamp(snapDurClamp, snapDurClamp);
          snapDelayedCall = gsap.delayedCall(snap.delay || scrubSmooth / 2 || 0.1, function () {
            if (Math.abs(self.getVelocity()) < 10 && !_pointerIsDown && lastSnap !== scrollFunc()) {
              var totalProgress = animation && !isToggle ? animation.totalProgress() : self.progress,
                  velocity = (totalProgress - snap2) / (_getTime() - _time2) * 1000 || 0,
                  change1 = gsap.utils.clamp(-self.progress, 1 - self.progress, _abs(velocity / 2) * velocity / 0.185),
                  naturalEnd = self.progress + (snap.inertia === false ? 0 : change1),
                  endValue = _clamp(0, 1, snapFunc(naturalEnd, self)),
                  scroll = scrollFunc(),
                  endScroll = Math.round(start + endValue * change),
                  _snap = snap,
                  onStart = _snap.onStart,
                  _onInterrupt = _snap.onInterrupt,
                  _onComplete = _snap.onComplete,
                  tween = tweenTo.tween;

              if (scroll <= end && scroll >= start && endScroll !== scroll) {
                if (tween && !tween._initted && tween.data <= _abs(endScroll - scroll)) {
                  // there's an overlapping snap! So we must figure out which one is closer and let that tween live.
                  return;
                }

                if (snap.inertia === false) {
                  change1 = endValue - self.progress;
                }

                tweenTo(endScroll, {
                  duration: snapDurClamp(_abs(Math.max(_abs(naturalEnd - totalProgress), _abs(endValue - totalProgress)) * 0.185 / velocity / 0.05 || 0)),
                  ease: snap.ease || "power3",
                  data: _abs(endScroll - scroll),
                  // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
                  onInterrupt: function onInterrupt() {
                    return snapDelayedCall.restart(true) && _onInterrupt && _onInterrupt(self);
                  },
                  onComplete: function onComplete() {
                    lastSnap = scrollFunc();
                    snap1 = snap2 = animation && !isToggle ? animation.totalProgress() : self.progress;
                    onSnapComplete && onSnapComplete(self);
                    _onComplete && _onComplete(self);
                  }
                }, scroll, change1 * change, endScroll - scroll - change1 * change);
                onStart && onStart(self, tweenTo.tween);
              }
            } else if (self.isActive) {
              snapDelayedCall.restart(true);
            }
          }).pause();
        }

        id && (_ids[id] = self);
        trigger = self.trigger = _getTarget(trigger || pin);
        pin = pin === true ? trigger : _getTarget(pin);
        _isString(toggleClass) && (toggleClass = {
          targets: trigger,
          className: toggleClass
        });

        if (pin) {
          pinSpacing === false || pinSpacing === _margin || (pinSpacing = !pinSpacing && _getComputedStyle(pin.parentNode).display === "flex" ? false : _padding); // if the parent is display: flex, don't apply pinSpacing by default.

          self.pin = pin;
          vars.force3D !== false && gsap.set(pin, {
            force3D: true
          });
          pinCache = gsap.core.getCache(pin);

          if (!pinCache.spacer) {
            // record the spacer and pinOriginalState on the cache in case someone tries pinning the same element with MULTIPLE ScrollTriggers - we don't want to have multiple spacers or record the "original" pin state after it has already been affected by another ScrollTrigger.
            if (pinSpacer) {
              pinSpacer = _getTarget(pinSpacer);
              pinSpacer && !pinSpacer.nodeType && (pinSpacer = pinSpacer.current || pinSpacer.nativeElement); // for React & Angular

              pinCache.spacerIsNative = !!pinSpacer;
              pinSpacer && (pinCache.spacerState = _getState(pinSpacer));
            }

            pinCache.spacer = spacer = pinSpacer || _doc.createElement("div");
            spacer.classList.add("pin-spacer");
            id && spacer.classList.add("pin-spacer-" + id);
            pinCache.pinState = pinOriginalState = _getState(pin);
          } else {
            pinOriginalState = pinCache.pinState;
          }

          self.spacer = spacer = pinCache.spacer;
          cs = _getComputedStyle(pin);
          spacingStart = cs[pinSpacing + direction.os2];
          pinGetter = gsap.getProperty(pin);
          pinSetter = gsap.quickSetter(pin, direction.a, _px); // pin.firstChild && !_maxScroll(pin, direction) && (pin.style.overflow = "hidden"); // protects from collapsing margins, but can have unintended consequences as demonstrated here: https://codepen.io/GreenSock/pen/1e42c7a73bfa409d2cf1e184e7a4248d so it was removed in favor of just telling people to set up their CSS to avoid the collapsing margins (overflow: hidden | auto is just one option. Another is border-top: 1px solid transparent).

          _swapPinIn(pin, spacer, cs);

          pinState = _getState(pin);
        }

        if (markers) {
          markerVars = _isObject(markers) ? _setDefaults(markers, _markerDefaults) : _markerDefaults;
          markerStartTrigger = _createMarker("scroller-start", id, scroller, direction, markerVars, 0);
          markerEndTrigger = _createMarker("scroller-end", id, scroller, direction, markerVars, 0, markerStartTrigger);
          offset = markerStartTrigger["offset" + direction.op.d2];
          markerStart = _createMarker("start", id, scroller, direction, markerVars, offset, 0, containerAnimation);
          markerEnd = _createMarker("end", id, scroller, direction, markerVars, offset, 0, containerAnimation);
          containerAnimation && (caMarkerSetter = gsap.quickSetter([markerStart, markerEnd], direction.a, _px));

          if (!useFixedPosition && !(_proxies.length && _getProxyProp(scroller, "fixedMarkers") === true)) {
            _makePositionable(isViewport ? _body : scroller);

            gsap.set([markerStartTrigger, markerEndTrigger], {
              force3D: true
            });
            markerStartSetter = gsap.quickSetter(markerStartTrigger, direction.a, _px);
            markerEndSetter = gsap.quickSetter(markerEndTrigger, direction.a, _px);
          }
        }

        if (containerAnimation) {
          var oldOnUpdate = containerAnimation.vars.onUpdate,
              oldParams = containerAnimation.vars.onUpdateParams;
          containerAnimation.eventCallback("onUpdate", function () {
            self.update(0, 0, 1);
            oldOnUpdate && oldOnUpdate.apply(oldParams || []);
          });
        }

        self.previous = function () {
          return _triggers[_triggers.indexOf(self) - 1];
        };

        self.next = function () {
          return _triggers[_triggers.indexOf(self) + 1];
        };

        self.revert = function (revert) {
          var r = revert !== false || !self.enabled,
              prevRefreshing = _refreshing;

          if (r !== self.isReverted) {
            if (r) {
              self.scroll.rec || (self.scroll.rec = scrollFunc());
              prevScroll = Math.max(scrollFunc(), self.scroll.rec || 0); // record the scroll so we can revert later (repositioning/pinning things can affect scroll position). In the static refresh() method, we first record all the scroll positions as a reference.

              prevProgress = self.progress;
              prevAnimProgress = animation && animation.progress();
            }

            markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function (m) {
              return m.style.display = r ? "none" : "block";
            });
            r && (_refreshing = 1);
            self.update(r); // make sure the pin is back in its original position so that all the measurements are correct.

            _refreshing = prevRefreshing;
            pin && (r ? _swapPinOut(pin, spacer, pinOriginalState) : (!pinReparent || !self.isActive) && _swapPinIn(pin, spacer, _getComputedStyle(pin), spacerState));
            self.isReverted = r;
          }
        };

        self.refresh = function (soft, force) {
          if ((_refreshing || !self.enabled) && !force) {
            return;
          }

          if (pin && soft && _lastScrollTime) {
            _addListener(ScrollTrigger, "scrollEnd", _softRefresh);

            return;
          }

          _refreshing = 1;
          scrubTween && scrubTween.pause();
          invalidateOnRefresh && animation && animation.progress(0).invalidate();
          self.isReverted || self.revert();

          var size = getScrollerSize(),
              scrollerBounds = getScrollerOffsets(),
              max = containerAnimation ? containerAnimation.duration() : _maxScroll(scroller, direction),
              offset = 0,
              otherPinOffset = 0,
              parsedEnd = vars.end,
              parsedEndTrigger = vars.endTrigger || trigger,
              parsedStart = vars.start || (vars.start === 0 || !trigger ? 0 : pin ? "0 0" : "0 100%"),
              pinnedContainer = vars.pinnedContainer && _getTarget(vars.pinnedContainer),
              triggerIndex = trigger && Math.max(0, _triggers.indexOf(self)) || 0,
              i = triggerIndex,
              cs,
              bounds,
              scroll,
              isVertical,
              override,
              curTrigger,
              curPin,
              oppositeScroll,
              initted,
              revertedPins;

          while (i--) {
            // user might try to pin the same element more than once, so we must find any prior triggers with the same pin, revert them, and determine how long they're pinning so that we can offset things appropriately. Make sure we revert from last to first so that things "rewind" properly.
            curTrigger = _triggers[i];
            curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = 1); // if it's a timeline-based trigger that hasn't been fully initialized yet because it's waiting for 1 tick, just force the refresh() here, otherwise if it contains a pin that's supposed to affect other ScrollTriggers further down the page, they won't be adjusted properly.

            curPin = curTrigger.pin;

            if (curPin && (curPin === trigger || curPin === pin) && !curTrigger.isReverted) {
              revertedPins || (revertedPins = []);
              revertedPins.unshift(curTrigger); // we'll revert from first to last to make sure things reach their end state properly

              curTrigger.revert();
            }
          }

          _isFunction(parsedStart) && (parsedStart = parsedStart(self));
          start = _parsePosition(parsedStart, trigger, size, direction, scrollFunc(), markerStart, markerStartTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation) || (pin ? -0.001 : 0);
          _isFunction(parsedEnd) && (parsedEnd = parsedEnd(self));

          if (_isString(parsedEnd) && !parsedEnd.indexOf("+=")) {
            if (~parsedEnd.indexOf(" ")) {
              parsedEnd = (_isString(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd;
            } else {
              offset = _offsetToPx(parsedEnd.substr(2), size);
              parsedEnd = _isString(parsedStart) ? parsedStart : start + offset; // _parsePosition won't factor in the offset if the start is a number, so do it here.

              parsedEndTrigger = trigger;
            }
          }

          end = Math.max(start, _parsePosition(parsedEnd || (parsedEndTrigger ? "100% 0" : max), parsedEndTrigger, size, direction, scrollFunc() + offset, markerEnd, markerEndTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation)) || -0.001;
          change = end - start || (start -= 0.01) && 0.001;
          offset = 0;
          i = triggerIndex;

          while (i--) {
            curTrigger = _triggers[i];
            curPin = curTrigger.pin;

            if (curPin && curTrigger.start - curTrigger._pinPush < start && !containerAnimation) {
              cs = curTrigger.end - curTrigger.start;
              (curPin === trigger || curPin === pinnedContainer) && !_isNumber(parsedStart) && (offset += cs); // numeric start values shouldn't be offset at all - treat them as absolute

              curPin === pin && (otherPinOffset += cs);
            }
          }

          start += offset;
          end += offset;
          self._pinPush = otherPinOffset;

          if (markerStart && offset) {
            // offset the markers if necessary
            cs = {};
            cs[direction.a] = "+=" + offset;
            pinnedContainer && (cs[direction.p] = "-=" + scrollFunc());
            gsap.set([markerStart, markerEnd], cs);
          }

          if (pin) {
            cs = _getComputedStyle(pin);
            isVertical = direction === _vertical;
            scroll = scrollFunc(); // recalculate because the triggers can affect the scroll

            pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;
            !max && end > 1 && ((isViewport ? _body : scroller).style["overflow-" + direction.a] = "scroll"); // makes sure the scroller has a scrollbar, otherwise if something has width: 100%, for example, it would be too big (exclude the scrollbar). See https://greensock.com/forums/topic/25182-scrolltrigger-width-of-page-increase-where-markers-are-set-to-false/

            _swapPinIn(pin, spacer, cs);

            pinState = _getState(pin); // transforms will interfere with the top/left/right/bottom placement, so remove them temporarily. getBoundingClientRect() factors in transforms.

            bounds = _getBounds(pin, true);
            oppositeScroll = useFixedPosition && _getScrollFunc(scroller, isVertical ? _horizontal : _vertical)();

            if (pinSpacing) {
              spacerState = [pinSpacing + direction.os2, change + otherPinOffset + _px];
              spacerState.t = spacer;
              i = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
              i && spacerState.push(direction.d, i + _px); // for box-sizing: border-box (must include padding).

              _setState(spacerState);

              useFixedPosition && scrollFunc(prevScroll);
            }

            if (useFixedPosition) {
              override = {
                top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
                left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
                boxSizing: "border-box",
                position: "fixed"
              };
              override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
              override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
              override[_margin] = override[_margin + _Top] = override[_margin + _Right] = override[_margin + _Bottom] = override[_margin + _Left] = "0";
              override[_padding] = cs[_padding];
              override[_padding + _Top] = cs[_padding + _Top];
              override[_padding + _Right] = cs[_padding + _Right];
              override[_padding + _Bottom] = cs[_padding + _Bottom];
              override[_padding + _Left] = cs[_padding + _Left];
              pinActiveState = _copyState(pinOriginalState, override, pinReparent);
            }

            if (animation) {
              // the animation might be affecting the transform, so we must jump to the end, check the value, and compensate accordingly. Otherwise, when it becomes unpinned, the pinSetter() will get set to a value that doesn't include whatever the animation did.
              initted = animation._initted; // if not, we must invalidate() after this step, otherwise it could lock in starting values prematurely.

              _suppressOverwrites(1);

              animation.render(animation.duration(), true, true);
              pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
              change !== pinChange && pinActiveState.splice(pinActiveState.length - 2, 2); // transform is the last property/value set in the state Array. Since the animation is controlling that, we should omit it.

              animation.render(0, true, true);
              initted || animation.invalidate();

              _suppressOverwrites(0);
            } else {
              pinChange = change;
            }
          } else if (trigger && scrollFunc() && !containerAnimation) {
            // it may be INSIDE a pinned element, so walk up the tree and look for any elements with _pinOffset to compensate because anything with pinSpacing that's already scrolled would throw off the measurements in getBoundingClientRect()
            bounds = trigger.parentNode;

            while (bounds && bounds !== _body) {
              if (bounds._pinOffset) {
                start -= bounds._pinOffset;
                end -= bounds._pinOffset;
              }

              bounds = bounds.parentNode;
            }
          }

          revertedPins && revertedPins.forEach(function (t) {
            return t.revert(false);
          });
          self.start = start;
          self.end = end;
          scroll1 = scroll2 = scrollFunc(); // reset velocity

          if (!containerAnimation) {
            scroll1 < prevScroll && scrollFunc(prevScroll);
            self.scroll.rec = 0;
          }

          self.revert(false);
          _refreshing = 0;
          animation && isToggle && animation._initted && animation.progress() !== prevAnimProgress && animation.progress(prevAnimProgress, true).render(animation.time(), true, true); // must force a re-render because if saveStyles() was used on the target(s), the styles could have been wiped out during the refresh().

          if (prevProgress !== self.progress) {
            // ensures that the direction is set properly (when refreshing, progress is set back to 0 initially, then back again to wherever it needs to be) and that callbacks are triggered.
            animation && !isToggle && animation.totalProgress(prevProgress, true); // to avoid issues where animation callbacks like onStart aren't triggered.

            self.progress = prevProgress;
            self.update(0, 0, 1);
          }

          pin && pinSpacing && (spacer._pinOffset = Math.round(self.progress * pinChange));
          onRefresh && onRefresh(self);
        };

        self.getVelocity = function () {
          return (scrollFunc() - scroll2) / (_getTime() - _time2) * 1000 || 0;
        };

        self.endAnimation = function () {
          _endAnimation(self.callbackAnimation);

          if (animation) {
            scrubTween ? scrubTween.progress(1) : !animation.paused() ? _endAnimation(animation, animation.reversed()) : isToggle || _endAnimation(animation, self.direction < 0, 1);
          }
        };

        self.getTrailing = function (name) {
          var i = _triggers.indexOf(self),
              a = self.direction > 0 ? _triggers.slice(0, i).reverse() : _triggers.slice(i + 1);

          return _isString(name) ? a.filter(function (t) {
            return t.vars.preventOverlaps === name;
          }) : a;
        };

        self.update = function (reset, recordVelocity, forceFake) {
          if (containerAnimation && !forceFake && !reset) {
            return;
          }

          var scroll = self.scroll(),
              p = reset ? 0 : (scroll - start) / change,
              clipped = p < 0 ? 0 : p > 1 ? 1 : p || 0,
              prevProgress = self.progress,
              isActive,
              wasActive,
              toggleState,
              action,
              stateChanged,
              toggled,
              isAtMax,
              isTakingAction;

          if (recordVelocity) {
            scroll2 = scroll1;
            scroll1 = containerAnimation ? scrollFunc() : scroll;

            if (snap) {
              snap2 = snap1;
              snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
            }
          } // anticipate the pinning a few ticks ahead of time based on velocity to avoid a visual glitch due to the fact that most browsers do scrolling on a separate thread (not synced with requestAnimationFrame).


          anticipatePin && !clipped && pin && !_refreshing && !_startup && _lastScrollTime && start < scroll + (scroll - scroll2) / (_getTime() - _time2) * anticipatePin && (clipped = 0.0001);

          if (clipped !== prevProgress && self.enabled) {
            isActive = self.isActive = !!clipped && clipped < 1;
            wasActive = !!prevProgress && prevProgress < 1;
            toggled = isActive !== wasActive;
            stateChanged = toggled || !!clipped !== !!prevProgress; // could go from start all the way to end, thus it didn't toggle but it did change state in a sense (may need to fire a callback)

            self.direction = clipped > prevProgress ? 1 : -1;
            self.progress = clipped;

            if (stateChanged && !_refreshing) {
              toggleState = clipped && !prevProgress ? 0 : clipped === 1 ? 1 : prevProgress === 1 ? 2 : 3; // 0 = enter, 1 = leave, 2 = enterBack, 3 = leaveBack (we prioritize the FIRST encounter, thus if you scroll really fast past the onEnter and onLeave in one tick, it'd prioritize onEnter.

              if (isToggle) {
                action = !toggled && toggleActions[toggleState + 1] !== "none" && toggleActions[toggleState + 1] || toggleActions[toggleState]; // if it didn't toggle, that means it shot right past and since we prioritize the "enter" action, we should switch to the "leave" in this case (but only if one is defined)

                isTakingAction = animation && (action === "complete" || action === "reset" || action in animation);
              }
            }

            preventOverlaps && toggled && (isTakingAction || scrub || !animation) && (_isFunction(preventOverlaps) ? preventOverlaps(self) : self.getTrailing(preventOverlaps).forEach(function (t) {
              return t.endAnimation();
            }));

            if (!isToggle) {
              if (scrubTween && !_refreshing && !_startup) {
                scrubTween.vars.totalProgress = clipped;
                scrubTween.invalidate().restart();
              } else if (animation) {
                animation.totalProgress(clipped, !!_refreshing);
              }
            }

            if (pin) {
              reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);

              if (!useFixedPosition) {
                pinSetter(pinStart + pinChange * clipped);
              } else if (stateChanged) {
                isAtMax = !reset && clipped > prevProgress && end + 1 > scroll && scroll + 1 >= _maxScroll(scroller, direction); // if it's at the VERY end of the page, don't switch away from position: fixed because it's pointless and it could cause a brief flash when the user scrolls back up (when it gets pinned again)

                if (pinReparent) {
                  if (!reset && (isActive || isAtMax)) {
                    var bounds = _getBounds(pin, true),
                        _offset = scroll - start;

                    _reparent(pin, _body, bounds.top + (direction === _vertical ? _offset : 0) + _px, bounds.left + (direction === _vertical ? 0 : _offset) + _px);
                  } else {
                    _reparent(pin, spacer);
                  }
                }

                _setState(isActive || isAtMax ? pinActiveState : pinState);

                pinChange !== change && clipped < 1 && isActive || pinSetter(pinStart + (clipped === 1 && !isAtMax ? pinChange : 0));
              }
            }

            snap && !tweenTo.tween && !_refreshing && !_startup && snapDelayedCall.restart(true);
            toggleClass && (toggled || once && clipped && (clipped < 1 || !_limitCallbacks)) && _toArray(toggleClass.targets).forEach(function (el) {
              return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
            }); // classes could affect positioning, so do it even if reset or refreshing is true.

            onUpdate && !isToggle && !reset && onUpdate(self);

            if (stateChanged && !_refreshing) {
              if (isToggle) {
                if (isTakingAction) {
                  if (action === "complete") {
                    animation.pause().totalProgress(1);
                  } else if (action === "reset") {
                    animation.restart(true).pause();
                  } else if (action === "restart") {
                    animation.restart(true);
                  } else {
                    animation[action]();
                  }
                }

                onUpdate && onUpdate(self);
              }

              if (toggled || !_limitCallbacks) {
                // on startup, the page could be scrolled and we don't want to fire callbacks that didn't toggle. For example onEnter shouldn't fire if the ScrollTrigger isn't actually entered.
                onToggle && toggled && _callback(self, onToggle);
                callbacks[toggleState] && _callback(self, callbacks[toggleState]);
                once && (clipped === 1 ? self.kill(false, 1) : callbacks[toggleState] = 0); // a callback shouldn't be called again if once is true.

                if (!toggled) {
                  // it's possible to go completely past, like from before the start to after the end (or vice-versa) in which case BOTH callbacks should be fired in that order
                  toggleState = clipped === 1 ? 1 : 3;
                  callbacks[toggleState] && _callback(self, callbacks[toggleState]);
                }
              }

              if (fastScrollEnd && !isActive && Math.abs(self.getVelocity()) > (_isNumber(fastScrollEnd) ? fastScrollEnd : 2500)) {
                _endAnimation(self.callbackAnimation);

                scrubTween ? scrubTween.progress(1) : _endAnimation(animation, !clipped, 1);
              }
            } else if (isToggle && onUpdate && !_refreshing) {
              onUpdate(self);
            }
          } // update absolutely-positioned markers (only if the scroller isn't the viewport)


          if (markerEndSetter) {
            var n = containerAnimation ? scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0) : scroll;
            markerStartSetter(n + (markerStartTrigger._isFlipped ? 1 : 0));
            markerEndSetter(n);
          }

          caMarkerSetter && caMarkerSetter(-scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0));
        };

        self.enable = function (reset, refresh) {
          if (!self.enabled) {
            self.enabled = true;

            _addListener(scroller, "resize", _onResize);

            _addListener(scroller, "scroll", _onScroll);

            onRefreshInit && _addListener(ScrollTrigger, "refreshInit", onRefreshInit);

            if (reset !== false) {
              self.progress = prevProgress = 0;
              scroll1 = scroll2 = lastSnap = scrollFunc();
            }

            refresh !== false && self.refresh();
          }
        };

        self.getTween = function (snap) {
          return snap && tweenTo ? tweenTo.tween : scrubTween;
        };

        self.disable = function (reset, allowAnimation) {
          if (self.enabled) {
            reset !== false && self.revert();
            self.enabled = self.isActive = false;
            allowAnimation || scrubTween && scrubTween.pause();
            prevScroll = 0;
            pinCache && (pinCache.uncache = 1);
            onRefreshInit && _removeListener(ScrollTrigger, "refreshInit", onRefreshInit);

            if (snapDelayedCall) {
              snapDelayedCall.pause();
              tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
            }

            if (!isViewport) {
              var i = _triggers.length;

              while (i--) {
                if (_triggers[i].scroller === scroller && _triggers[i] !== self) {
                  return; //don't remove the listeners if there are still other triggers referencing it.
                }
              }

              _removeListener(scroller, "resize", _onResize);

              _removeListener(scroller, "scroll", _onScroll);
            }
          }
        };

        self.kill = function (revert, allowAnimation) {
          self.disable(revert, allowAnimation);
          scrubTween && scrubTween.kill();
          id && delete _ids[id];

          var i = _triggers.indexOf(self);

          _triggers.splice(i, 1);

          i === _i && _direction > 0 && _i--; // if we're in the middle of a refresh() or update(), splicing would cause skips in the index, so adjust...
          // if no other ScrollTrigger instances of the same scroller are found, wipe out any recorded scroll position. Otherwise, in a single page application, for example, it could maintain scroll position when it really shouldn't.

          i = 0;

          _triggers.forEach(function (t) {
            return t.scroller === self.scroller && (i = 1);
          });

          i || (self.scroll.rec = 0);

          if (animation) {
            animation.scrollTrigger = null;
            revert && animation.render(-1);
            allowAnimation || animation.kill();
          }

          markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function (m) {
            return m.parentNode && m.parentNode.removeChild(m);
          });

          if (pin) {
            pinCache && (pinCache.uncache = 1);
            i = 0;

            _triggers.forEach(function (t) {
              return t.pin === pin && i++;
            });

            i || (pinCache.spacer = 0); // if there aren't any more ScrollTriggers with the same pin, remove the spacer, otherwise it could be contaminated with old/stale values if the user re-creates a ScrollTrigger for the same element.
          }
        };

        self.enable(false, false);
        !animation || !animation.add || change ? self.refresh() : gsap.delayedCall(0.01, function () {
          return start || end || self.refresh();
        }) && (change = 0.01) && (start = end = 0); // if the animation is a timeline, it may not have been populated yet, so it wouldn't render at the proper place on the first refresh(), thus we should schedule one for the next tick. If "change" is defined, we know it must be re-enabling, thus we can refresh() right away.
      };

      ScrollTrigger.register = function register(core) {
        if (!_coreInitted) {
          gsap = core || _getGSAP();

          if (_windowExists() && window.document) {
            _win = window;
            _doc = document;
            _docEl = _doc.documentElement;
            _body = _doc.body;
          }

          if (gsap) {
            _toArray = gsap.utils.toArray;
            _clamp = gsap.utils.clamp;
            _suppressOverwrites = gsap.core.suppressOverwrites || _passThrough;
            gsap.core.globals("ScrollTrigger", ScrollTrigger); // must register the global manually because in Internet Explorer, functions (classes) don't have a "name" property.

            if (_body) {
              _raf = _win.requestAnimationFrame || function (f) {
                return setTimeout(f, 16);
              };

              _addListener(_win, "wheel", _onScroll);

              _root = [_win, _doc, _docEl, _body];

              _addListener(_doc, "scroll", _onScroll); // some browsers (like Chrome), the window stops dispatching scroll events on the window if you scroll really fast, but it's consistent on the document!


              var bodyStyle = _body.style,
                  border = bodyStyle.borderTopStyle,
                  bounds;
              bodyStyle.borderTopStyle = "solid"; // works around an issue where a margin of a child element could throw off the bounds of the _body, making it seem like there's a margin when there actually isn't. The border ensures that the bounds are accurate.

              bounds = _getBounds(_body);
              _vertical.m = Math.round(bounds.top + _vertical.sc()) || 0; // accommodate the offset of the <body> caused by margins and/or padding

              _horizontal.m = Math.round(bounds.left + _horizontal.sc()) || 0;
              border ? bodyStyle.borderTopStyle = border : bodyStyle.removeProperty("border-top-style");
              _syncInterval = setInterval(_sync, 200);
              gsap.delayedCall(0.5, function () {
                return _startup = 0;
              });

              _addListener(_doc, "touchcancel", _passThrough); // some older Android devices intermittently stop dispatching "touchmove" events if we don't listen for "touchcancel" on the document.


              _addListener(_body, "touchstart", _passThrough); //works around Safari bug: https://greensock.com/forums/topic/21450-draggable-in-iframe-on-mobile-is-buggy/


              _multiListener(_addListener, _doc, "pointerdown,touchstart,mousedown", function () {
                return _pointerIsDown = 1;
              });

              _multiListener(_addListener, _doc, "pointerup,touchend,mouseup", function () {
                return _pointerIsDown = 0;
              });

              _transformProp = gsap.utils.checkPrefix("transform");

              _stateProps.push(_transformProp);

              _coreInitted = _getTime();
              _resizeDelay = gsap.delayedCall(0.2, _refreshAll).pause();
              _autoRefresh = [_doc, "visibilitychange", function () {
                var w = _win.innerWidth,
                    h = _win.innerHeight;

                if (_doc.hidden) {
                  _prevWidth = w;
                  _prevHeight = h;
                } else if (_prevWidth !== w || _prevHeight !== h) {
                  _onResize();
                }
              }, _doc, "DOMContentLoaded", _refreshAll, _win, "load", function () {
                return _lastScrollTime || _refreshAll();
              }, _win, "resize", _onResize];

              _iterateAutoRefresh(_addListener);
            }
          }
        }

        return _coreInitted;
      };

      ScrollTrigger.defaults = function defaults(config) {
        for (var p in config) {
          _defaults[p] = config[p];
        }
      };

      ScrollTrigger.kill = function kill() {
        _enabled = 0;

        _triggers.slice(0).forEach(function (trigger) {
          return trigger.kill(1);
        });
      };

      ScrollTrigger.config = function config(vars) {
        "limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
        var ms = vars.syncInterval;
        ms && clearInterval(_syncInterval) || (_syncInterval = ms) && setInterval(_sync, ms);

        if ("autoRefreshEvents" in vars) {
          _iterateAutoRefresh(_removeListener) || _iterateAutoRefresh(_addListener, vars.autoRefreshEvents || "none");
          _ignoreResize = (vars.autoRefreshEvents + "").indexOf("resize") === -1;
        }
      };

      ScrollTrigger.scrollerProxy = function scrollerProxy(target, vars) {
        var t = _getTarget(target),
            i = _scrollers.indexOf(t),
            isViewport = _isViewport(t);

        if (~i) {
          _scrollers.splice(i, isViewport ? 6 : 2);
        }

        isViewport ? _proxies.unshift(_win, vars, _body, vars, _docEl, vars) : _proxies.unshift(t, vars);
      };

      ScrollTrigger.matchMedia = function matchMedia(vars) {
        // _media is populated in the following order: mediaQueryString, onMatch, onUnmatch, isMatched. So if there are two media queries, the Array would have a length of 8
        var mq, p, i, func, result;

        for (p in vars) {
          i = _media.indexOf(p);
          func = vars[p];
          _creatingMedia = p;

          if (p === "all") {
            func();
          } else {
            mq = _win.matchMedia(p);

            if (mq) {
              mq.matches && (result = func());

              if (~i) {
                _media[i + 1] = _combineFunc(_media[i + 1], func);
                _media[i + 2] = _combineFunc(_media[i + 2], result);
              } else {
                i = _media.length;

                _media.push(p, func, result);

                mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
              }

              _media[i + 3] = mq.matches;
            }
          }

          _creatingMedia = 0;
        }

        return _media;
      };

      ScrollTrigger.clearMatchMedia = function clearMatchMedia(query) {
        query || (_media.length = 0);
        query = _media.indexOf(query);
        query >= 0 && _media.splice(query, 4);
      };

      ScrollTrigger.isInViewport = function isInViewport(element, ratio, horizontal) {
        var bounds = (_isString(element) ? _getTarget(element) : element).getBoundingClientRect(),
            offset = bounds[horizontal ? _width : _height] * ratio || 0;
        return horizontal ? bounds.right - offset > 0 && bounds.left + offset < _win.innerWidth : bounds.bottom - offset > 0 && bounds.top + offset < _win.innerHeight;
      };

      ScrollTrigger.positionInViewport = function positionInViewport(element, referencePoint, horizontal) {
        _isString(element) && (element = _getTarget(element));
        var bounds = element.getBoundingClientRect(),
            size = bounds[horizontal ? _width : _height],
            offset = referencePoint == null ? size / 2 : referencePoint in _keywords ? _keywords[referencePoint] * size : ~referencePoint.indexOf("%") ? parseFloat(referencePoint) * size / 100 : parseFloat(referencePoint) || 0;
        return horizontal ? (bounds.left + offset) / _win.innerWidth : (bounds.top + offset) / _win.innerHeight;
      };

      return ScrollTrigger;
    }();
    ScrollTrigger.version = "3.8.0";

    ScrollTrigger.saveStyles = function (targets) {
      return targets ? _toArray(targets).forEach(function (target) {
        // saved styles are recorded in a consecutive alternating Array, like [element, cssText, transform attribute, cache, matchMedia, ...]
        if (target && target.style) {
          var i = _savedStyles.indexOf(target);

          i >= 0 && _savedStyles.splice(i, 5);

          _savedStyles.push(target, target.style.cssText, target.getBBox && target.getAttribute("transform"), gsap.core.getCache(target), _creatingMedia);
        }
      }) : _savedStyles;
    };

    ScrollTrigger.revert = function (soft, media) {
      return _revertAll(!soft, media);
    };

    ScrollTrigger.create = function (vars, animation) {
      return new ScrollTrigger(vars, animation);
    };

    ScrollTrigger.refresh = function (safe) {
      return safe ? _onResize() : (_coreInitted || ScrollTrigger.register()) && _refreshAll(true);
    };

    ScrollTrigger.update = _updateAll;
    ScrollTrigger.clearScrollMemory = _clearScrollMemory;

    ScrollTrigger.maxScroll = function (element, horizontal) {
      return _maxScroll(element, horizontal ? _horizontal : _vertical);
    };

    ScrollTrigger.getScrollFunc = function (element, horizontal) {
      return _getScrollFunc(_getTarget(element), horizontal ? _horizontal : _vertical);
    };

    ScrollTrigger.getById = function (id) {
      return _ids[id];
    };

    ScrollTrigger.getAll = function () {
      return _triggers.slice(0);
    };

    ScrollTrigger.isScrolling = function () {
      return !!_lastScrollTime;
    };

    ScrollTrigger.snapDirectional = _snapDirectional;

    ScrollTrigger.addEventListener = function (type, callback) {
      var a = _listeners[type] || (_listeners[type] = []);
      ~a.indexOf(callback) || a.push(callback);
    };

    ScrollTrigger.removeEventListener = function (type, callback) {
      var a = _listeners[type],
          i = a && a.indexOf(callback);
      i >= 0 && a.splice(i, 1);
    };

    ScrollTrigger.batch = function (targets, vars) {
      var result = [],
          varsCopy = {},
          interval = vars.interval || 0.016,
          batchMax = vars.batchMax || 1e9,
          proxyCallback = function proxyCallback(type, callback) {
        var elements = [],
            triggers = [],
            delay = gsap.delayedCall(interval, function () {
          callback(elements, triggers);
          elements = [];
          triggers = [];
        }).pause();
        return function (self) {
          elements.length || delay.restart(true);
          elements.push(self.trigger);
          triggers.push(self);
          batchMax <= elements.length && delay.progress(1);
        };
      },
          p;

      for (p in vars) {
        varsCopy[p] = p.substr(0, 2) === "on" && _isFunction(vars[p]) && p !== "onRefreshInit" ? proxyCallback(p, vars[p]) : vars[p];
      }

      if (_isFunction(batchMax)) {
        batchMax = batchMax();

        _addListener(ScrollTrigger, "refresh", function () {
          return batchMax = vars.batchMax();
        });
      }

      _toArray(targets).forEach(function (target) {
        var config = {};

        for (p in varsCopy) {
          config[p] = varsCopy[p];
        }

        config.trigger = target;
        result.push(ScrollTrigger.create(config));
      });

      return result;
    };

    ScrollTrigger.sort = function (func) {
      return _triggers.sort(func || function (a, b) {
        return (a.vars.refreshPriority || 0) * -1e6 + a.start - (b.start + (b.vars.refreshPriority || 0) * -1e6);
      });
    };

    _getGSAP() && gsap.registerPlugin(ScrollTrigger);

    gsap__default["default"].registerPlugin(ScrollToPlugin__default["default"]);
    gsap__default["default"].registerPlugin(Draggable);
    gsap__default["default"].registerPlugin(ScrollTrigger);

    function pusherInit() {
        const { apiKey, cloudChannel, companyChannel, userChannel, applicationChannel, applicationUserChannel, authEndpoint, applicationGroupChannel, groupChannel } = application().pusher;
        const pusherInstance = new Pusher__default["default"](apiKey, {
            cluster: "eu",
            forceTLS: true,
            authEndpoint
        });
        mutablePusher({
            pusher: pusherInstance,
            presenceEnabled: Boolean(authEndpoint),
            cloudChannel: pusherInstance.subscribe(cloudChannel),
            companyChannel: pusherInstance.subscribe(companyChannel),
            userChannel: pusherInstance.subscribe(userChannel),
            applicationChannel: pusherInstance.subscribe(applicationChannel),
            applicationUserChannel: pusherInstance.subscribe(applicationUserChannel),
            applicationGroupChannel: applicationGroupChannel ?
                pusherInstance.subscribe(applicationGroupChannel) : undefined,
            groupChannel: groupChannel ? pusherInstance.subscribe(groupChannel) : undefined,
        });
    }

    const jsonActions = {
        actionCardConfirm: (args) => dialog(lodash__default["default"].assign(args, {
            type: exports.DialogType.confirm,
            cancelButton: args.cancelButton,
            confirmButton: lodash__default["default"].assign({
                onclick: () => {
                    window.open(args.href, args.target);
                }
            }, args.confirmButton)
        })),
        dialog: (args) => dialog(args),
        openWindow: (args) => window.open(args.href, args.target)
    };
    function jsonAction(config) {
        return jsonActions[config.type](config.props);
    }

    class ActionCard extends Themable {
        oninit({ attrs: { data: { applyTheme } } }) {
            this.createTheme(applyTheme);
        }
        onbeforeupdate({ attrs: { data: { applyTheme } } }) {
            this.updateTheme(applyTheme);
        }
        view({ attrs: { data: { src, header, lines, linesAsList, buttonLabel, buttonIcon, buttonIconRight, href, target = "_self", confirm, buttonContext, context } } }) {
            context = context || "alt" /* ColorContext.alt */;
            const openRef = () => window.open(href, target);
            return m__default["default"](".flex.items-center.justify-center.w-100.overflow-hidden.ma3", {
                class: joinClasses([
                    this.overwrite.uiActionCardWrapper,
                    theme().uiActionCardWrapper,
                    theme().uiCardWrapper,
                    colorContextMapper[context],
                ])
            }, m__default["default"](".flex.w-100.h-100.pa2", m__default["default"](".flex.flex-column.h-100.mr4", {
                class: joinClasses([
                    this.overwrite.uiActionCardInnerWrapper,
                    theme().uiActionCardInnerWrapper
                ])
            }, m__default["default"]('h4.w-100.flex-auto', {
                class: joinClasses([
                    this.overwrite.uiActionCardHeader,
                    theme().uiActionCardHeader,
                    theme().uiCardHeader
                ])
            }, header), m__default["default"](".w-100.flex-auto", {
                class: joinClasses([
                    this.overwrite.uiActionCardLines,
                    theme().uiActionCardLines
                ])
            }, buildComponent({
                type: "sdx-blockLines",
                data: linesAsList ? {
                    blockSelector: "ul",
                    applyTheme: {
                        uiBlockLinesWrapper: {
                            classes: this.overwrite.uiBlockLinesWrapper
                        }
                    },
                    lines: lodash__default["default"].map(lines, (line) => {
                        return {
                            selector: "li",
                            child: line
                        };
                    })
                } : {
                    applyTheme: {
                        uiBlockLinesWrapper: {
                            classes: this.overwrite.uiBlockLinesWrapper
                        }
                    },
                    lines: lines
                }
            })), href || buttonLabel ? m__default["default"](uiWidgets.Button, {
                classes: joinClasses([
                    this.overwrite.uiActionCardButton,
                    theme().uiActionCardButton,
                ]),
                label: buttonLabel,
                icon: buttonIcon,
                rightIcon: buttonIconRight,
                context: buttonContext || buttonContextMapper(context),
                onclick: () => confirm
                    ? jsonAction({
                        type: "actionCardConfirm" /* JsonActionType.actionCardConfirm */,
                        props: {
                            icon: confirm.icon,
                            title: confirm.title,
                            message: confirm.message,
                            confirmButton: confirm.confirmButton,
                            cancelButton: confirm.cancelButton,
                            href,
                            target
                        }
                    })
                    : openRef()
            }) : null), src ? m__default["default"](".flex.justify-center.items-center", {
                class: joinClasses([
                    this.overwrite.uiActionCardImageWrapper,
                    theme().uiActionCardImageWrapper
                ]),
            }, m__default["default"]("img", {
                class: joinClasses([
                    this.overwrite.uiActionCardImage,
                    theme().uiActionCardImage
                ]),
                src
            })) : null));
        }
    }

    function buildPart(part) {
        if (typeof part === "string") {
            return m__default["default"]("p", part);
        }
        else if ("selector" in part) {
            return m__default["default"](part.selector, part.content);
        }
        else {
            return m__default["default"](".dib", m__default["default"](uiWidgets.ButtonLink, {
                href: part.href,
                label: part.text
            }));
        }
    }
    // Wrapper class for basic part building function
    class Basic {
        view({ attrs: { data } }) {
            return m__default["default"](".ph4", lodash__default["default"].map(data, buildPart));
        }
    }

    // Wrapper class for basic part building function
    class Header extends Themable {
        oninit({ attrs: { data: { applyTheme } } }) {
            this.createTheme(applyTheme);
        }
        onbeforeupdate({ attrs: { data: { applyTheme } } }) {
            this.updateTheme(applyTheme);
        }
        view({ attrs: { data: { text, id = "" }, } }) {
            return m__default["default"](".f3.f2-l.fw5.mv3.mv4-l", {
                id,
                class: joinClasses([
                    this.overwrite.uiCustomHeader,
                    theme().uiCustomHeader
                ])
            }, text);
        }
    }

    class Wrapper {
        view({ attrs: { data: { children, key, style, styleNS, styleM, styleL, classes } } }) {
            this.className = createResponsiveClass({ key, style, styleNS, styleM, styleL, classes });
            return m__default["default"]("div", {
                class: this.className
            }, lodash__default["default"].map(children, (child) => {
                return typeof child === 'string' ? child : buildComponent(child);
            }));
        }
    }

    class DataCardSectionItem {
        view({ attrs: { itemLabel, value, overwrite, context } }) {
            return m__default["default"]("div", {
                class: joinClasses([
                    theme().uiDataCardSectionItemWrapper,
                ])
            }, m__default["default"]("span", {
                class: joinClasses([
                    overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardSectionItemLabel,
                    theme().uiDataCardSectionItemLabel,
                    !context || context === "default" /* ColorContext.default */
                        ? "ui-builder-text"
                        : colorContextMapper[context]
                ])
            }, itemLabel), buildComponent({
                type: "sdx-blockLines",
                data: {
                    lines: value,
                    applyTheme: {
                        uiBlockLinesWrapper: {
                            classes: joinClasses([
                                overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardSectionItemValue,
                                theme().uiDataCardSectionItemValue,
                                !context || context === "default" /* ColorContext.default */
                                    ? "ui-builder-text"
                                    : colorContextMapper[context]
                            ])
                        }
                    }
                }
            }));
        }
    }

    class DataCardSection {
        view({ attrs: { dataMap = {}, keys, label, overwrite, context } }) {
            return m__default["default"]("div", {
                class: joinClasses([
                    overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardSectionWrapper,
                    theme().uiDataCardSectionWrapper
                ])
            }, label ? m__default["default"]("div", {
                class: joinClasses([
                    overwrite === null || overwrite === void 0 ? void 0 : overwrite.uiDataCardSectionLabel,
                    theme().uiDataCardSectionLabel,
                    context ? colorContextMapper[context] : ""
                ])
            }, label) : null, lodash__default["default"].map(keys, (key) => {
                if (!dataMap[key]) {
                    return null;
                }
                const [itemLabel, value] = dataMap[key];
                return m__default["default"](DataCardSectionItem, { itemLabel, value, overwrite, context });
            }));
        }
    }

    class DataCard extends Themable {
        oninit({ attrs: { data: { applyTheme } } }) {
            this.createTheme(applyTheme);
        }
        onbeforeupdate({ attrs: { data: { applyTheme } } }) {
            this.updateTheme(applyTheme);
        }
        view({ attrs: { data } }) {
            const { pre, post, displayType, context = "default" /* ColorContext.default */, buttonContext, dataMap, header, categoryLabel, button, config = {} } = data;
            const { detailed, overview } = config;
            return dataMap && m__default["default"](".flex.flex-column", {
                class: joinClasses([
                    this.overwrite.uiDataCardWrapper,
                    theme().uiDataCardWrapper,
                    theme().uiCardWrapper,
                    colorContextMapper[context]
                ])
            }, (header || categoryLabel) && m__default["default"](".flex.flex-row", {
                class: joinClasses([
                    this.overwrite.uiDataCardHeaderWrapper,
                    theme().uiDataCardHeaderWrapper
                ])
            }, [
                header && m__default["default"]("span", {
                    class: joinClasses([
                        this.overwrite.uiDataCardHeader,
                        theme().uiDataCardHeader
                    ])
                }, header),
                categoryLabel && m__default["default"]("div", {
                    class: joinClasses([
                        this.overwrite.uiDataCardCategoryLabel,
                        theme().uiDataCardCategoryLabel
                    ])
                }, categoryLabel)
            ]), (pre === null || pre === void 0 ? void 0 : pre.length) && lodash__default["default"].map(pre, buildComponent), 
            //Render dataList
            this.getDisplayComponents({
                displayType, detailed, overview, dataMap, context
            }), button && m__default["default"](uiWidgets.Button, {
                context: buttonContext || buttonContextMapper(context),
                classes: joinClasses([
                    this.overwrite.uiDataCardButton,
                    theme().uiDataCardButton
                ]),
                onclick: () => {
                    if (button.action)
                        jsonAction(button.action);
                },
                label: button.label,
                icon: button.icon
            }), (post === null || post === void 0 ? void 0 : post.length) && lodash__default["default"].map(post, buildComponent));
        }
        getDisplayComponents({ displayType, context, dataMap, detailed, overview }) {
            const overwrite = this.overwrite;
            if (displayType === "detailed" /* DataCardDisplayType.detailed */) {
                return detailed
                    ? lodash__default["default"].map(detailed, ({ label, keys }) => m__default["default"](DataCardSection, { dataMap, keys, label, overwrite, context }))
                    : lodash__default["default"].map(dataMap, ([itemLabel, value]) => m__default["default"](DataCardSectionItem, { overwrite, itemLabel, value, context }));
            }
            else {
                return overview
                    ? m__default["default"](DataCardSection, { dataMap, keys: overview, label: "", overwrite, context })
                    : lodash__default["default"].map(dataMap, ([itemLabel, value]) => m__default["default"](DataCardSectionItem, { overwrite, itemLabel, value, context }));
            }
        }
    }

    class ProgressCard {
        mergeData(overwrites) {
            const defaults = {
                status: "incomplete" /* ProgressStatus.incomplete */,
                disabled: false,
                heading: "",
                subheanding: "",
                onclick: lodash__default["default"].noop(),
                style: {},
                stepNumber: "",
                link: {
                    style: {},
                    text: "",
                    href: "",
                    target: "_blank"
                },
                icons: {
                    complete: "fas fa-check fa-2x",
                    //Incomplete state should have no icon if a stepNumber is present
                    incomplete: overwrites.stepNumber ? "" : "fal fa-ellipsis-h fa-2x",
                    error: "fas fa-exclamation fa-2x",
                    warn: "fas fa-times fa-2x",
                    waiting: "fal fa-hourglass-half fa-2x"
                },
                post: []
            };
            this.data = deepMerge(defaults, overwrites);
        }
        getStatusClass(status) {
            switch (status) {
                case "complete" /* ProgressStatus.complete */:
                    return theme().uiProgressCardComplete;
                case "warn" /* ProgressStatus.warn */:
                    return theme().uiProgressCardWarn;
                case "waiting" /* ProgressStatus.waiting */:
                    return theme().uiProgressCardWaiting;
                case "error" /* ProgressStatus.error */:
                    return theme().uiProgressCardError;
                default:
                    return theme().uiProgressCardIncomplete;
            }
        }
        getIconStatusClass(status) {
            switch (status) {
                case "complete" /* ProgressStatus.complete */:
                    return theme().uiProgressCardIconComplete;
                case "warn" /* ProgressStatus.warn */:
                    return theme().uiProgressCardIconWarn;
                case "waiting" /* ProgressStatus.waiting */:
                    return theme().uiProgressCardIconWaiting;
                case "error" /* ProgressStatus.error */:
                    return theme().uiProgressCardIconError;
                default:
                    return theme().uiProgressCardIconIncomplete;
            }
        }
        statusComp({ status, stepNumber, icons }) {
            const iconStyle = status === "incomplete" /* ProgressStatus.incomplete */ && stepNumber
                ? {
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    margin: "auto"
                }
                : {
                    margin: "auto"
                };
            const iconText = status === "incomplete" /* ProgressStatus.incomplete */ || !icons[status] ? stepNumber : "";
            return m__default["default"](".flex.items-center.justify-center", {
                class: joinClasses([
                    theme().uiProgressCardIndicator,
                    this.getIconStatusClass(status)
                ])
            }, m__default["default"]("i", {
                class: icons[status] || "",
                style: iconStyle
            }, iconText));
        }
        view({ attrs: { data } }) {
            this.mergeData(data);
            const { status, style, onclick, disabled, heading, subheading, link, post, children } = this.data;
            return m__default["default"](".flex.flex-column", {
                onclick,
                style: lodash__default["default"].assign({ zIndex: "1" }, style),
                class: joinClasses([
                    theme().uiCardWrapper,
                    theme().uiProgressCardWrapper,
                    this.getStatusClass(status),
                    disabled ? theme().uiDisabled : "pointer",
                ])
            }, m__default["default"](".flex.flex-row.items-center.w-100", this.statusComp(this.data), m__default["default"]("div", {
                style: {
                    borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                    width: "100%",
                }
            })), m__default["default"](".flex.flex-column.w-100", {
                class: joinClasses([
                    theme().uiProgressTextWrapper
                ])
            }, m__default["default"](".w-100", {
                class: theme().uiProgressCardSubheading
            }, subheading), m__default["default"](".w-100", {
                class: theme().uiProgressCardHeading
            }, heading)), m__default["default"](".flex.mt-auto", link.href ? m__default["default"](uiWidgets.ButtonLink, Object.assign({ label: link.text }, link)) : null), lodash__default["default"].map(post, buildComponent), children);
        }
    }

    class ProgressFlow {
        view({ attrs: { data } }) {
            return m__default["default"](".flex.flex-wrap.items-center", {
                class: theme().uiProgressFlowWrapper
            }, data.map((card) => m__default["default"](".flex", {
                class: theme().uiProgressFlowStepWrapper
            }, buildComponent({ type: 'sdx-progressCard', data: card }))));
        }
    }

    class BlockLines extends Themable {
        oninit({ attrs: { data: { applyTheme } } }) {
            this.createTheme(applyTheme);
        }
        onbeforeupdate({ attrs: { data: { applyTheme } } }) {
            this.updateTheme(applyTheme);
        }
        view({ attrs: { data: { lines = [], blockSelector = "div", classes } } }) {
            return m__default["default"](blockSelector, {
                class: joinClasses([
                    this.overwrite.uiBlockLinesWrapper,
                    theme().uiBlockLinesWrapper,
                    classes
                ])
            }, typeof lines === 'string' ?
                m__default["default"]("p", m__default["default"].trust(lines))
                : lodash__default["default"].map(lines, (line) => {
                    if (typeof line === "string") {
                        return m__default["default"]("p", m__default["default"].trust(line));
                    }
                    else {
                        return m__default["default"](line.selector, {
                            class: joinClasses([
                                line.classes,
                                line.colorSelector ? colorMapper[line.colorSelector].color : "",
                                line.bgColorSelector ? colorMapper[line.bgColorSelector].background : "",
                            ]),
                        }, m__default["default"].trust(line.child));
                    }
                }));
        }
    }

    class Accordion {
        constructor() {
            this.minimizeAccordion = stream__default["default"]();
        }
        oninit({ attrs: { data: { open = false } } }) {
            this.minimizeAccordion(open);
        }
        view({ attrs: { data } }) {
            return m__default["default"](".items-center.center-flex", {
                class: joinClasses([theme().uiAccordionTitleWrapper])
            }, m__default["default"](".flex.pointer", {
                class: joinClasses([
                    theme().uiAccordionIcon
                ]),
                onclick: () => this.minimizeAccordion(!this.minimizeAccordion())
            }, m__default["default"]("div", {
                class: joinClasses([
                    theme().uiAccordionTitleIcon,
                    this.minimizeAccordion() ? "far fa-plus-square mr2" : "far fa-minus-square mr2",
                ]),
            }), m__default["default"]("div", {
                class: theme().uiAccordionTitle
            }, data.title ? data.title : '')), m__default["default"]("div", {
                class: joinClasses([
                    theme().uiAccordionWrapper
                ]),
                style: {
                    transition: "height 0.5s ease 0.1s",
                    overflow: "hidden",
                    height: this.minimizeAccordion() ? "0px" : "100%"
                }
            }, data.children));
        }
    }

    class CrossSVG {
        view({ attrs: { color } }) {
            return m__default["default"]("svg", {
                viewBox: "0 0 112.1 107.5",
                height: "100%",
                width: "100%"
            }, m__default["default"]("path", {
                d: "M79 34L30.6 79.3c-1.9 1.8-4.9 1.7-6.6-.2l-3.2-3.4c-1.8-1.9-1.7-4.9.2-6.6l48.4-45.3c1.9-1.8 4.9-1.7 6.6.2l3.2 3.4c1.8 1.8 1.7 4.8-.2 6.6z",
                strokeLinecap: "round",
                strokeMiterlimit: "10",
                style: {
                    fill: color || "#b00439",
                    fillWidth: "7",
                }
            }), m__default["default"]("path", {
                d: "M64.2 77L25.6 35.7c-1.6-1.7-1.5-4.4.2-6l4.1-3.8c1.7-1.6 4.4-1.5 6 .2l38.7 41.3c1.6 1.7 1.5 4.4-.2 6l-4.1 3.8c-1.8 1.6-4.5 1.5-6.1-.2z",
                strokeLinecap: "round",
                strokeMiterlimit: "10",
                style: {
                    fill: color || "#b00439",
                    fillWidth: "7",
                }
            }), m__default["default"]("circle", {
                cx: "50.5",
                cy: "51.3",
                r: "47",
                strokeLinecap: "round",
                strokeMiterlimit: "10",
                style: {
                    fill: "none",
                    stroke: color || "#b00439",
                    strokeWidth: "7",
                }
            }));
        }
    }

    class CheckSVG {
        view({ attrs: { color } }) {
            return m__default["default"]("svg", {
                viewBox: "0 0 112.1 107.5",
                height: "100%",
                width: "100%"
            }, m__default["default"]("path", {
                d: "M111 4.6L106.1.7c-1.4-1.2-3.8-.7-5.2 1L53.5 60.9 35 46.1c-1-.8-2.6-.5-3.6.7l-6.2 7.7c-1 1.2-.9 2.9.1 3.7l21.1 16.9 4.9 3.9.8.6c1 .8 2.6.5 3.6-.7l.8-1 5.4-6.8 49.3-61.4c1.3-1.6 1.2-4-.2-5.1z",
                fill: color || "#26a45e"
            }), m__default["default"]("path", {
                d: "M78.4 19.2C70.6 13.5 61 10 50.5 10c-26 0-47 21-47 47s21 47 47 47 47-21 47-47c0-6.1-1.2-11.9-3.3-17.2",
                strokeLinecap: "round",
                strokeMiterlimit: "10",
                style: {
                    fill: "none",
                    stroke: color || "#26a45e",
                    strokeWidth: "7",
                }
            }));
        }
    }

    class StatusCheck extends Themable {
        oninit({ attrs: { data: { applyTheme } } }) {
            this.createTheme(applyTheme);
        }
        onbeforeupdate({ attrs: { data: { applyTheme } } }) {
            this.updateTheme(applyTheme);
        }
        view(vnode) {
            const { heading, subheading } = vnode.attrs.data;
            return m__default["default"](".flex", {
                class: joinClasses([
                    this.overwrite.uiStatusCheckWrapper,
                    theme().uiStatusCheckWrapper,
                ])
            }, m__default["default"]("div", {
                class: joinClasses([
                    this.overwrite.uiStatusCheckIconWrapper,
                    theme().uiStatusCheckIconWrapper,
                ])
            }, this.getIcon(vnode)), m__default["default"]("div", {
                class: joinClasses([
                    this.overwrite.uiStatusCheckTextWrapper,
                    theme().uiStatusCheckTextWrapper,
                ])
            }, heading && m__default["default"]("div", {
                class: joinClasses([
                    this.overwrite.uiStatusCheckHeading,
                    theme().uiStatusCheckHeading,
                ])
            }, heading), subheading && buildComponent({
                type: "sdx-blockLines",
                data: {
                    lines: subheading,
                    applyTheme: {
                        uiBlockLinesWrapper: {
                            classes: joinClasses([
                                this.overwrite.uiStatusCheckSubheading,
                                theme().uiStatusCheckSubheading,
                            ])
                        }
                    }
                }
            })));
        }
        getIcon({ attrs: { data } }) {
            const { passIcon, failIcon, pass } = data;
            if (pass) {
                if (typeof passIcon === 'object') {
                    return m__default["default"]("img", { src: passIcon.src, height: passIcon.height, width: passIcon.width });
                }
                else if (typeof passIcon === "string") {
                    return m__default["default"]("i", { class: passIcon, color: data.passColor });
                }
                else {
                    return m__default["default"](CheckSVG, { color: data.passColor });
                }
            }
            else {
                if (typeof failIcon === 'object') {
                    return m__default["default"]("img", { src: failIcon.src, height: failIcon.height, width: failIcon.width });
                }
                else if (typeof failIcon === "string") {
                    return m__default["default"]("i", { class: failIcon, color: data.failColor });
                }
                else {
                    return m__default["default"](CrossSVG, { color: data.failColor });
                }
            }
        }
    }

    const maxWidthClass$2 = createResponsiveClass({
        key: "max-width-50rem",
        style: {
            maxWidth: "50rem"
        }
    });
    class PaymentExpired {
        view({ attrs: { text, header = "Payment Expired", pre, post } }) {
            return m__default["default"](`form.ma3.mt4.${maxWidthClass$2}`, [
                pre && buildComponentList(pre),
                header && m__default["default"]('header.mb3.fw7.f3', header),
                text && buildComponent({
                    type: "sdx-blockLines",
                    data: text
                }),
                post && buildComponentList(post)
            ]);
        }
    }

    const maxWidthClass$1 = createResponsiveClass({
        key: "max-width-50rem",
        style: {
            maxWidth: "50rem"
        }
    });
    class PaymentFailure {
        view({ attrs: { text, header = "Payment Failed", pre, post } }) {
            return m__default["default"](`form.ma3.mt4.${maxWidthClass$1}`, [
                // don't show for renewals
                pre && buildComponentList(pre),
                m__default["default"]('div', {
                    class: theme().uiPaymentFailureMain
                }, [
                    header && m__default["default"]('header.mb3.fw7.f3', header),
                    text && buildComponent({
                        type: "sdx-blockLines",
                        data: text
                    }),
                    post && m__default["default"]('.flex.flex-row', [buildComponentList(post)])
                ])
            ]);
        }
    }

    const maxWidthClass = createResponsiveClass({
        key: "max-width-50rem",
        style: {
            maxWidth: "50rem"
        }
    });
    class PaymentSuccess {
        view({ attrs: { text, header = "Payment Accepted", pre, post } }) {
            return m__default["default"](`form.ma3.mt4.${maxWidthClass}`, [
                // don't show for renewals
                pre && buildComponentList(pre),
                header && m__default["default"]('header.mb3.fw7.f3', header),
                text && buildComponent({
                    type: "sdx-blockLines",
                    data: text
                }),
                post && buildComponentList(post)
            ]);
        }
    }

    const defaultFormFieldClasses$1 = {
        wrapper: 'flex flex-row justify-between mt2 mb2 items-end',
        input: 'tr',
        inputWrapper: 'w-25 pa0',
    };
    function buildToggleLabel(toggleLabel, toggleState) {
        const boldStyle = {
            style: {
                fontWeight: 'bold',
            }
        };
        if (!toggleLabel)
            return "";
        return m__default["default"]("label.flex.fex-row.pointer.ml2", { for: 'cart-toggle' }, [
            m__default["default"]('span', toggleState() === false ? boldStyle : {}, toggleLabel.toggleOffLabel),
            m__default["default"]('span', '/'),
            m__default["default"]('span', toggleState() === true ? boldStyle : {}, toggleLabel.toggleOnLabel),
        ]);
    }
    class ShoppingCart extends Themable {
        constructor() {
            super(...arguments);
            this.processing = stream__default["default"](false);
            this.checkboxState = stream__default["default"](false);
        }
        oninit(vnode) {
            const { attrs: { header, items } } = vnode;
            const headerField = {
                key: "header",
                input: {
                    id: "header",
                    type: "label" /* FieldType.label */,
                    label: header,
                },
            };
            // Assemble Form Items
            const itemFields = items.map((item) => {
                const id = lodash__default["default"].uniqueId();
                return {
                    key: id,
                    input: {
                        id,
                        label: {
                            text: item.title.text,
                            rightIcon: item.editable ? item.title.icon : ''
                        },
                        type: item.amount ? "text" /* FieldType.text */ : "label" /* FieldType.label */,
                        readonly: item.editable ? false : true,
                        uiClass: item.uiClass ? item.uiClass : defaultFormFieldClasses$1,
                    },
                    initialValue: item.amount ? (!item.textField ? `£${item.amount}` : item.amount) : '',
                };
            });
            // Add header and items to form config
            const formFieldConfig = [headerField, ...itemFields];
            this.form = new FormBuilder(formFieldConfig);
            this.layout = new FormLayout(this.form.fields);
        }
        oncreate({ dom }) {
            this.formElement = dom;
        }
        buildPaymentOption(leftComponent, rightComponent, isSinglePayment) {
            if (isSinglePayment()) {
                return leftComponent ? buildComponent(leftComponent) : "";
            }
            else {
                return rightComponent ? buildComponent(rightComponent) : "";
            }
        }
        getSpinner() {
            return this.processing() ? "fa-solid fa-spinner fa-spin" : "";
        }
        view(vnode) {
            var _a;
            const { attrs: { paymentOptions, confirmCheckbox, proceedToPayment, isSinglePayment, pre, post } } = vnode;
            const { leftComponent, rightComponent } = paymentOptions;
            return m__default["default"]('form.bg-white.pa3', [
                pre && buildComponentList(pre),
                m__default["default"]('div', buildFormLayout(this.layout)),
                m__default["default"]('.flex.items-center.mb2', [
                    m__default["default"](uiWidgets.ToggleInput, {
                        field: {
                            id: 'cart-toggle',
                            label: "",
                            type: "toggle" /* FieldType.toggle */,
                            uiClass: {
                                label: 'bold fw4',
                                wrapper: 'f2',
                                inputWrapper: "ui-builder-text-invert"
                            },
                        },
                        value: isSinglePayment
                    }),
                    buildToggleLabel(paymentOptions.toggleLabel, isSinglePayment),
                ]),
                this.buildPaymentOption(leftComponent, rightComponent, isSinglePayment),
                confirmCheckbox.pre && buildComponentList(confirmCheckbox.pre),
                m__default["default"](uiWidgets.CheckboxInput, {
                    field: {
                        id: 'form-toggle',
                        label: confirmCheckbox.text,
                        uiClass: {
                            wrapper: 'i',
                            input: "items-start"
                        },
                        required: true
                    },
                    value: this.checkboxState
                }),
                confirmCheckbox.post && buildComponentList(confirmCheckbox.post),
                m__default["default"](uiWidgets.Button, {
                    label: isSinglePayment()
                        ? proceedToPayment.toggleOnButton.label
                        : proceedToPayment.toggleOffButton.label,
                    classes: "bg-ui-builder-accent",
                    disabled: !((_a = this.formElement) === null || _a === void 0 ? void 0 : _a.checkValidity()),
                    style: {
                        width: '15rem',
                        marginLeft: 'auto',
                        marginTop: '1rem'
                    },
                    icon: this.getSpinner(),
                    onclick: () => {
                        this.processing(true);
                        const formData = new FormData(this.formElement);
                        formData.append("form-toggle-value", isSinglePayment().toString());
                        m__default["default"].request({
                            url: isSinglePayment()
                                ? proceedToPayment.toggleOnButton.url
                                : proceedToPayment.toggleOffButton.url,
                            method: "POST",
                            body: formData
                        });
                    }
                }),
                post && buildComponentList(post),
            ]);
        }
    }

    function translateStatus(status) {
        status = status.toLowerCase();
        switch (status) {
            case "init":
                return "init";
            case "ok":
                return "ok";
            case "expired":
            case "lapsed":
                return "expired";
            default:
                return "failed";
        }
    }
    class ShoppingCartHandler {
        constructor() {
            this.isSinglePayment = stream__default["default"](false);
        }
        oninit({ attrs: { data: { dataPathId } } }) {
            /// get status from handle
            const data = getData(dataPathId);
            this.statusData = data;
            this.isSinglePayment(Boolean(data === null || data === void 0 ? void 0 : data.isSinglePayment));
        }
        view({ attrs }) {
            var _a;
            const { paymentSuccessDirectDebit, paymentSuccess: paymentSuccess, paymentFailed, paymentExpired } = attrs.data;
            const status = translateStatus(((_a = this.statusData) === null || _a === void 0 ? void 0 : _a.status) || "");
            switch (status) {
                case 'init':
                    return m__default["default"](ShoppingCart, Object.assign(Object.assign({}, attrs.data), { isSinglePayment: this.isSinglePayment }));
                case 'ok':
                    return this.isSinglePayment()
                        ? m__default["default"](PaymentSuccess, paymentSuccess)
                        : m__default["default"](PaymentSuccess, paymentSuccessDirectDebit);
                case 'expired':
                    return m__default["default"](PaymentExpired, paymentExpired);
                case 'failed':
                    return m__default["default"](PaymentFailure, paymentFailed);
                default:
                    return null;
            }
        }
    }

    const defaultFormFieldClasses = {
        wrapper: 'flex flex-row justify-between pt0 pb0',
        input: 'tr',
        inputWrapper: 'w-25 pb0 pt0'
    };
    function itemsAreEqual(orig, compare) {
        return lodash__default["default"](orig).differenceWith(compare, lodash__default["default"].isEqual).isEmpty();
    }
    class ToggleForm {
        onbeforeupdate({ attrs: { data: { items } } }) {
            if (!this.items || !itemsAreEqual(this.items, items)) {
                this.items = items;
                // Assemble Form Items
                const itemFields = items.map((item) => {
                    return {
                        key: item.title,
                        input: {
                            id: item.title,
                            label: item.title,
                            type: item.amount ? "text" /* FieldType.text */ : "label" /* FieldType.label */,
                            readonly: true,
                            uiClass: item.uiClass ? item.uiClass : defaultFormFieldClasses,
                        },
                        initialValue: item.amount ? `£${item.amount}` : '',
                    };
                });
                const form = new FormBuilder(itemFields);
                this.layout = new FormLayout(form.fields);
            }
        }
        view({ attrs: { data: { pre, post } } }) {
            return m__default["default"]("div", [
                pre ? buildComponentList(pre) : '',
                this.layout && buildFormLayout(this.layout),
                post ? buildComponentList(post) : ''
            ]);
        }
    }

    class Odometer {
        constructor() {
            this.digitNodes = [];
            this.digits = [];
            this.prevLength = 0;
        }
        numberToCharArray(credit) {
            this.digits = Array.from(Math.abs(credit).toString());
        }
        createDigitNodes() {
            for (let i = 1; i < this.digits.length + 1; i++) {
                const digitsLeft = this.digits.length - i;
                this.digitNodes.push(m__default["default"](".digit-container", m__default["default"](".counter-digit", {
                    style: {
                        lineHeight: "1em",
                        transform: `translateY(${Number(this.digits[i - 1]) - 10}em)`,
                        transition: `transform 0.4s`,
                        animation: `slider${digitsLeft} 0.4s`,
                    }
                }, "0 9 8 7 6 5 4 3 2 1 0")));
                if (digitsLeft !== 0 && digitsLeft % 3 === 0) {
                    this.digitNodes.push(
                    // TODO nicer looking comma formatting + locale
                    m__default["default"](".digit-container.tc", {
                        style: {
                            width: "0.5em",
                            padding: "0"
                        }
                    }, ","));
                }
            }
        }
        // animation for newly rendered dom elements
        createKeyFrames() {
            // cleanup previous style
            if (this.cssAnimation) {
                document.getElementsByTagName("head")[0].removeChild(this.cssAnimation);
            }
            this.cssAnimation = document.createElement('style');
            for (let i = 1; i < this.digits.length + 1; i++) {
                const digitsLeft = this.digits.length - i;
                const to = 10 - Number(this.digits[i - 1]);
                const from = to === 10 ? 0 : 10;
                const rules = document.createTextNode(`@keyframes slider${digitsLeft} {
			from {
				transform: translateY(-${from}em);
			}
		
			to {
				transform: translateY(-${to}em);
			}
			}`);
                this.cssAnimation.appendChild(rules);
            }
            document.getElementsByTagName("head")[0].appendChild(this.cssAnimation);
        }
        updatePositions(dom) {
            dom.querySelectorAll(".counter-digit").forEach((ele, i) => {
                ele.style.transform = `translateY(${Number(this.digits[i]) - 10}em)`;
            });
            // recreate list when digits have changed
            if (this.digits.length !== this.prevLength) {
                this.digitNodes = [];
                this.createDigitNodes();
                this.createKeyFrames();
            }
        }
        oncreate({ attrs: { data: { endpoint, eventName = "counter" } }, dom }) {
            m__default["default"].request(endpoint).then(({ total }) => {
                var _a;
                if (total == null) {
                    return;
                }
                this.credit = total;
                this.numberToCharArray(total);
                this.prevLength = this.digits.length;
                this.createDigitNodes();
                this.createKeyFrames();
                (_a = pusher().applicationGroupChannel) === null || _a === void 0 ? void 0 : _a.bind(eventName, ({ delta }) => {
                    try {
                        this.credit += delta;
                        this.numberToCharArray(this.credit);
                        this.updatePositions(dom);
                        this.prevLength = this.digits.length;
                        m__default["default"].redraw();
                    }
                    catch (_a) {
                        lodash__default["default"].noop();
                    }
                });
            }).catch(lodash__default["default"].noop);
        }
        getLabel(label) {
            const negative = label.negative ? label.negative : label.default;
            return this.credit < 0 ? negative : label.default;
        }
        view({ attrs: { data: { label = { default: "Amount: " } }, classes } }) {
            return m__default["default"]("div", {
                class: joinClasses([theme().uiOdometerWrapper, classes])
            }, this.digitNodes.length > 0 && [
                label && m__default["default"]("span", { class: theme().uiOdometerLabel }, this.getLabel(label)),
                m__default["default"](".odometer", {
                    class: joinClasses([
                        theme().uiOdometer,
                        this.credit < 0 ? theme().uiOdometerNegative : theme().uiOdometerPositive
                    ])
                }, this.digitNodes)
            ]);
        }
    }

    function registerDefault() {
        registerComponent("basic", Basic);
        registerComponent("sdx-actionCard", ActionCard);
        registerComponent("sdx-header", Header);
        registerComponent("sdx-blockLines", BlockLines);
        registerComponent("sdx-wrapper", Wrapper);
        registerComponent("sdx-dataCard", DataCard);
        registerComponent("sdx-progressCard", ProgressCard);
        registerComponent("sdx-progressFlow", ProgressFlow);
        registerComponent("sdx-accordion", Accordion);
        registerComponent("sdx-statusCheck", StatusCheck);
        registerComponent("sdx-shoppingCart", ShoppingCartHandler);
        registerComponent("sdx-toggleForm", ToggleForm);
        registerComponent("sdx-odometer", Odometer);
    }

    let bootstrapPath;
    function loadThemeBranding() {
        return Promise.all([loadTheme(), loadBranding()]);
    }
    // Register default ui-builder custom components
    registerDefault();
    function reloadBootstrap() {
        var _a;
        pusher().applicationUserChannel.unbind("reload" /* PusherEvents.reload */, reload);
        pusher().applicationUserChannel.unbind("redirect" /* PusherEvents.redirect */, redirect);
        pusher().applicationUserChannel.unbind("notification" /* PusherEvents.notification */, dialogRedraw);
        pusher().applicationUserChannel.unbind("reloadbootstrap" /* PusherEvents.reloadBootstrap */, reloadBootstrap);
        pusher().cloudChannel.unbind("reloadbranding" /* PusherEvents.reloadBranding */, loadThemeBranding);
        pusher().companyChannel.unbind("reloadbranding" /* PusherEvents.reloadBranding */, loadThemeBranding);
        pusher().applicationChannel.unbind("reloadbranding" /* PusherEvents.reloadBranding */, loadThemeBranding);
        (_a = pusher().applicationGroupChannel) === null || _a === void 0 ? void 0 : _a.bind("reloadbranding" /* PusherEvents.reloadBranding */, loadThemeBranding);
        pusher().applicationUserChannel.unbind("reloadprofile" /* PusherEvents.reloadProfile */, loadProfile);
        pusher().applicationUserChannel.unbind("reloaddatalist" /* PusherEvents.reloadDataList */, loadDataList);
        bootstrap(bootstrapPath);
    }
    function bootstrap(appConf) {
        bootstrapPath = appConf;
        // Replace history state with page path, prevent entry from login POST requesting resubmission
        window.history.replaceState(null, "", window.location.href);
        return m.request(appConf).then((app) => {
            var _a;
            mutableApplication(app);
            // Listen for common application-level messages
            pusherInit();
            pusher().applicationUserChannel.bind("reload" /* PusherEvents.reload */, reload);
            pusher().applicationUserChannel.bind("redirect" /* PusherEvents.redirect */, redirect);
            pusher().applicationUserChannel.bind("notification" /* PusherEvents.notification */, dialogRedraw);
            pusher().applicationUserChannel.bind("reloadbootstrap" /* PusherEvents.reloadBootstrap */, reloadBootstrap);
            pusher().cloudChannel.bind("reloadbranding" /* PusherEvents.reloadBranding */, loadThemeBranding);
            pusher().companyChannel.bind("reloadbranding" /* PusherEvents.reloadBranding */, loadThemeBranding);
            pusher().applicationChannel.bind("reloadbranding" /* PusherEvents.reloadBranding */, loadThemeBranding);
            (_a = pusher().applicationGroupChannel) === null || _a === void 0 ? void 0 : _a.bind("reloadbranding" /* PusherEvents.reloadBranding */, loadThemeBranding);
            pusher().applicationUserChannel.bind("reloadprofile" /* PusherEvents.reloadProfile */, loadProfile);
            pusher().applicationUserChannel.bind("reloaddatalist" /* PusherEvents.reloadDataList */, loadDataList);
            // Load branding and confirm Pusher connection
            return Promise.all([
                loadThemeBranding(),
                // TODO review timeout
                new Promise((resolve) => {
                    pusher().pusher.connection.bind("connected", () => {
                        pusher().pusher.connection.unbind("connected");
                        resolve();
                    });
                }),
                loadProfile(),
                loadDataList()
            ]).then(lodash__default["default"].noop);
        }).catch(errNotification);
    }

    var NavbarType;
    (function (NavbarType) {
        NavbarType["HEADER"] = "header";
        NavbarType["FOOTER"] = "footer";
        NavbarType["SUBHEADER"] = "subheader";
    })(NavbarType || (NavbarType = {}));
    var LogoutSize;
    (function (LogoutSize) {
        LogoutSize["SMALL"] = "small";
        LogoutSize["LARGE"] = "large";
        LogoutSize["DEFAULT"] = "default";
    })(LogoutSize || (LogoutSize = {}));

    function toPercent(pct) {
        return `${(pct * 100).toFixed(0)}%`;
    }
    function getLogoutWrapperClasses(size) {
        switch (size) {
            case LogoutSize.SMALL: return 'flex dn-l';
            case LogoutSize.LARGE: return 'dn flex-l';
            default: return 'flex';
        }
    }
    function filterNavList(logout, navList) {
        const hideLogout = !(application().auth && logout);
        return lodash__default["default"].reject(navList, lodash__default["default"].matches({ hideLogout }));
    }

    class NavbarCopyright {
        view({ attrs: { classes } }) {
            const { copyright } = branding();
            const { version } = application();
            return m__default["default"]("span.ma2.f7", {
                class: joinClasses([
                    classes,
                    theme().uiNavbarCopyright
                ]),
                title: version
            }, copyright ? [m__default["default"].trust("&copy; "), copyright] : null);
        }
    }

    class NavbarPoweredBy {
        view({ attrs: { classes } }) {
            const { poweredBy = {
                src: "https://cloud.sdxmessaging.com/resources/sdx/poweredby.svg",
                title: "Powered by Secure Digital Exchange Limited",
                href: "https://www.sdxmessaging.com/",
            } } = branding();
            return m__default["default"]("a.link.ma2.h-75[target=_blank][rel=noreferrer noopener]", {
                href: poweredBy.href
            }, m__default["default"]("img.w-100.h-100.mw3.mw4-l.o-80", {
                class: joinClasses([
                    classes,
                    theme().uiNavbarPoweredBy
                ]),
                src: poweredBy.src,
                title: poweredBy.title
            }));
        }
    }

    class NavbarProgress {
        view({ attrs: { saving, progress, classes } }) {
            const isSaving = saving ? saving() : false;
            const progressNum = isSaving && progress ? progress() : 0;
            return m__default["default"]("span.ma2.f3", {
                class: joinClasses([
                    progressNum ? undefined : "dn",
                    classes,
                    theme().uiNavbarProgress
                ])
            }, [
                toPercent(progressNum),
                m__default["default"]("i.ma2.f3.fal.fa-spinner", {
                    class: isSaving ? "fa-spin" : "dn"
                })
            ]);
        }
    }

    class NavbarVersion {
        view({ attrs: { classes } }) {
            const { version } = application();
            return m__default["default"]("span.ma2.f7", {
                class: joinClasses([
                    classes,
                    theme().uiNavbarVersion
                ]),
            }, version);
        }
    }

    class NavbarName {
        view({ attrs: { classes } }) {
            const { name } = application();
            return m__default["default"]("span.ma2.f7", {
                class: joinClasses([
                    classes,
                    theme().uiNavbarName
                ])
            }, name);
        }
    }

    class NavbarNameVersion {
        view({ attrs: { classes } }) {
            const { name, version } = application();
            return m__default["default"]("span.mh2.flex.self-stretch.items-center.f7", {
                class: joinClasses([
                    classes,
                    theme().uiNavbarNameVersion
                ])
            }, name + " " + version);
        }
    }

    class NavbarSalutation {
        view({ attrs: { classes, salutation } }) {
            const { firstName, lastName } = profile();
            const _salutation = lodash__default["default"].assign({
                pre: "Welcome, ",
                showFirstName: true,
                showLastName: false,
                post: "!"
            }, salutation);
            const { showFirstName, showLastName, pre, post } = _salutation;
            return m__default["default"]("span.ma2", {
                class: joinClasses([
                    classes,
                    theme().uiNavbarSalutation
                ]),
            }, `${pre}${showFirstName ? firstName : ""}${showFirstName && showLastName ? " " : ""}${showLastName ? lastName : ""}${post}`);
        }
    }

    class NavbarImage {
        view({ attrs: { src, classes, height, width, link, linkToVaultRoot } }) {
            return src ? m__default["default"]("img", {
                src,
                onclick: () => {
                    var _a;
                    if (link === null || link === void 0 ? void 0 : link.href) {
                        return window.open(link.href, link.target || "_self");
                    }
                    if (linkToVaultRoot) {
                        return window.open((_a = application().auth) === null || _a === void 0 ? void 0 : _a.endpoint, (link === null || link === void 0 ? void 0 : link.target) || "_self");
                    }
                    return null;
                },
                class: joinClasses([
                    (link === null || link === void 0 ? void 0 : link.href) || linkToVaultRoot ? "pointer" : "",
                    classes,
                    theme().uiNavbarImage
                ]),
                height,
                width
            }) : null;
        }
    }

    class NavbarText {
        view({ attrs: { classes, text } }) {
            return m__default["default"]("span.ma2", {
                class: joinClasses([
                    classes,
                    theme().uiNavbarText
                ]),
            }, text);
        }
    }

    class NavbarLink {
        view({ attrs: { classes, href, text, active = false } }) {
            return m__default["default"]("a.link", {
                class: joinClasses([
                    classes,
                    theme().uiNavbarLink,
                    active ? theme().uiNavbarLinkActive : undefined
                ]),
                // TODO is there a better way here?
                onclick: () => m__default["default"].redraw(),
                href
            }, text);
        }
    }

    function logout(path) {
        m__default["default"].request(path).then(reload);
    }
    class NavbarLogout {
        view({ attrs: { classes, size } }) {
            // We can safely assume auth is defined here
            const auth = application().auth;
            if (auth) {
                const { logoutPath, logoutLabel = "Logout", logoutIcon = "fal fa-sign-out-alt", } = auth;
                return m__default["default"]("span.mh2.self-stretch.items-center.pointer", {
                    class: joinClasses([
                        classes,
                        getLogoutWrapperClasses(size),
                        theme().uiNavbarLogout,
                        "ripple"
                    ]),
                    onclick: () => logout(logoutPath)
                }, [
                    logoutLabel ? m__default["default"]("span.mr2", {
                        class: joinClasses([theme().uiNavbarLogoutLabel]),
                    }, logoutLabel) : null,
                    m__default["default"](`i.fal.fa-fw.fw4[aria-hidden=true]${logoutLabel ? '' : '.fal.fa-2x'}`, {
                        class: joinClasses([
                            theme().uiNavbarLogoutIcon,
                            logoutIcon
                        ])
                    })
                ]);
            }
            return null;
        }
    }

    function getNavComponent(attrs, index) {
        var _a;
        const { navList, saving, progress, logout } = attrs;
        const { role = "" } = profile();
        const showLoggedout = logout && "auth" in application();
        const navItem = navList[index];
        // Don't render if role matches the hide role
        if ((_a = navItem.hide) === null || _a === void 0 ? void 0 : _a.includes(role)) {
            return null;
        }
        const classes = `${createResponsiveClass(lodash__default["default"].assign({ key: `navItem_${index}_${navItem.type}` }, navItem))}`;
        const componentAttrs = Object.assign({ saving, progress, classes }, navItem);
        const componentMap = {
            [0 /* NavType.spacer */]: () => m__default["default"](".center", { class: classes }),
            [1 /* NavType.divider */]: () => m__default["default"]("span", { class: classes }, "|"),
            [8 /* NavType.copyright */]: () => m__default["default"](NavbarCopyright, componentAttrs),
            [9 /* NavType.poweredBy */]: () => m__default["default"](NavbarPoweredBy, componentAttrs),
            [10 /* NavType.progress */]: () => m__default["default"](NavbarProgress, componentAttrs),
            [11 /* NavType.version */]: () => m__default["default"](NavbarVersion, componentAttrs),
            [12 /* NavType.name */]: () => m__default["default"](NavbarName, componentAttrs),
            [13 /* NavType.nameVersion */]: () => m__default["default"](NavbarNameVersion, componentAttrs),
            [14 /* NavType.salutation */]: () => m__default["default"](NavbarSalutation, componentAttrs),
            [2 /* NavType.image */]: () => m__default["default"](NavbarImage, componentAttrs),
            [3 /* NavType.text */]: () => m__default["default"](NavbarText, componentAttrs),
            [4 /* NavType.link */]: () => m__default["default"](NavbarLink, Object.assign({ active: window.location.hash === navItem.href
                    || lodash__default["default"].endsWith(window.location.pathname, navItem.href) }, componentAttrs)),
            [5 /* NavType.logout */]: () => showLoggedout && m__default["default"](NavbarLogout, Object.assign({ size: LogoutSize.DEFAULT }, componentAttrs)),
            [6 /* NavType.logoutSmall */]: () => showLoggedout && m__default["default"](NavbarLogout, Object.assign({ size: LogoutSize.SMALL }, componentAttrs)),
            [7 /* NavType.logoutLarge */]: () => showLoggedout && m__default["default"](NavbarLogout, Object.assign({ size: LogoutSize.LARGE }, componentAttrs)),
            [15 /* NavType.dropDown */]: () => showLoggedout && m__default["default"](NavbarDropDown, {
                saving, progress, logout,
                navList: navItem.navList
            })
        };
        if (navItem.type in componentMap) {
            return componentMap[navItem.type]();
        }
        else {
            return buildComponent(navItem);
        }
    }
    function buildNavbar(attrs) {
        return lodash__default["default"].map(attrs.navList, (_, i) => {
            return getNavComponent(attrs, i);
        });
    }
    class NavbarDropDown {
        constructor() {
            this.menuOpen = false;
            this.evListener = (ev) => {
                if (!this.dom.contains(ev.target)) {
                    this.menuOpen = false;
                    m__default["default"].redraw();
                }
            };
        }
        onclick() {
            this.menuOpen = !this.menuOpen;
        }
        oncreate({ dom }) {
            this.dom = dom;
            window.addEventListener("click", this.evListener);
        }
        onremove() {
            window.removeEventListener("click", this.evListener);
        }
        view({ attrs }) {
            // We can safely assume auth is defined here
            const { firstName, lastName } = profile();
            return m__default["default"]("div", {
                class: theme().uiNavbarDropDownWrapper
            }, [
                m__default["default"]("div", {
                    class: theme().uiNavbarDropDownMenu,
                    onclick: () => this.onclick()
                }, [
                    m__default["default"]("h4.fw4.mv0.mr2", `${firstName} ${lastName}`),
                    m__default["default"]("i.fas.fa-caret-down", {
                        style: {
                            transform: this.menuOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.3s ease-out",
                        }
                    })
                ]),
                this.menuOpen && m__default["default"]("div", {
                    class: theme().uiNavbarDropDownMenuContent
                }, buildNavbar(attrs))
            ]);
        }
    }

    class Navbar {
        view({ attrs: { type, saving, progress, logout } }) {
            if (type === NavbarType.HEADER) {
                const navList = filterNavList(logout, branding().header);
                return navList.length
                    ? buildNavbar({ saving, progress, logout, navList })
                    : null;
            }
            else if (type === NavbarType.FOOTER) {
                const navList = filterNavList(logout, branding().footer);
                return navList.length
                    ? buildNavbar({ saving, progress, logout, navList })
                    : null;
            }
            else if (type === NavbarType.SUBHEADER) {
                const navList = filterNavList(logout, branding().subheader);
                return navList.length
                    ? m__default["default"](".flex.items-center.self-center.w-100.flex-shrink-0", {
                        class: joinClasses([theme().uiSubheader]),
                    }, buildNavbar({ saving, progress, logout, navList })) : null;
            }
            return null;
        }
    }

    class Layout {
        view({ attrs: { saving, progress, fullScreen, responsiveHeader, responsiveFooter, logout = true, header, footer }, children }) {
            const showFooter = filterNavList(logout, branding().footer).length > 0;
            const showHeader = filterNavList(logout, branding().header).length > 0;
            const showSubheader = filterNavList(logout, branding().subheader).length > 0;
            const fsStyle = fullScreen ? {
                "max-width": "unset"
            } : {};
            return [
                // Toast notification
                m__default["default"](Dialog),
                // Header
                header
                    ? header
                    : m__default["default"](".flex.items-center.justify-center.z-1", {
                        class: joinClasses([theme().uiHeaderWrapper])
                    }, showHeader && m__default["default"]("nav.items-center.self-center.w-100.z-1.h3.flex-shrink-0", {
                        class: joinClasses([
                            theme().uiHeader,
                            responsiveHeader ? "dn flex-l" : "flex"
                        ]),
                        style: fsStyle
                    }, m__default["default"](Navbar, {
                        type: NavbarType.HEADER, saving, progress, logout
                    }))),
                // Central
                m__default["default"]("main.flex-auto.flex.flex-column.self-center.w-100.h-100.overflow-x-hidden", {
                    class: joinClasses([theme().uiLayout]),
                    style: fsStyle
                }, 
                // Subheader
                showSubheader && m__default["default"](Navbar, {
                    type: NavbarType.SUBHEADER, saving, progress, logout
                }), children),
                // Footer
                footer
                    ? footer
                    : m__default["default"](".flex.items-center.justify-center.z-1", showFooter && m__default["default"]("nav.w-100.items-center.flex-shrink-0", {
                        class: joinClasses([
                            theme().uiFooter,
                            responsiveFooter ? "dn flex-l" : "flex"
                        ]),
                        style: fsStyle
                    }, m__default["default"](Navbar, {
                        type: NavbarType.FOOTER, saving, progress, logout
                    })))
            ];
        }
    }

    function basic(appConf, { toastMessage, title = "UNTITLED", lines = [], returnBtn }) {
        if (toastMessage) {
            dialog(Object.assign({ type: exports.DialogType.notification }, toastMessage));
        }
        return bootstrap(appConf).then(() => {
            const { auth, footer } = application();
            m__default["default"].mount(document.getElementById("page"), {
                view: () => m__default["default"](Layout, [
                    m__default["default"](".flex-auto.overflow-x-hidden.overflow-y-auto.safari-bug ", [
                        m__default["default"](".ph4", [
                            m__default["default"]("p.f3.fw4", title),
                            buildComponent({
                                type: "basic",
                                data: lines
                            }),
                            returnBtn && auth ? buildComponent({
                                type: "basic",
                                data: [{
                                        href: auth.loginPath,
                                        text: "RETURN TO LOGIN"
                                    }]
                            }) : null
                        ]),
                        // Company footer
                        footer ? buildComponent(footer) : null
                    ])
                ])
            });
        });
    }

    exports.AnimatedFabItem = AnimatedFabItem;
    exports.Dialog = Dialog;
    exports.DialogHandler = DialogHandler;
    exports.FormBuilder = FormBuilder;
    exports.FormLayout = FormLayout;
    exports.FormState = FormState;
    exports.GridCellRenderer = GridCellRenderer;
    exports.ItemRow = ItemRow;
    exports.PanelHeader = PanelHeader;
    exports.PanelSubheader = PanelSubheader;
    exports.PinchZoom = PinchZoom;
    exports.ResponsiveThemeHandler = ResponsiveThemeHandler;
    exports.SearchBox = SearchBox;
    exports.Themable = Themable;
    exports.application = application;
    exports.applyFileMap = applyFileMap;
    exports.applyMap = applyMap;
    exports.applyMerge = applyMerge;
    exports.applyTemplate = applyTemplate;
    exports.assembleFormField = assembleFormField;
    exports.assembleFormFieldList = assembleFormFieldList;
    exports.basic = basic;
    exports.branding = branding;
    exports.buildComponent = buildComponent;
    exports.buildComponentList = buildComponentList;
    exports.buildFormFields = buildFormFields;
    exports.buildFormLayout = buildFormLayout;
    exports.buildTemplates = buildTemplates;
    exports.buttonContextMapper = buttonContextMapper;
    exports.canEdit = canEdit;
    exports.cellRendererMap = cellRendererMap;
    exports.colorContextMapper = colorContextMapper;
    exports.colorMapper = colorMapper;
    exports.createResponsiveClass = createResponsiveClass;
    exports.deepMerge = deepMerge;
    exports.deserialise = deserialise;
    exports.dialog = dialog;
    exports.dialogClose = dialogClose;
    exports.dialogHandler = dialogHandler;
    exports.dialogRedraw = dialogRedraw;
    exports.errNotification = errNotification;
    exports.extractFields = extractFields;
    exports.fileExt = fileExt;
    exports.fileExtNameOnly = fileExtNameOnly;
    exports.fileIcon = fileIcon;
    exports.filterByProperty = filterByProperty;
    exports.flattenObject = flattenObject;
    exports.formatDate = formatDate;
    exports.formatTime = formatTime;
    exports.getData = getData;
    exports.getDocumentRequestAuthHeaders = getDocumentRequestAuthHeaders;
    exports.getFileStream = getFileStream;
    exports.getFileValue = getFileValue;
    exports.getFiles = getFiles;
    exports.getISODate = getISODate;
    exports.getProp = getProp;
    exports.getPropStream = getPropStream;
    exports.hasValue = hasValue;
    exports.humaniseByteCount = humaniseByteCount;
    exports.humaniseErrorCode = humaniseErrorCode;
    exports.humaniseTimeValue = humaniseTimeValue;
    exports.isFileField = isFileField;
    exports.isPropField = isPropField;
    exports.isSignField = isSignField;
    exports.isTextField = isTextField;
    exports.itemsForCategory = itemsForCategory;
    exports.joinClasses = joinClasses;
    exports.loadDataList = loadDataList;
    exports.mapMixin = mapMixin;
    exports.mapToObject = mapToObject;
    exports.mergeMixin = mergeMixin;
    exports.parseDateStr = parseDateStr;
    exports.parseDateTimeStr = parseDateTimeStr;
    exports.parseDateTimeValue = parseDateTimeValue;
    exports.parseDateValue = parseDateValue;
    exports.parseIso = parseIso;
    exports.parseTimeStr = parseTimeStr;
    exports.parseTimeValue = parseTimeValue;
    exports.pdfViewerFactory = pdfViewerFactory;
    exports.pickById = pickById;
    exports.pickByIdStream = pickByIdStream;
    exports.pickByProperty = pickByProperty;
    exports.profile = profile;
    exports.pusher = pusher;
    exports.rectToHtml = rectToHtml;
    exports.registerCellRenderer = registerCellRenderer;
    exports.registerComponent = registerComponent;
    exports.registerFileMapFn = registerFileMapFn;
    exports.registerMapFn = registerMapFn;
    exports.registerMergeFn = registerMergeFn;
    exports.removeByProperty = removeByProperty;
    exports.sdxRequest = sdxRequest;
    exports.serialise = serialise;
    exports.setCssVariables = setCssVariables;
    exports.setMap = setMap;
    exports.simpleResponse = simpleResponse;
    exports.size = size;
    exports.smallDevice = smallDevice;
    exports.streamArrayPullAt = streamArrayPullAt;
    exports.streamArrayPush = streamArrayPush;
    exports.theme = theme;
    exports.tinyDevice = tinyDevice;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
