/// <reference types="mithril" />
import { StyleSheet } from 'jss';
import lodash from 'lodash';
import * as _sdxmessaging_ui_widgets from '@sdxmessaging/ui-widgets';
import { IConfig, IOption, TProp, IFile, TField, IPropWidget, ICheckboxField, IOptionField, ITextareaField, IRadioField, IFileWidget, ISignField } from '@sdxmessaging/ui-widgets';
import * as m from 'mithril';
import m__default, { ComponentTypes, CommonAttributes, Children, ClassComponent, CVnode, CVnodeDOM, RequestOptions, RouteOptions } from 'mithril';
import stream from 'mithril/stream';
import { ColDef, GridOptions, ICellRendererComp, ICellRendererParams } from 'ag-grid-community';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { DocumentInitParameters } from 'pdfjs-dist/types/src/display/api';
import Pusher, { Channel } from 'pusher-js';

type TOverwriteKeys = Pick<IUITheme, "uiBlockLinesWrapper">;
interface ILineElement {
    readonly selector: string;
    readonly child: string;
    readonly colorSelector?: keyof typeof Colors;
    readonly bgColorSelector?: keyof typeof Colors;
    readonly classes?: string;
}
type TLines = string | ReadonlyArray<string | ILineElement>;
interface IBlockLinesData {
    readonly lines?: TLines;
    readonly blockSelector?: string;
    readonly applyTheme?: Partial<TOverwriteKeys>;
    readonly classes?: string;
}

interface IPusherService {
    readonly pusher: Pusher;
    readonly presenceEnabled: boolean;
    readonly cloudChannel: Channel;
    readonly companyChannel: Channel;
    readonly userChannel: Channel;
    readonly applicationChannel: Channel;
    readonly applicationUserChannel: Channel;
    /** Channel for any member/sub-companies like Howden from Millstream or Firth Finance from CCA */
    readonly groupChannel?: Channel;
    /** Application channel for any member/sub-companies like Howden from Millstream or Firth Finance from CCA */
    readonly applicationGroupChannel?: Channel;
}
interface IRedirect {
    readonly url: string;
}

declare const enum JsonActionType {
    actionCardConfirm = "actionCardConfirm",
    dialog = "dialog",
    openWindow = "openWindow"
}

interface IReset {
    readonly type: ResetType | string;
    readonly endpoint: string;
    readonly username: string;
    readonly hash: string;
    readonly inputLabel?: string;
    readonly inputPlaceholder?: string;
}

declare const enum AuthType {
    DOBPostcode = "dobPostcode",
    Password = "password"
}
declare const enum ResetType {
    Email = "email",
    Mobile = "mobile"
}
interface IAuth {
    readonly type: AuthType;
    /** Replace Password or Postcode input with PIN input */
    readonly pinInput?: boolean;
    readonly loginPath: string;
    readonly logoutPath: string;
    readonly passResetPath: string;
    readonly endpoint: string;
    readonly logoutLabel?: string;
    readonly logoutIcon?: string;
    readonly username: string;
    readonly title: string;
    readonly lines: ReadonlyArray<string>;
    readonly inputLines?: ReadonlyArray<string>;
    readonly postLines?: ReadonlyArray<string>;
    readonly loginFormClass?: string;
    readonly loginBtnText?: string;
    readonly loginBtnIcon?: string;
    readonly loginBtnClass?: string;
    readonly helpLinkText?: string;
    readonly sessionExpiredMessage?: string;
    readonly preForm?: ReadonlyArray<IBlockLinesData>;
    readonly helpTitle: string;
    readonly helpLines: ReadonlyArray<string>;
    readonly helpInputLines?: ReadonlyArray<string>;
    readonly postHelpLines?: ReadonlyArray<string>;
    readonly helpBtnText?: string;
    readonly helpBtnIcon?: string;
    readonly returnLinkText?: string;
    /** Landing page config */
    readonly landing?: ILanding;
    /** Password reset config */
    readonly reset?: IReset;
    readonly documentRequestAuth?: Record<string, string> | string;
    readonly showInlineAuthFailure?: boolean;
    readonly authFailureMessage?: string;
}
interface IAuthDobPostCode extends IAuth {
    readonly type: AuthType.DOBPostcode;
    readonly dobLabel?: string;
    readonly dobPlaceholder?: string;
    readonly postcodeLabel?: string;
    readonly postcodePlaceholder?: string;
}
interface IAuthPassword extends IAuth {
    readonly type: AuthType.Password;
    readonly passwordLabel?: string;
    readonly passwordPlaceholder?: string;
}
interface ILanding {
    readonly endpoint: string;
    readonly title?: string;
    readonly lines: ReadonlyArray<string>;
    readonly label: string;
    readonly placeholder: string;
    readonly postLines: ReadonlyArray<string>;
    readonly helpLinkText?: string;
    readonly pre?: ReadonlyArray<ICustom>;
    readonly post?: ReadonlyArray<ICustom>;
}
type TAuth = IAuthDobPostCode | IAuthPassword;

interface IPusher {
    readonly apiKey: string;
    readonly cloudChannel: string;
    readonly companyChannel: string;
    readonly userChannel: string;
    readonly applicationChannel: string;
    readonly applicationUserChannel: string;
    readonly applicationGroupChannel?: string;
    readonly groupChannel?: string;
    readonly authEndpoint?: string;
}
declare const enum DataType {
    Asset = "asset",
    Item = "item",
    Model = "model",
    Template = "template",
    TemplateData = "templateData"
}
declare const enum DataScope {
    Application = "application",
    User = "user"
}
interface IDataSource {
    readonly scope: DataScope;
    readonly type: DataType;
    readonly path: string;
}
interface IObjectSource extends IDataSource {
    type: DataType.TemplateData;
    matchTemplate: {
        readonly key: string;
        readonly pattern?: string;
        readonly flags?: string;
        readonly matchCase?: boolean;
    };
}
type TDataSource = IDataSource | IObjectSource;
interface IRoleOption extends IOption {
    readonly role?: string;
}
interface IUpload {
    /** Enforce limit to the number of files */
    readonly maxNumFiles?: number;
    readonly singleMaxSize?: number;
    readonly accMaxSize?: number;
    /** Combine files into a single pdf */
    readonly combineFiles?: boolean;
    readonly combineFilesToggle?: boolean;
    readonly buttonText?: string;
    readonly contextList?: ReadonlyArray<IRoleOption>;
    readonly uploaderTitle?: string;
}
interface IAssetUpload extends IUpload {
    readonly path: string;
}
interface IVault {
    readonly sourceList?: ReadonlyArray<TDataSource>;
    /** Item json update path*/
    readonly itemUpdate?: string;
    /** Item table upload route */
    readonly assetUpload?: string | IAssetUpload;
    /** Item file upload path */
    readonly fileUpload?: string;
    /** @deprecated file/signature submission no longer accept arbitrary delay */
    readonly fileDelay?: number;
    /** IFile remoteUrl prefix if not set */
    readonly remotePath?: string;
}
interface IDataPath {
    readonly path: string;
    readonly id: string;
}
interface IApplication {
    readonly pusher: IPusher;
    readonly name?: string;
    readonly version?: string;
    readonly profilePath?: string;
    readonly brandingPath?: string;
    readonly themePath?: string;
    readonly dataPathList?: ReadonlyArray<IDataPath>;
    readonly auth?: TAuth;
    readonly vault?: IVault;
    readonly loginPreComponents?: ICustom[];
    readonly loginPostComponents?: ICustom[];
    /** Component typically placed at the bottom of basic pages */
    readonly footer?: ICustom;
    readonly uiWidgets?: Partial<IConfig>;
    readonly requestParty?: IRequestParty;
}
interface IRequestParty {
    bodyText?: string;
    title?: string;
    path: string;
    subTitle?: string;
}

interface IReadonlyStream<T> {
    (): T;
    map<U>(f: (current: T) => U | typeof stream.SKIP): stream<U>;
    of(val: T): stream<T>;
    ap<U>(f: stream<(value: T) => U>): stream<U>;
    end: stream<boolean>;
    toJSON(): string;
    valueOf(): T;
}

interface IMutableProfile {
    licensee: string;
    salutation?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    mobile?: string;
    addressLineOne?: string;
    addressLineTwo?: string;
    postcode?: string;
    role?: string;
    assigneeUuid?: string;
}
interface IProfile extends Readonly<IMutableProfile> {
    readonly role?: string;
}
declare const profile: IReadonlyStream<IProfile>;

type TDataCardOverwriteKeys = Pick<IUITheme, "uiDataCardGridWrapper" | "uiDataCardWrapper" | "uiDataCardHeaderWrapper" | "uiDataCardHeader" | "uiDataCardCategoryLabel" | "uiDataCardSectionWrapper" | "uiDataCardSectionLabel" | "uiDataCardSectionItemWrapper" | "uiDataCardSectionItemLabel" | "uiDataCardSectionItemValue" | "uiDataCardButton">;
declare const enum DataCardDisplayType {
    detailed = "detailed",
    overview = "overview"
}
type TDataMap = Record<string, readonly [string, string | ReadonlyArray<string>]>;
interface IDataCard {
    readonly pre?: ReadonlyArray<ICustom>;
    readonly post?: ReadonlyArray<ICustom>;
    readonly displayType: DataCardDisplayType;
    readonly context?: ColorContext;
    readonly buttonContext?: ColorContext;
    readonly dataMap?: TDataMap;
    readonly applyTheme?: TDataCardOverwriteKeys;
    readonly header?: string;
    readonly categoryLabel?: string;
    readonly button?: {
        readonly label?: string;
        readonly icon?: string;
        readonly action?: {
            readonly type: JsonActionType;
            readonly props: Record<string, any>;
        };
    };
}

interface IBaseField<T> {
    readonly key: string;
    readonly input?: TField;
    readonly data?: T;
    readonly group?: string;
    readonly fieldSet?: string;
    readonly focusOnView?: boolean;
    readonly user?: IFieldUser;
}
interface IFieldSet {
    readonly name: string;
    readonly selectionCount: number;
}
interface IFormField<T = unknown> extends IBaseField<T> {
    readonly input: TField;
    readonly initialValue?: TProp;
    readonly fileValue?: string;
}
interface IFieldUser {
    readonly name: string;
    licensee?: string;
    readonly role?: string;
    requestParty?: string;
    invitedParty?: string;
    readonly private?: boolean;
}
interface IComputed {
    readonly keys: ReadonlyArray<string>;
    readonly map?: string;
    readonly merge?: string;
    readonly args?: ReadonlyArray<TProp>;
}
interface IComputedField<T = unknown> extends IBaseField<T> {
    readonly computed: IComputed;
}
type TFormField<T = unknown> = IFormField<T> | IComputedField<T>;
interface IComputedFunc {
    (inp: stream<TProp>, args?: ReadonlyArray<TProp>): stream<TProp>;
}
interface IComputedMixin {
    (inp: TProp, args?: ReadonlyArray<TProp>): TProp;
}
interface IFileFunc {
    (inp: stream<IFile[]>): stream<TProp>;
}
interface IMergeFunc {
    (inp: stream<TProp>[]): stream<TProp>;
}
interface IMergeMixin {
    (inp: TProp[]): TProp;
}
declare const enum WidgetType {
    Prop = 1,
    File = 2
}
interface IFormStream {
    readonly computed: boolean;
    readonly pure: boolean;
    readonly value: stream<TProp>;
}
interface IFormPropStream extends IFormStream {
    readonly type: WidgetType.Prop;
}
interface IFormFileStream extends IFormStream {
    readonly type: WidgetType.File;
    readonly files: stream<IFile[]>;
}
type TFormStream = IFormPropStream | IFormFileStream;
type TStreamMap = Record<string, TFormStream>;
type TPropComponent = ComponentTypes<IPropWidget<ICheckboxField>> | ComponentTypes<IPropWidget<IOptionField>> | ComponentTypes<IPropWidget> | ComponentTypes<IPropWidget<ITextareaField>> | ComponentTypes<IPropWidget<IRadioField>>;
type TFileComponent = ComponentTypes<IFileWidget> | ComponentTypes<IFileWidget<ISignField>>;
interface IBuiltFormField<T = unknown> extends IBaseField<T> {
    readonly computed: boolean;
    readonly type: WidgetType;
    readonly widget?: TPropComponent | TFileComponent;
    readonly value?: stream<TProp>;
    readonly files?: stream<IFile[]>;
}
interface IFormLayout {
    readonly theme: IUIComponentBranding;
    readonly subgroups?: Record<string, IFormLayout>;
}
interface IFormUpdate {
    readonly key: string;
    readonly condition?: TCondition;
    readonly truthy?: TProp;
    readonly falsy?: TProp;
}
interface IFormState {
    readonly observe: string;
    readonly update?: ReadonlyArray<IFormUpdate>;
}
type TObserveState = "required" | "readonly" | "disabled" | "dn";
type TOperator = ">" | "<" | "===" | "!==" | "<=" | ">=";
type TCondition = [TOperator, TProp];
interface IFieldObserve {
    readonly observe?: string;
    readonly condition?: TCondition;
    readonly truthy?: TObserveState;
    readonly falsy?: TObserveState;
}
type TFormWrapper = Record<string, stream<void>>;
interface IFlowCondition {
    readonly field: string;
    readonly is: TCondition;
}
interface IFlowStep {
    readonly key: string;
    readonly condition?: IFlowCondition;
}
interface IFormFlow<T = unknown> {
    readonly key: string;
    readonly group: string;
    readonly data: T;
    readonly next: ReadonlyArray<IFlowStep>;
}

declare class FormFlow<T = unknown, S = unknown> {
    private readonly form;
    private static readonly maxSteps;
    private readonly stepStack;
    private _stepIdx;
    private get stepIdx();
    private set stepIdx(value);
    get step(): IFormFlow<S>;
    private set step(value);
    private _fields;
    get fields(): readonly IBuiltFormField<T>[];
    /** Current step number */
    get currentStep(): number;
    /** Total count of steps in flow (so far) */
    get totalSteps(): number;
    private _minSteps;
    /** Minimum number of steps to complete flow */
    get minSteps(): number;
    private set minSteps(value);
    private _maxSteps;
    /** Maximum number of steps to complete flow */
    get maxSteps(): number;
    private set maxSteps(value);
    private readonly startKey;
    private readonly flowMap;
    constructor(form: FormBuilder<T>, flowList: ReadonlyArray<IFormFlow<S>>);
    /**
     * Validate form flow: Try all paths from start to end.
     * Track shortest and longest paths.
     */
    private pathToEnd;
    private updateStep;
    /** Return first flow step that has a passing condition or no condition at all */
    private getNextStep;
    start(): void;
    /** Advance to the next applicable form flow step */
    advance(): void;
    /** Go back to the previous form flow step */
    back(): void;
    /** Go forward to the next form flow step */
    forward(): void;
}

type TPropOr = TProp | null;
type TSerializeTransform = (key: string, value?: TProp) => TProp | null | undefined;
declare class FormBuilder<T = unknown, S = unknown> {
    static complexityLimit: number;
    readonly fields: ReadonlyArray<IBuiltFormField<T>>;
    readonly fieldScore: number;
    get formDuration(): string;
    private readonly _streamMap;
    private state?;
    private _flow?;
    get flow(): FormFlow<T, S>;
    private _layout;
    /** @deprecated - use getValue, getStream, and setValue helpers */
    get streamMap(): TStreamMap;
    static isComputed<T>(field: TFormField<T>): field is IComputedField<T>;
    static isProp<T>(widget: IBuiltFormField<T>): boolean;
    private static getStreams;
    private static depthTest;
    private static sortComputed;
    constructor(fieldList: ReadonlyArray<TFormField<T>>);
    destroy(): void;
    trackState(observeList: ReadonlyArray<IFormState>): FormState<T>;
    addFlow(flowList: ReadonlyArray<IFormFlow<S>>): FormFlow<T, S>;
    advanceFlow(): void;
    renderFlow(override?: Partial<TField>): (m.Vnode<_sdxmessaging_ui_widgets.IFileWidget<_sdxmessaging_ui_widgets.IField>, {}> | m.Vnode<_sdxmessaging_ui_widgets.IPropWidget<_sdxmessaging_ui_widgets.IField>, {}> | null)[];
    private setLayout;
    /**
     * Create layout for all form fields
     * @returns layout id for use by `renderLayout`
     */
    registerLayout(layout: IFormLayout): string;
    /**
     * Create layout for all fields in group
     * @returns layout id for use by `renderLayout`
     */
    registerLayout(layout: IFormLayout, group: string): string;
    renderLayout(layoutId: string, override?: Partial<TField>): m.Children;
    private renderField;
    render(override?: Partial<TField>): (m.Vnode<_sdxmessaging_ui_widgets.IFileWidget<_sdxmessaging_ui_widgets.IField>, {}> | m.Vnode<_sdxmessaging_ui_widgets.IPropWidget<_sdxmessaging_ui_widgets.IField>, {}> | null)[];
    getValue(key: string, defaultValue?: TPropOr): TPropOr;
    getStream(key: string): stream<TProp> | undefined;
    setValue(key: string, value: TProp): void;
    setFile(key: string, value: IFile[]): void;
    /**
     * Initialise form field values from given object and write form changes
     * back to given object, form fields and object values are matched by key
     * @returns wrapper instance, required by `unwrap`
     */
    wrap<T extends object>(input: T, keys?: ReadonlyArray<string>): TFormWrapper;
    /**
     * Initialise form field values from given object and write form changes
     * back to given object, object values are written based on keys of inputs in form,
     * no matter if values from original object are undefined or not
     * @returns wrapper instance, required by `unwrap`
     */
    wrapAll<T extends object>(input: T, excludeKeys?: ReadonlyArray<string>): TFormWrapper;
    wrapArray<T extends object>(inputs: T[], excludeKeys?: ReadonlyArray<string>): TFormWrapper;
    /**
     * End sync between the given object and the built form
     */
    unwrap(wrapper: TFormWrapper): void;
    private static serializeFieldList;
    /**
     * Serialize form non-computed fields into a tuple of records for prop fields, and file fields
     */
    serialize(transform?: TSerializeTransform): [Record<string, TProp>, Record<string, IFile[]>];
    /**
     * Serialize form computed fields into a tuple of records for prop fields, and file fields
     */
    serializeComputed(transform?: TSerializeTransform): [Record<string, TProp>, Record<string, IFile[]>];
    /**
     * Serialize form into a record for prop fields with not input (pure computed)
     */
    serializePure(transform?: TSerializeTransform): Record<string, TProp>;
    deserialize(data: Record<string, unknown>): void;
    /** @deprecated Use deserialize */
    deserialise(data: Record<string, unknown>): void;
    patchInput(fieldKey: string, update: Partial<TField>): void;
}

declare function assembleFormField({ type, input, widget, value, files }: IBuiltFormField, inputOverride?: Partial<TField>): m__default.Vnode<IFileWidget<_sdxmessaging_ui_widgets.IField>, {}> | m__default.Vnode<IPropWidget<_sdxmessaging_ui_widgets.IField>, {}> | null;
declare function assembleFormFieldList(fields: ReadonlyArray<IBuiltFormField>, inputOverride?: Partial<TField>): (m__default.Vnode<IFileWidget<_sdxmessaging_ui_widgets.IField>, {}> | m__default.Vnode<IPropWidget<_sdxmessaging_ui_widgets.IField>, {}> | null)[];
declare function isPropField<T>(widget: IBuiltFormField<T>): boolean;
declare function isTextField<T>(widget: IBuiltFormField<T>): boolean | undefined;
declare function isFileField<T>(widget: IBuiltFormField<T>): boolean;
declare function isSignField<T>(widget: IBuiltFormField<T>): boolean;

declare const dobRegex: RegExp;
declare const postCodeRegex: RegExp;
declare function mapMixin(func: IComputedMixin): IComputedFunc;
declare function applyMap(key: string | undefined, inp: stream<TProp>, args?: ReadonlyArray<TProp>): stream<TProp>;
declare function registerMapFn(key: string, func: IComputedFunc): void;
declare function applyFileMap(key: string, inp: stream<IFile[]>): stream<TProp>;
declare function registerFileMapFn(key: string, func: IFileFunc): void;

declare function mergeMixin(func: IMergeMixin): IMergeFunc;
declare function applyMerge(key: string | undefined, inp: stream<TProp>[]): stream<TProp>;
declare function registerMergeFn(key: string, func: IMergeFunc): void;

declare class PinchZoom {
    private container;
    private viewer;
    private onChange;
    private startX;
    private startY;
    private startDistance;
    private scale;
    private touchDistance;
    private start;
    private boundStart;
    private move;
    private boundMove;
    private end;
    private boundEnd;
    constructor(container: HTMLElement, viewer: HTMLElement, onChange: (scale: number) => void);
    destroy(): void;
}

declare function evaluateCondition(val: TProp | undefined, [operator, compareVal]: TCondition): boolean;
declare class FormState<T = unknown> {
    private static readonly stateMap;
    private trackMap;
    private streams;
    constructor(form: FormBuilder<T>, observeList: ReadonlyArray<IFormState>);
    destroy(): void;
    getState({ observe, truthy, falsy, condition }?: IFieldObserve): Partial<TField>;
}

declare const enum DocumentStatus {
    NOT_SENT = "NOT_SENT",
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}
interface IDocumentState {
    readonly licensee: string;
    readonly name: string;
    readonly status: DocumentStatus;
}
interface IDocumentStateEntry {
    name: string;
    licensee: string;
    status: DocumentStatus;
    uuid: string;
}
interface ICustomMetadata {
    documentState: Record<string, IDocumentStateEntry>;
    overlays: Record<string, IOverlay>;
}
declare const enum PdfState {
    view = "view",
    call = "call",
    edit = "edit",
    complete = "complete",
    custom = "custom"
}
type TPdfInitialStates = Exclude<PdfState, PdfState.complete>;

interface ICustomColDef extends ColDef {
    readonly cellRenderer: string;
}

declare const enum ActionType {
    list = "list",
    view = "view",
    edit = "edit",
    open = "open",
    custom = "comp",
    pdf = "pdf",
    form = "form",
    overlay = "overlay",
    pureComputed = "pureComputed",
    annotation = "annotation"
}
interface IDataAction {
    readonly _id: string;
    readonly type: ActionType | string;
    readonly label: string;
}
interface IComponentAction extends IDataAction {
    comp: ICustom;
}
interface ISubmit {
    readonly buttonText?: string;
    readonly preText?: string;
    readonly postText?: string;
    readonly validationMessage?: string;
}
interface IAssignee {
    readonly uuid: string;
    readonly name: string;
    readonly index: number;
}
interface IPdfForm extends IDataAction {
    readonly type: ActionType.form | "form";
    readonly icon?: string;
    readonly complete: string;
    readonly completeIcon?: string;
    readonly url: string;
    readonly saveUrl?: string;
    readonly loadUrl?: string;
    readonly enableAttachments?: boolean;
    readonly sets?: ReadonlyArray<IFieldSet>;
    readonly formState?: ReadonlyArray<IFormState>;
    readonly initialPdfState?: TPdfInitialStates;
    readonly submit?: ISubmit;
    readonly assignee?: string;
}
interface IRect {
    readonly x1: number;
    readonly y1: number;
    readonly x2: number;
    readonly y2: number;
}
interface IPureComputed extends IFieldBase {
    readonly type: ActionType.pureComputed | "pureComputed";
    readonly group?: string;
    readonly fieldSet?: string;
    readonly user?: IFieldUser;
    readonly data?: IFieldObserve;
    readonly fileValue?: string;
    readonly computed?: IComputed;
}
interface IFieldBase extends IDataAction {
    readonly initialValue?: TProp;
}
interface IOverlayBase extends IFieldBase {
    readonly page: number;
    readonly rect: IRect;
}
interface IAnnotation extends IOverlayBase {
    readonly type: ActionType.annotation | "annotation";
}
interface IOverlay extends IOverlayBase, Omit<IPureComputed, "type"> {
    readonly type: ActionType.overlay | "overlay";
    /** Same as `IFormField` input */
    readonly field: TField;
    readonly preText?: string;
    readonly postText?: string;
    readonly focusOnView?: boolean;
    readonly assignees?: ReadonlyArray<string>;
}
type TAction = IDataAction | IComponentAction | IPdfForm | IOverlay | IAnnotation;

interface IHideColumns {
    readonly small: ReadonlyArray<string>;
    readonly medium: ReadonlyArray<string>;
    readonly large: ReadonlyArray<string>;
}

declare const enum OrderType {
    none = "none",
    model = "model",
    heading = "heading",
    props = "props",
    ordinal = "ordinal",
    rolodex = "rolodex",
    tags = "tags"
}
interface IOrder {
    readonly type: Exclude<OrderType, OrderType.tags>;
}
interface IGroupConf {
    readonly label: string;
    readonly icon?: string;
}
interface IGroupTags {
    readonly type: OrderType.tags;
    readonly ctx: string;
    readonly sortDescending?: boolean;
    /** Rich group label/icon configuration from context values */
    readonly keyValues?: Record<string, IGroupConf>;
}
type TGroup = IOrder | IGroupTags;
interface IOrderObject {
    readonly type: OrderType;
    readonly props?: ReadonlyArray<string>;
    readonly desc?: boolean;
}
type TOrder = OrderType | IOrderObject;
interface IGridConf {
    readonly columnDefs?: ReadonlyArray<ColDefKeys | ICustomColDef>;
    readonly hideColumns?: IHideColumns;
    readonly gridOptions?: GridOptions;
}
declare const enum ModelType {
    customList = "customList",
    single = "single",
    grid = "grid",
    list = "list",
    table = "table",
    dataCard = "dataCard",
    custom = "custom"
}
type TUpload = readonly [string, File];
interface IDataFile {
    readonly _id: string;
    readonly prop: string;
    readonly remoteUrl?: string;
    readonly name: string;
    readonly size: number;
    readonly type: string;
    readonly lastModified: number;
    readonly file?: File;
    readonly dataUrl?: string;
    readonly metadata?: Record<string, string>;
}
interface ITag {
    readonly ctx: string;
    readonly val: string;
}
interface IItem {
    readonly _id: string;
    readonly modelId: string;
    readonly readonly?: boolean;
    readonly ordinal?: number;
    readonly tags: ReadonlyArray<ITag>;
    readonly pre?: ReadonlyArray<ICustom>;
    readonly post?: ReadonlyArray<ICustom>;
    readonly applyTheme?: Partial<TItemOverwriteKeys>;
    readonly returnButtonLabel?: string;
    readonly returnButtonIcon?: string;
    readonly returnButtonHref?: string;
    readonly returnButtonRoute?: string;
    readonly accordion?: boolean;
    readonly accordionMinimized?: boolean;
    readonly title?: string;
    readonly hideCategoryView?: boolean;
    readonly context?: ColorContext;
    readonly cardContext?: ColorContext;
    readonly dataCard?: {
        readonly modelId: string;
    } & IDataCard;
    readonly metadata?: TPropMap;
}
type TPropMap = Record<string, TProp>;
interface IDataItem<T = TPropMap> extends IItem {
    readonly files: ReadonlyArray<IDataFile>;
    readonly props: T;
    readonly actions: ReadonlyArray<TAction>;
    readonly style?: TCSSObject;
}
type TItemOverwriteKeys = Pick<IUITheme, "uiCardWrapper" | "uiCardContentWrapper" | "uiCardFooterWrapper" | "uiCardSubheading" | "uiCardHeader" | "uiCardImage" | "uiCardIcon" | "uiCardFooterIcon" | "uiCardFooterText" | "uiCardCounter" | "uiItemRowWrapper" | "uiItemRowInnerWrapper" | "uiItemRowHeaderWrapper" | "uiItemHeading" | "uiItemSubheading" | "uiItemButtonsWrapper" | "uiItemButtonsInnerWrapper" | "uiItemActionButton" | "uiItemRowNewWrapper" | "uiItemRowNewMessage" | "uiItemRowNewIcon">;
interface ICategory extends IItem {
    readonly type: ModelType;
    readonly label: string | ReadonlyArray<IBlockLinesData>;
    readonly cardFooter?: ReadonlyArray<IBlockLinesData>;
    readonly labelIcon?: string;
    readonly labelIconText?: string;
    readonly subheading?: string | ReadonlyArray<IBlockLinesData>;
    readonly subheadingIcon?: string;
    readonly icon: string | IBrandingImage;
    readonly style?: TCSSObject;
    /** List of tags that are considered to be in category */
    readonly content: ReadonlyArray<ITag>;
    /** Variant of content tags but used for counter only (defaults to same list as content) */
    readonly countContent?: ReadonlyArray<ITag>;
    /** Set content tag matching to match all tags, as opposed to at least 1 tag */
    readonly contentAll?: boolean;
    readonly hideEmpty?: boolean;
    readonly search?: boolean;
    readonly sort?: TOrder;
    readonly group?: TGroup;
    readonly gridConf?: IGridConf;
    readonly customTableHeader?: string;
    readonly accordion?: boolean;
    readonly columnDefs?: ReadonlyArray<ColDefKeys | ColDef>;
    readonly panelHeaderComponents?: ReadonlyArray<ICustom>;
    readonly customComponent?: string;
}
interface IDataDriven extends ICategory {
    readonly modelId: "driven";
    readonly creationContext: string;
    readonly child?: IDataDriven;
}
type TItem = IDataItem | ICategory | IDataDriven;
declare const enum ColDefKeys {
    size = "size",
    type = "type",
    date = "date",
    documentName = "documentName",
    viewedIndicator = "viewedIndicator",
    select = "select",
    from = "from"
}

declare class DialogHandler {
    private priorityQueue;
    private notificationQueue;
    private confirmQueue;
    private loginQueue;
    private queue;
    private _config?;
    private activeDialog?;
    private _active;
    get active(): boolean;
    close(): void;
    private _visible;
    get visible(): boolean;
    hide(): void;
    constructor();
    get config(): (TDialog & Required<IDialogBase>) | undefined;
    get getActiveDialog(): TDialog | undefined;
    insert(dialogValue: TDialog): void;
    next(): void;
}

declare enum DialogPosition {
    center = "center",
    top = "top",
    topRight = "topRight",
    topLeft = "topLeft",
    bottom = "bottom",
    bottomRight = "bottomRight",
    bottomLeft = "bottomLeft"
}
declare enum DialogType {
    notification = "notification",
    confirm = "confirm",
    login = "login",
    feedback = "feedback",
    invite = "invite",
    component = "component",
    form = "form",
    upload = "upload"
}
interface IDialogButtonOptions {
    readonly label?: string;
    readonly icon?: string;
    readonly rightIcon?: string;
    onclick?(args?: any): void;
}
interface IDialogLoginFunctions {
    onSuccess?(): void;
    onFailure?(): void;
}
interface ILandingLogin {
    onSuccess(res: IRedirect): void;
    onFailure(): void;
}
interface IDialogBase {
    readonly duration?: number;
    readonly position?: DialogPosition;
    readonly context?: ColorContext;
    readonly applyTheme?: Partial<TUiDialogOverwriteKeys>;
    readonly priority?: boolean;
    readonly closeDialog?: boolean;
}
interface IDialogNotification extends IDialogBase {
    readonly type: DialogType.notification;
    readonly title?: string;
    readonly message?: TLines;
}
interface IDialogConfirm extends IDialogBase {
    readonly type: DialogType.confirm;
    readonly confirmButton?: IDialogButtonOptions;
    readonly cancelButton?: IDialogButtonOptions;
    readonly buttonContext?: ColorContext;
    readonly icon?: string;
    readonly title?: string;
    readonly message?: TLines;
}
interface IDialogLogin extends IDialogBase {
    readonly type: DialogType.login;
    readonly title?: string;
    readonly message?: TLines;
    readonly login?: IDialogLoginFunctions;
}
interface IDialogComponent<T> extends IDialogBase {
    readonly type: DialogType.component;
    readonly cancelButton?: IDialogButtonOptions;
    readonly buttonContext?: ColorContext;
    readonly component: ComponentTypes<T>;
    readonly attrs: T & CommonAttributes<T, unknown>;
}
interface IDialogFeedback extends IDialogBase {
    readonly type: DialogType.feedback;
    readonly title?: string;
    readonly useProfile?: stream<IProfile> | null;
    readonly subTitle?: string;
    readonly bodyText?: string;
    readonly submitButton?: IDialogButtonOptions;
    readonly postUrl?: string | null;
    readonly confirmButton?: IDialogButtonOptions;
    readonly cancelButton?: IDialogButtonOptions;
}
interface IDialogInvite extends IDialogBase {
    readonly title?: string;
    readonly type: DialogType.invite;
    readonly subTitle?: string;
    readonly bodyText?: string;
    readonly submitButton?: IDialogButtonOptions;
    readonly confirmButton?: IDialogButtonOptions;
    readonly cancelButton?: IDialogButtonOptions;
}
interface IDialogUpload extends IDialogBase, IUpload {
    readonly type: DialogType.upload;
    readonly onSubmit?: (fileList: IDataFile[]) => Promise<unknown>;
}
interface IDialogForm extends IDialogBase {
    readonly type: DialogType.form;
    readonly children: Children;
    readonly buttonContext?: ColorContext;
    readonly cancelButton?: IDialogButtonOptions;
}
type TUiDialogOverwriteKeys = Pick<IUITheme, "uiDialogButtonWrapper" | "uiDialogCancelButton" | "uiDialogComponentCancelButton" | "uiDialogConfirmButton" | "uiDialogContextAlt" | "uiDialogContextDefault" | "uiDialogContextError" | "uiDialogContextNeutral" | "uiDialogContextWarn" | "uiDialogFeedbackTitle" | "uiDialogFeedbackSubTitle" | "uiDialogFeedbackBodyText" | "uiDialogFeedbackButtonWrapper" | "uiDialogFeedbackLabel" | "uiDialogFeedbackWrapper" | "uiDialogInviteTitle" | "uiDialogInviteSubTitle" | "uiDialogInviteBodyText" | "uiDialogInviteActionAreaWrapper" | "uiDialogInviteLabel" | "uiDialogInviteWrapper" | "uiDialogInviteConfirmButton" | "uiDialogInviteCancelButton" | "uiDialogLinkButton" | "uiDialogLoginWrapper" | "uiDialogNotificationWrapper" | "uiDialogText" | "uiDialogTitle" | "uiDialogWrapper" | "uiDialogIcon">;
type TDialog<T = any> = IDialogConfirm | IDialogNotification | IDialogLogin | IDialogComponent<T> | IDialogInvite | IDialogFeedback | IDialogUpload | IDialogForm;
interface IUiDialogComponent<T> {
    readonly config: T & Required<IDialogBase>;
    readonly handler: DialogHandler;
}

interface ICustom extends IThemeConfig {
    readonly type: string;
    /** Component data passed in attributes, override in custom component interface */
    readonly data: any;
    readonly hideMobile?: boolean;
}

type TTupleRecursive<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : TTupleRecursive<T, N, [T, ...R]>;
type TTupleOf<T, N extends number> = N extends N ? number extends N ? T[] : TTupleRecursive<T, N, []> : never;
type TEnumerate<N extends number> = Partial<TTupleOf<unknown, N>>["length"];
type TRange<S extends number, E extends number> = Exclude<TEnumerate<E>, TEnumerate<S>>;

type TCSSEntry = Partial<CSSStyleDeclaration> | Record<string, string>;
type TCSSObject = TCSSEntry | Record<string, TCSSEntry>;
interface IThemeConfig {
    readonly classes?: string;
    readonly style?: TCSSObject;
    readonly styleNS?: TCSSObject;
    readonly styleM?: TCSSObject;
    readonly styleL?: TCSSObject;
    readonly styleXL?: TCSSObject;
}
declare const enum Colors {
    body = "body",
    default = "default",
    lighter = "lighter",
    darker = "darker",
    alt = "alt",
    altLighter = "altLighter",
    altDarker = "altDarker",
    error = "error",
    warn = "warn",
    neutral = "neutral",
    user1 = "user1",
    user2 = "user2",
    user3 = "user3",
    user4 = "user4",
    user5 = "user5"
}
declare const enum ColorContext {
    default = "default",
    alt = "alt",
    lighter = "lighter",
    darker = "darker",
    altLighter = "altLighter",
    altDarker = "altDarker",
    error = "error",
    warn = "warn",
    neutral = "neutral"
}
interface IBrandingImage {
    readonly title?: string;
    readonly classes?: string;
    readonly src: string;
    readonly imageClass?: string;
    readonly height?: string;
    readonly width?: string;
}
declare const enum NavType {
    spacer = 0,
    divider = 1,
    image = 2,
    text = 3,
    link = 4,
    logout = 5,
    logoutSmall = 6,
    logoutLarge = 7,
    copyright = 8,
    poweredBy = 9,
    progress = 10,
    version = 11,
    name = 12,
    nameVersion = 13,
    salutation = 14,
    dropDown = 15
}
interface ISalutation {
    readonly pre?: string;
    readonly post?: string;
    readonly showFirstName?: boolean;
    readonly showLastName?: boolean;
}
interface INav extends IThemeConfig, INavBase {
    readonly type: NavType;
    readonly key?: string;
    /** Used by NavbarImage */
    readonly link?: {
        href?: string;
        target?: string;
    };
    /** Used by NavbarImage */
    readonly linkToVaultRoot?: boolean;
    /** Text/Link */
    readonly text?: string;
    /** Link */
    readonly href?: string;
    /** Image */
    readonly src?: string;
    /** Image */
    readonly height?: string;
    /** Image */
    readonly width?: string;
    /** Profile name(s) */
    readonly salutation?: ISalutation;
}
interface INavBase {
    /** Hide if logged out */
    readonly hideLogout?: boolean;
    /** Profile roles that should not display this item */
    readonly hide?: string[];
}
interface INavCustom extends ICustom, INavBase {
}
interface INavDropDown extends INav {
    readonly type: NavType.dropDown;
    readonly navList: ReadonlyArray<TNav>;
}
type TNav = INav | INavCustom | INavDropDown;
interface IPoweredBy {
    readonly src: string;
    readonly title: string;
    readonly href: string;
}
interface IBrandingBase {
    readonly _id?: string;
    readonly company?: string;
    readonly copyright?: string;
    readonly tel?: string;
    readonly email?: string;
    readonly address?: string;
    readonly poweredBy?: IPoweredBy;
    readonly tags?: ReadonlyArray<ITag>;
    readonly header?: ReadonlyArray<TNav>;
    readonly subheader?: ReadonlyArray<TNav>;
    readonly footer?: ReadonlyArray<TNav>;
}
declare enum BrandingRoute {
    list = "list",
    root = "root",
    single = "single",
    new = "new",
    view = "view",
    edit = "edit",
    comp = "comp",
    pdf = "pdf",
    default = "default"
}
interface IBranding extends IBrandingBase {
    readonly routes?: Partial<Record<keyof typeof BrandingRoute, ReadonlyArray<IBranding16>>>;
}
interface IBranding16 extends IBrandingBase {
    readonly routes?: Partial<Record<keyof typeof BrandingRoute, ReadonlyArray<IBranding16>>>;
}
interface IUIComponentBranding extends IThemeConfig {
    readonly key?: string;
    readonly increaseSpecificity?: boolean;
}
interface IUITheme {
    /** UI Component themes */
    readonly body?: IUIComponentBranding;
    readonly uiHeader?: IUIComponentBranding;
    readonly uiHeaderWrapper?: IUIComponentBranding;
    readonly uiSubheader?: IUIComponentBranding;
    readonly uiFooter?: IUIComponentBranding;
    readonly uiFooterWrapper?: IUIComponentBranding;
    readonly uiCustomHeader?: IUIComponentBranding;
    readonly uiIcon?: IUIComponentBranding;
    readonly uiSVGCircleIcon?: IUIComponentBranding;
    readonly uiSVGDuoToneIcon?: IUIComponentBranding;
    readonly uiSVGIcon?: IUIComponentBranding;
    readonly uiFabWrapper?: IUIComponentBranding;
    readonly uiAnimatedFabWrapper?: IUIComponentBranding;
    readonly uiAnimatedFabItemWrapper?: IUIComponentBranding;
    readonly uiAnimatedFabCounterWrapper?: IUIComponentBranding;
    readonly uiFabActive?: IUIComponentBranding;
    readonly uiFab?: IUIComponentBranding;
    readonly uiRequestPartyFabWrapper?: IUIComponentBranding;
    readonly uiRequestIndividualPartyWrapper?: IUIComponentBranding;
    readonly uiFileFabWrapper?: IUIComponentBranding;
    readonly uiFileFabFileWrapper?: IUIComponentBranding;
    readonly uiOverlaySpinnerWrapper?: IUIComponentBranding;
    readonly uiOverlaySpinnerIcon?: IUIComponentBranding;
    readonly uiOverlaySpinnerText?: IUIComponentBranding;
    readonly uiOverlaySpinnerInnerWrapper?: IUIComponentBranding;
    readonly uiPanel?: IUIComponentBranding;
    readonly uiPanelHeader?: IUIComponentBranding;
    readonly uiPanelHeaderWrapper?: IUIComponentBranding;
    readonly uiPanelHeaderButton?: IUIComponentBranding;
    readonly uiPanelHeaderComponentWrapper?: IUIComponentBranding;
    readonly uiPanelHeaderComponent?: IUIComponentBranding;
    readonly uiPanelSubheader?: IUIComponentBranding;
    readonly uiLayout?: IUIComponentBranding;
    readonly uiPostContentWrapper?: IUIComponentBranding;
    readonly uiPreContentWrapper?: IUIComponentBranding;
    readonly uiLogin?: IUIComponentBranding;
    readonly uiLoginHeader?: IUIComponentBranding;
    readonly uiLoginWrapper?: IUIComponentBranding;
    readonly uiLoginForm?: IUIComponentBranding;
    readonly uiLoginFormReset?: IUIComponentBranding;
    readonly uiLoginPreForm?: IUIComponentBranding;
    readonly uiLoginInput?: IUIComponentBranding;
    readonly uiLoginButtonWrapper?: IUIComponentBranding;
    readonly uiLoginButton?: IUIComponentBranding;
    readonly uiLoginResetButton?: IUIComponentBranding;
    readonly uiLoginInputWrapper?: IUIComponentBranding;
    readonly uiLoginInputWrapperReset?: IUIComponentBranding;
    readonly uiLoginFormInputWrapper?: IUIComponentBranding;
    readonly uiLoginLines?: IUIComponentBranding;
    readonly uiLoginPostLines?: IUIComponentBranding;
    readonly uiLoginInputFieldset?: IUIComponentBranding;
    readonly uiLoginInputLabel?: IUIComponentBranding;
    readonly uiLoginResetReturn?: IUIComponentBranding;
    readonly uiLoginResetHeader?: IUIComponentBranding;
    readonly uiLoginInputFieldsetDob?: IUIComponentBranding;
    readonly uiLoginInputFieldsetPostcode?: IUIComponentBranding;
    readonly uiLoginInputFieldsetPin?: IUIComponentBranding;
    readonly uiLoginFailedAuthMessage?: IUIComponentBranding;
    /** **NOTE** ag-grid theme overrides most style options, vault item table works as intended */
    /** @deprecated uiTable should be replaced with uiAgGrid */
    readonly uiTable?: IUIComponentBranding;
    readonly uiAgGrid?: IUIComponentBranding;
    /** @deprecated uiTableColsClipper should be replaced with uiAgGridColsClipper */
    readonly uiTableColsClipper?: IUIComponentBranding;
    readonly uiAgGridColsClipper?: IUIComponentBranding;
    /** @deprecated uiTableCell should be replaced with uiAgGridCell */
    readonly uiTableCell?: IUIComponentBranding;
    readonly uiAgGridCell?: IUIComponentBranding;
    /** @deprecated uiTableWrapper should be replaced with uiAgGridWrapper */
    readonly uiTableWrapper?: IUIComponentBranding;
    readonly uiAgGridWrapper?: IUIComponentBranding;
    /** @deprecated uiTableHeader should be replaced with uiAgGridHeader */
    readonly uiTableHeader?: IUIComponentBranding;
    readonly uiAgGridHeader?: IUIComponentBranding;
    /** @deprecated uiTableHeaderCell should be replaced with uiAgGridHeaderCell */
    readonly uiTableHeaderCell?: IUIComponentBranding;
    readonly uiAgGridHeaderCell?: IUIComponentBranding;
    /** @deprecated uiTableHeaderIcon should be replaced with uiAgGridHeaderIcon */
    readonly uiTableHeaderIcon?: IUIComponentBranding;
    readonly uiAgGridHeaderIcon?: IUIComponentBranding;
    /** @deprecated uiTableHeaderCellContainer should be replaced with uiAgGridHeaderCellContainer */
    readonly uiTableHeaderCellContainer?: IUIComponentBranding;
    readonly uiAgGridHeaderCellContainer?: IUIComponentBranding;
    readonly uiCellRenderDateTimeContainer?: IUIComponentBranding;
    /** @deprecated uiTableItemDate should be replaced with uiCellRendererItemDate */
    readonly uiTableItemDate?: IUIComponentBranding;
    readonly uiCellRendererItemDate?: IUIComponentBranding;
    /** @deprecated uiTableItemTime should be replaced with uiCellRendererTime */
    readonly uiTableItemTime?: IUIComponentBranding;
    readonly uiCellRendererTime?: IUIComponentBranding;
    /** @deprecated uiTableItemTitle should be replaced with uiCellRendererTitle */
    readonly uiTableItemTitle?: IUIComponentBranding;
    readonly uiCellRendererTitle?: IUIComponentBranding;
    /** @deprecated uiTableItemType should be replaced with uiCellRendererType */
    readonly uiTableItemType?: IUIComponentBranding;
    readonly uiCellRendererType?: IUIComponentBranding;
    /** @deprecated uiTableItemSize should be replaced with uiCellRendererSize */
    readonly uiTableItemSize?: IUIComponentBranding;
    readonly uiCellRendererSize?: IUIComponentBranding;
    /** @deprecated uiAgThemeAlpine should be replaced with uiAgGridThemeAlpine */
    readonly uiAgThemeAlpine?: IUIComponentBranding;
    readonly uiAgGridThemeAlpine?: IUIComponentBranding;
    /** @deprecated uiAgBodyViewport should be replaced with uiAgGridBodyViewport */
    readonly uiAgBodyViewport?: IUIComponentBranding;
    readonly uiAgGridBodyViewport?: IUIComponentBranding;
    /** @deprecated uiTableRow should be replaced with uiAgGridRow */
    readonly uiTableRow?: IUIComponentBranding;
    readonly uiAgGridRow?: IUIComponentBranding;
    readonly uiButton?: IUIComponentBranding;
    readonly uiNavButton?: IUIComponentBranding;
    readonly uiButtonAlt?: IUIComponentBranding;
    readonly uiButtonInfo?: IUIComponentBranding;
    readonly uiButtonWarn?: IUIComponentBranding;
    readonly uiButtonError?: IUIComponentBranding;
    readonly uiButtonNeutral?: IUIComponentBranding;
    readonly uiButtonWarnAlt?: IUIComponentBranding;
    readonly uiButtonErrorAlt?: IUIComponentBranding;
    readonly uiDialogBorderContextError?: IUIComponentBranding;
    readonly uiDialogBorderContextWarn?: IUIComponentBranding;
    readonly uiSearchBoxWrapper?: IUIComponentBranding;
    readonly uiSearchBoxIcon?: IUIComponentBranding;
    readonly uiSearchBoxInput?: IUIComponentBranding;
    readonly uiSearchBoxClearIcon?: IUIComponentBranding;
    /** wrapper that contains any given html input element */
    readonly uiInputWrapper?: IUIComponentBranding;
    readonly uiInputFieldset?: IUIComponentBranding;
    readonly uiInputLabel?: IUIComponentBranding;
    readonly uiFloatLabelPlaceholder?: IUIComponentBranding;
    /** Actual html input element */
    readonly uiInput?: IUIComponentBranding;
    readonly uiInputTextarea?: IUIComponentBranding;
    /** FieldListSelect */
    readonly uiFieldListSelectWrapper?: IUIComponentBranding;
    readonly uiFieldListSelectInnerWrapper?: IUIComponentBranding;
    readonly uiFieldListSelectFieldWrapper?: IUIComponentBranding;
    readonly uiFieldListSelectFieldInputWrapper?: IUIComponentBranding;
    readonly uiFieldListSelectIcon?: IUIComponentBranding;
    readonly uiFieldListWrapper?: IUIComponentBranding;
    /** Validation */
    readonly uiInvalidInputWrapper?: IUIComponentBranding;
    readonly uiInvalidCheckboxWrapper?: IUIComponentBranding;
    /** wrapper that contains all data cards when rendered as TItem type: ModelType.dataCard */
    readonly uiDataCardGridWrapper?: IUIComponentBranding;
    readonly uiDataCardWrapper?: IUIComponentBranding;
    /** dataCardHeader contains header and category label */
    readonly uiDataCardHeaderWrapper?: IUIComponentBranding;
    readonly uiDataCardHeader?: IUIComponentBranding;
    readonly uiDataCardCategoryLabel?: IUIComponentBranding;
    readonly uiDataCardSectionWrapper?: IUIComponentBranding;
    readonly uiDataCardSectionLabel?: IUIComponentBranding;
    readonly uiDataCardSectionItemWrapper?: IUIComponentBranding;
    readonly uiDataCardSectionItemLabel?: IUIComponentBranding;
    readonly uiDataCardSectionItemValue?: IUIComponentBranding;
    readonly uiDataCardButton?: IUIComponentBranding;
    readonly uiDialogOverlay?: IUIComponentBranding;
    readonly uiDialogContextNeutral?: IUIComponentBranding;
    readonly uiDialogContextDefault?: IUIComponentBranding;
    readonly uiDialogContextWarn?: IUIComponentBranding;
    readonly uiDialogContextError?: IUIComponentBranding;
    readonly uiDialogContextAlt?: IUIComponentBranding;
    readonly uiDialogWrapper?: IUIComponentBranding;
    readonly uiDialogNotificationWrapper?: IUIComponentBranding;
    readonly uiDialogLoginWrapper?: IUIComponentBranding;
    readonly uiDialogFeedbackWrapper?: IUIComponentBranding;
    readonly uiDialogInviteWrapper?: IUIComponentBranding;
    readonly uiDialogIcon?: IUIComponentBranding;
    readonly uiDialogTitle?: IUIComponentBranding;
    readonly uiDialogText?: IUIComponentBranding;
    readonly uiDialogButtonWrapper?: IUIComponentBranding;
    readonly uiDialogCancelButton?: IUIComponentBranding;
    readonly uiDialogConfirmButton?: IUIComponentBranding;
    readonly uiDialogLinkButton?: IUIComponentBranding;
    readonly uiDialogFeedbackLabel?: IUIComponentBranding;
    readonly uiDialogFeedbackTitle?: IUIComponentBranding;
    readonly uiDialogFeedbackSubTitle?: IUIComponentBranding;
    readonly uiDialogFeedbackBodyText?: IUIComponentBranding;
    readonly uiDialogFeedbackButtonWrapper?: IUIComponentBranding;
    readonly uiDialogInviteLabel?: IUIComponentBranding;
    readonly uiDialogInviteTitle?: IUIComponentBranding;
    readonly uiDialogInviteSubTitle?: IUIComponentBranding;
    readonly uiDialogInviteBodyText?: IUIComponentBranding;
    readonly uiDialogInviteActionAreaWrapper?: IUIComponentBranding;
    readonly uiDialogInviteConfirmButton?: IUIComponentBranding;
    readonly uiDialogInviteCancelButton?: IUIComponentBranding;
    readonly uiDialogInviteInputWrapper?: IUIComponentBranding;
    readonly uiDialogFailMessage?: IUIComponentBranding;
    readonly uiDialogComponentCancelButton?: IUIComponentBranding;
    readonly uiDialogUploadWrapper?: IUIComponentBranding;
    readonly uiDialogUploadTitle?: IUIComponentBranding;
    readonly uiDialogUploadSelectWrapper?: IUIComponentBranding;
    readonly uiDialogUploadCloseButton?: IUIComponentBranding;
    readonly uiDialogUploadOpenButton?: IUIComponentBranding;
    readonly uiDialogUploadSubmitButton?: IUIComponentBranding;
    readonly uiDialogUploaderScrollButton?: IUIComponentBranding;
    readonly uiDialogUploadFileButton?: IUIComponentBranding;
    readonly uiDialogUploadCancelButton?: IUIComponentBranding;
    readonly uiDialogUploadDropZone?: IUIComponentBranding;
    readonly uiDialogUploaderFileList?: IUIComponentBranding;
    readonly uiDialogUploadIcon?: IUIComponentBranding;
    readonly uiDialogUploadFileName?: IUIComponentBranding;
    readonly uiDialogUploadFileWrapper?: IUIComponentBranding;
    readonly uiDialogUploadFileDeleteIcon?: IUIComponentBranding;
    readonly uiDialogUploadFileDeleteIconInvalid?: IUIComponentBranding;
    readonly uiDialogUploadFileType?: IUIComponentBranding;
    readonly uiDialogUploadFileTypeSmall?: IUIComponentBranding;
    readonly uiDialogUploadFileTypeInvalid?: IUIComponentBranding;
    readonly uiDialogUploadFileSize?: IUIComponentBranding;
    readonly uiDialogUploadFileSizeInvalid?: IUIComponentBranding;
    readonly uiDialogUploadWarning?: IUIComponentBranding;
    readonly uiDialogUploadNotesWrapper?: IUIComponentBranding;
    readonly uiDialogUploadNotesInputWrapper?: IUIComponentBranding;
    readonly uiDialogUploadNotesInput?: IUIComponentBranding;
    readonly uiDialogUploadNotesLabel?: IUIComponentBranding;
    readonly uiNavbarCopyright?: IUIComponentBranding;
    readonly uiNavbarImage?: IUIComponentBranding;
    readonly uiNavbarLink?: IUIComponentBranding;
    readonly uiNavbarLinkActive?: IUIComponentBranding;
    readonly uiNavbarLogout?: IUIComponentBranding;
    readonly uiNavbarLogoutIcon?: IUIComponentBranding;
    readonly uiNavbarLogoutLabel?: IUIComponentBranding;
    readonly uiNavbarName?: IUIComponentBranding;
    readonly uiNavbarNameVersion?: IUIComponentBranding;
    readonly uiNavbarPoweredBy?: IUIComponentBranding;
    readonly uiNavbarProgress?: IUIComponentBranding;
    readonly uiNavbarSalutation?: IUIComponentBranding;
    readonly uiNavbarText?: IUIComponentBranding;
    readonly uiNavbarDropDownWrapper?: IUIComponentBranding;
    readonly uiNavbarDropDownMenu?: IUIComponentBranding;
    readonly uiNavbarDropDownMenuContent?: IUIComponentBranding;
    readonly uiNavbarVersion?: IUIComponentBranding;
    readonly uiCardGroup?: IUIComponentBranding;
    readonly uiCardWrapper?: IUIComponentBranding;
    readonly uiCardContentWrapper?: IUIComponentBranding;
    readonly uiCardHeader?: IUIComponentBranding;
    readonly uiCardSubheading?: IUIComponentBranding;
    readonly uiCardIcon?: IUIComponentBranding;
    readonly uiCardImage?: IUIComponentBranding;
    readonly uiCardCounter?: IUIComponentBranding;
    readonly uiCardFooterWrapper?: IUIComponentBranding;
    readonly uiCardFooterIcon?: IUIComponentBranding;
    readonly uiCardFooterText?: IUIComponentBranding;
    readonly uiProgressFlowWrapper?: IUIComponentBranding;
    readonly uiProgressFlowStepWrapper?: IUIComponentBranding;
    readonly uiProgressFlowArrowWrapper?: IUIComponentBranding;
    readonly uiProgressFlowArrow?: IUIComponentBranding;
    readonly uiProgressTextWrapper?: IUIComponentBranding;
    readonly uiProgressCardWrapper?: IUIComponentBranding;
    readonly uiProgressCardSubheading?: IUIComponentBranding;
    readonly uiProgressCardHeading?: IUIComponentBranding;
    readonly uiProgressCardIndicator?: IUIComponentBranding;
    readonly uiProgressCardComplete?: IUIComponentBranding;
    readonly uiProgressCardIncomplete?: IUIComponentBranding;
    readonly uiProgressCardWarn?: IUIComponentBranding;
    readonly uiProgressCardWaiting?: IUIComponentBranding;
    readonly uiProgressCardError?: IUIComponentBranding;
    readonly uiOdometerNegative?: IUIComponentBranding;
    readonly uiOdometerPositive?: IUIComponentBranding;
    readonly uiOdometer?: IUIComponentBranding;
    readonly uiOdometerWrapper?: IUIComponentBranding;
    readonly uiOdometerLabel?: IUIComponentBranding;
    readonly uiProgressCardIconComplete?: IUIComponentBranding;
    readonly uiProgressCardIconIncomplete?: IUIComponentBranding;
    readonly uiProgressCardIconWarn?: IUIComponentBranding;
    readonly uiProgressCardIconWaiting?: IUIComponentBranding;
    readonly uiProgressCardIconError?: IUIComponentBranding;
    readonly uiPdfViewerWrapper?: IUIComponentBranding;
    readonly uiPdfPanel?: IUIComponentBranding;
    readonly uiPdfBottomBar?: IUIComponentBranding;
    readonly uiPdfBottomBarText?: IUIComponentBranding;
    readonly uiPdfStartButton?: IUIComponentBranding;
    readonly uiPdfTopBar?: IUIComponentBranding;
    readonly uiPdfBackButton?: IUIComponentBranding;
    readonly uiPdfZoomInButton?: IUIComponentBranding;
    readonly uiPdfZoomOutButton?: IUIComponentBranding;
    readonly uiPdfDownloadButton?: IUIComponentBranding;
    readonly uiPdfSubheader?: IUIComponentBranding;
    readonly uiPdfStatusIcon?: IUIComponentBranding;
    readonly uiPdfSyncButtonWrapper?: IUIComponentBranding;
    readonly uiPdfFieldOverlay?: IUIComponentBranding;
    readonly uiPdfFieldInvalidOverlay?: IUIComponentBranding;
    readonly uiPdfActiveFieldOverlay?: IUIComponentBranding;
    readonly uiPdfFieldOverlayUser1?: IUIComponentBranding;
    readonly uiPdfFieldOverlayUser2?: IUIComponentBranding;
    readonly uiPdfFieldOverlayUser3?: IUIComponentBranding;
    readonly uiPdfFieldOverlayUser4?: IUIComponentBranding;
    readonly uiPdfFieldOverlayUser5?: IUIComponentBranding;
    readonly uiPdfFormGroupInfoItemWrapper?: IUIComponentBranding;
    readonly uiPdfFormGroupInfoItemInner?: IUIComponentBranding;
    readonly uiPdfFooterWrapper?: IUIComponentBranding;
    readonly pdfFooterEditPreText?: IUIComponentBranding;
    readonly pdfFooterEditPostText?: IUIComponentBranding;
    readonly pdfFooterEditNavigate?: IUIComponentBranding;
    readonly uiPdfFooterInputWrapper?: IUIComponentBranding;
    readonly uiPdfFooterSignButton?: IUIComponentBranding;
    readonly uiPdfFooterFormWrapper?: IUIComponentBranding;
    readonly uiPdfSaveAndExitButton?: IUIComponentBranding;
    readonly uiActionCardWrapper?: IUIComponentBranding;
    readonly uiActionCardInnerWrapper?: IUIComponentBranding;
    readonly uiActionCardHeader?: IUIComponentBranding;
    readonly uiActionCardContent?: IUIComponentBranding;
    readonly uiActionCardImageWrapper?: IUIComponentBranding;
    readonly uiActionCardLines?: IUIComponentBranding;
    readonly uiActionCardImage?: IUIComponentBranding;
    readonly uiActionCardButton?: IUIComponentBranding;
    readonly uiItemEditWrapper?: IUIComponentBranding;
    readonly uiItemEditHeader?: IUIComponentBranding;
    readonly uiItemEditIcon?: IUIComponentBranding;
    readonly uiItemEditLabel?: IUIComponentBranding;
    readonly uiItemEditButton?: IUIComponentBranding;
    readonly uiItemEditFormWrapper?: IUIComponentBranding;
    readonly uiItemViewWrapper?: IUIComponentBranding;
    readonly uiItemViewRowWrapper?: IUIComponentBranding;
    readonly uiItemViewIcon?: IUIComponentBranding;
    readonly uiItemViewField?: IUIComponentBranding;
    readonly uiCategoryItemWrapper?: IUIComponentBranding;
    readonly uiCategoryItemIcon?: IUIComponentBranding;
    readonly uiCategoryItemLabel?: IUIComponentBranding;
    readonly uiCategoryItemMarker?: IUIComponentBranding;
    readonly uiCategoryItemArrow?: IUIComponentBranding;
    /** Wrapper div that contains the accordion icon and title divs */
    readonly uiItemListAccordionTitleWrapper?: IUIComponentBranding;
    readonly uiItemListAccordionTitleWrapperOpen?: IUIComponentBranding;
    readonly uiItemListAccordionTitleWrapperClosed?: IUIComponentBranding;
    /** Div that contains the accordion icon */
    readonly uiItemListAccordionIcon?: IUIComponentBranding;
    /** Wrapper div that contains the items list */
    readonly uiItemListAccordionWrapper?: IUIComponentBranding;
    readonly uiItemViewCustomWrapper?: IUIComponentBranding;
    /** Item list (including pre and post components) */
    readonly uiItemListContainer?: IUIComponentBranding;
    readonly uiItemListGroupContainer?: IUIComponentBranding;
    /** title that appears above itemList viewContent in all views*/
    readonly uiItemListTitle?: IUIComponentBranding;
    readonly uiItemListTitleIcon?: IUIComponentBranding;
    readonly uiItemListTitleIconOpen?: IUIComponentBranding;
    readonly uiItemListTitleIconClose?: IUIComponentBranding;
    readonly uiItemListGroupLabel?: IUIComponentBranding;
    readonly uiItemListContentContainer?: IUIComponentBranding;
    readonly uiItemListTableNewCounter?: IUIComponentBranding;
    readonly uiItemListTableUploaderWrapper?: IUIComponentBranding;
    /** Item table classes repurposed by ag-grid version */
    readonly uiItemTableContainer?: IUIComponentBranding;
    readonly uiItemTableMaxHeight?: IUIComponentBranding;
    readonly uiItemTableIcon?: IUIComponentBranding;
    readonly uiItemTableIconSelect?: IUIComponentBranding;
    /** Item card container for group headings and card groups (including pre and post components) */
    readonly uiItemGridContainer?: IUIComponentBranding;
    /** Item row wrapper */
    readonly uiItemRowWrapper?: IUIComponentBranding;
    /** Item row "click" region (icon, heading, subheading and buttons) */
    readonly uiItemRowInnerWrapper?: IUIComponentBranding;
    /** Icon, Heading and Subheading */
    readonly uiItemRowHeaderWrapper?: IUIComponentBranding;
    readonly uiItemRowNewWrapper?: IUIComponentBranding;
    readonly uiItemRowNewMessage?: IUIComponentBranding;
    readonly uiItemRowNewIcon?: IUIComponentBranding;
    /** Item row "actions" buttons (view, download, custom actions) */
    readonly uiItemButtonsWrapper?: IUIComponentBranding;
    readonly uiItemButtonsInnerWrapper?: IUIComponentBranding;
    readonly uiItemActionButton?: IUIComponentBranding;
    readonly uiItemHeading?: IUIComponentBranding;
    readonly uiItemSubheading?: IUIComponentBranding;
    readonly uiBlockLinesWrapper?: IUIComponentBranding;
    readonly uiDisabled?: IUIComponentBranding;
    readonly uiAccordionIcon?: IUIComponentBranding;
    readonly uiAccordionWrapper?: IUIComponentBranding;
    readonly uiAccordionTitle?: IUIComponentBranding;
    readonly uiAccordionTitleIcon?: IUIComponentBranding;
    readonly uiAccordionTitleWrapper?: IUIComponentBranding;
    readonly uiStatusCheckWrapper?: IUIComponentBranding;
    readonly uiStatusCheckHeading?: IUIComponentBranding;
    readonly uiStatusCheckSubheading?: IUIComponentBranding;
    readonly uiStatusCheckIcon?: IUIComponentBranding;
    readonly uiStatusCheckIconWrapper?: IUIComponentBranding;
    readonly uiStatusCheckTextWrapper?: IUIComponentBranding;
    readonly uiCarouselWrapper?: IUIComponentBranding;
    readonly uiActiveUsersWrapper?: IUIComponentBranding;
    readonly uiActiveUser?: IUIComponentBranding;
    readonly uiPaymentFailureMain?: IUIComponentBranding;
}

declare function createResponsiveClass({ style, styleNS, styleM, styleL, styleXL, classes, key }: IUIComponentBranding, uiSheet?: StyleSheet): string;
declare class ResponsiveThemeHandler<T> {
    private _classes;
    private uiSheet;
    private applyTheme;
    constructor(applyTheme: Partial<Record<keyof T, IUIComponentBranding>>);
    get classes(): Readonly<Partial<Record<keyof T, string>>>;
    private createClasses;
    update(applyTheme: Partial<Record<keyof T, IUIComponentBranding>>): void;
}
declare function joinClasses(arr: ReadonlyArray<string | lodash.Falsey>): string;
declare function buttonContextMapper(context: ColorContext): ColorContext.default | ColorContext.alt | ColorContext.lighter | ColorContext.darker | ColorContext.altLighter | ColorContext.altDarker | ColorContext.neutral;

type TMutable<T> = {
    -readonly [P in keyof T]: T[P];
};
interface IIdentity {
    readonly _id: string;
}
interface IMithrilErr extends Error {
    readonly message: string;
    readonly code: number;
    readonly response: unknown;
}
declare function tinyDevice(): boolean;
declare function smallDevice(): boolean;
declare function pickByProperty<T>(list: ReadonlyArray<T>, prop: Partial<T>): T | undefined;
declare function pickById<T extends IIdentity>(list: ReadonlyArray<T>, id: string): T | undefined;
/** Based on kotlin `?.let { }` if the incoming `value` is non-null, run `then` with `value` */
declare function ensure<T, R>(value: T | null | undefined, then: (value: NonNullable<T>) => R): void;
/**
 * Variant of pickById accepting stream values, and returning a stream
 */
declare function pickByIdStream<T extends IIdentity>(listStream: stream<T[]>, idStream: stream<string>, defaultValue: T): stream<T>;
declare function filterByProperty<T>(list: ReadonlyArray<T>, prop: Partial<T>): T[];
/**
 * Mutates input list, returns array of removed items
 */
declare function removeByProperty<T>(list: T[], prop: Partial<T>): T[];
declare function itemsForCategory(itemList: TItem[], hasTags: ReadonlyArray<ITag>, matchAll?: boolean): TItem[];
declare function canEdit({ readonly, disabled }: TField | Partial<TField>): boolean;
declare function hasValue(value: unknown): boolean;
/**
 * Create object reflecting key, value pairs from a given map
 */
declare function mapToObject<T>(map: Map<string, T>): Record<string, T>;
/**
 * Set values in a given map from an object
 */
declare function setMap<T>(map: Map<string, T>, set: Record<string, T>): void;
/**
 * Express a given number of bytes as Kilobytes or Megabytes where appropriate
 */
declare function humaniseByteCount(numBytes: number): string;
/**
 * Extract field(s) from item props
 * A single field will be returned as its respective TProp type
 * Multiple fields will be joined into a space delimited string
 */
declare function extractFields(item: TItem, fieldList: ReadonlyArray<string>, category?: boolean): TProp | readonly IBlockLinesData[];
/**
 * Pass-through function for replacing m.request "deserialize" JSON parsing default
 */
declare function simpleResponse<T>(value: T): T;
type TIconType = "fa-solid" | "fa-regular" | "fa-light" | "fa-thin" | "fa-duotone";
declare function fileIcon(fileType: string, iconType?: TIconType): string;
declare function fileExt(fileType: string): string;
declare function fileExtNameOnly(fileType: string): string;
/**
 * Provide user-friendly presentation of some file metadata properties
 */
declare function getFileValue(file: IDataFile, property: keyof IDataFile, iconClass?: string): string | Children;
/**
 * Get an array of files
 * @param files IDataItem file array
 * @param prop file property to match
 */
declare function getFiles(files: ReadonlyArray<IDataFile>, prop: string): IFile[];
/**
 * Get a stream of files
 * @param files IDataItem file array
 * @param field TField identifying files
 */
declare function getFileStream(files: ReadonlyArray<IDataFile>, { id }: TField): stream<IFile[]>;
/**
 * Get a property
 * @param props IDataItem property map
 * @param key TField key to match
 */
declare function getProp(props: TPropMap, key: string): TProp;
declare function streamArrayPush<T>(inStream: stream<T[]>, value: T): void;
declare function streamArrayPullAt<T>(inStream: stream<T[]>, indexes: ReadonlyArray<number>): T[];
/**
 * Get a property stream
 * @param props IDataItem property map
 * @param field TField identifying prop
 */
declare function getPropStream(props: TPropMap, { id }: TField): stream<TProp>;
declare function deepMerge(object: any, source?: any): any;

interface ICellRendererMap {
    [type: string]: (new () => ICellRendererComp);
}
declare const cellRendererMap: ICellRendererMap;
declare function registerComponent(type: string, component: ComponentTypes<ICustom>): void;
declare function registerCellRenderer(type: string, component: (new () => ICellRendererComp)): void;
declare function buildComponent<T extends ICustom>({ type, data, style, styleNS, styleM, styleL, classes }: T): m__default.Vnode<any, any> | m__default.Vnode<ICustom, {}>;
declare function buildComponentList(list: ReadonlyArray<ICustom>): (m__default.Vnode<any, any> | m__default.Vnode<ICustom, {}>)[];

declare function parseIso(timeStr: string): number;
declare function formatDate(timeValue: number, mask?: string): string;
declare function formatTime(timeValue: number, mask?: string): string;
declare function getISODate(): string | null;
declare function humaniseTimeValue(timeValue: number): string;
declare function parseDateStr(timeStr?: string): string;
declare function parseTimeStr(timeStr?: string): string;
declare function parseDateTimeStr(timeStr?: string): string;
declare function parseDateValue(timeValue?: number): string;
declare function parseTimeValue(timeValue?: number): string;
declare function parseDateTimeValue(timeValue?: number): string;

declare const enum ErrCode {
    BadRequest = 400,
    Forbidden = 403,
    NotFound = 404
}
type TPdfState = Record<string, IDocumentState>;
declare function humaniseErrorCode(errCode: ErrCode, fileName: string): string;
declare function getDocumentRequestAuthHeaders(): Record<string, string>;
declare class PdfViewer {
    pdf: PDFDocumentProxy;
    overlayList: IOverlay[];
    annotationList: IAnnotation[];
    actionList: IPdfForm[];
    assigneeList: IAssignee[];
    state: TPdfState;
    custom?: IComponentAction;
    metadata?: ICustomMetadata;
    init(source: DocumentInitParameters): Promise<this>;
    destroy(): void;
    parseCustomMetadata(): Promise<this>;
}
type TPdfViewer = InstanceType<typeof PdfViewer>;
declare function pdfViewerFactory(source: DocumentInitParameters | string): Promise<PdfViewer>;

declare function rectToHtml({ x1, y1, x2, y2 }: IRect, pageHeight: number): {
    left: number;
    top: number;
    width: number;
    height: number;
};

declare class FormLayout<T = unknown> {
    private _layoutClass;
    get layoutClass(): string;
    private _layoutList;
    get layoutList(): (FormLayout<T> | IBuiltFormField<T>)[];
    constructor(fieldList: ReadonlyArray<IBuiltFormField<T>>, { theme, subgroups }?: IFormLayout);
}

declare function buildFormLayout(formLayout: FormLayout, formState?: FormState, override?: Partial<TField>): Children;

type TTokenMap$1 = Record<string, string>;
declare function applyTemplate<T>(tokenMap: TTokenMap$1, template: T): T;

declare function flattenObject<T extends object>(object: T, root?: string, store?: Record<string, TProp>): Record<string, TProp>;

type TTokenMap = Record<string, string>;
type TTemplateMap<T> = Record<string, T>;
declare function buildTemplates<T>(tokenMapList: ReadonlyArray<TTokenMap>, templateMap: TTemplateMap<T>, selectorFunc: (tokenMap: TTokenMap, templateMap: TTemplateMap<T>) => T): T[];

declare function uploadFile([guid, file]: TUpload, uploadPath: string): Promise<string>;
interface IUploadAsset extends Pick<IDataFile, "name" | "type" | "size"> {
    readonly file: File;
    readonly categoryTag: string;
    readonly subcategoryTag: string;
}
declare function uploadAsset({ file, name, type, size, categoryTag, subcategoryTag }: IUploadAsset, uploadPath: string): Promise<string>;

interface IPanelHeader {
    readonly classes?: string;
}
declare class PanelHeader implements ClassComponent<IPanelHeader> {
    protected readonly classKey: keyof IUITheme;
    view({ attrs: { classes }, children }: CVnode<IPanelHeader>): m__default.Vnode<any, any>;
}

declare class PanelSubheader extends PanelHeader {
    protected readonly classKey = "uiPanelSubheader";
}

interface IItemRow {
    title: TProp | readonly IBlockLinesData[];
    onclick?: () => void;
    button: Children;
    isItemNew?: boolean;
    icon?: string | IBrandingImage;
    heading?: Children;
    subheading?: Children;
}
declare class ItemRow implements ClassComponent<IItemRow> {
    protected icon(icon?: string | IBrandingImage): m__default.Vnode<any, any> | null;
    view({ attrs: { button, onclick, title, heading, icon, isItemNew, subheading } }: CVnode<IItemRow>): m__default.Vnode<any, any>;
}

declare class Dialog implements ClassComponent {
    onbeforeupdate(): void;
    view(): m__default.Vnode<IUiDialogComponent<IDialogNotification>, unknown> | m__default.Vnode<IUiDialogComponent<IDialogConfirm>, unknown> | m__default.Vnode<IUiDialogComponent<IDialogLogin>, unknown> | m__default.Vnode<IUiDialogComponent<IDialogFeedback>, unknown> | m__default.Vnode<IUiDialogComponent<IDialogInvite>, unknown> | m__default.Vnode<IUiDialogComponent<IDialogComponent<unknown>>, unknown> | m__default.Vnode<IUiDialogComponent<IDialogUpload>, unknown> | m__default.Vnode<IUiDialogComponent<IDialogForm>, unknown> | null;
}

interface ISearchBox {
    placeholder: string;
    searchValue: stream<string>;
}
declare class SearchBox implements ClassComponent<ISearchBox> {
    private id;
    view({ attrs: { placeholder, searchValue } }: CVnode<ISearchBox>): m__default.Vnode<any, any>;
}

interface IDropDownComponentClasses {
    readonly wrapper?: string;
    readonly menu?: string;
    readonly dropDownContent?: string;
}
interface IDropDown {
    renderDropDown(open: boolean): Children;
    renderChildren(): Children;
    readonly uiClass?: IDropDownComponentClasses;
}
declare class DropDown implements ClassComponent<IDropDown> {
    private menuOpen;
    private dom;
    private evListener;
    private onclick;
    oncreate({ dom }: CVnodeDOM<IDropDown>): void;
    view({ attrs: { renderDropDown, renderChildren, uiClass } }: CVnode<IDropDown>): m__default.Vnode<any, any>;
}

declare const application: IReadonlyStream<IApplication>;

declare const pusher: IReadonlyStream<IPusherService>;

declare const dialogHandler: DialogHandler;
/** Set dialog */
declare function dialog<T>(newDialog: TDialog<T>): void;
/** Set dialog and redraw, useful for 3rd party library events/callbacks */
declare function dialogRedraw<T>(newDialog: TDialog<T>): void;
/** Set error dialog */
declare function errNotification(err: Error): void;
/** Close active dialog */
declare function dialogClose(): void;

declare const branding: stream<IBranding16 & IBranding>;

interface IColorPair {
    readonly background: string;
    readonly color: string;
}
declare const colorMapper: Record<keyof typeof Colors, IColorPair>;
declare const colorContextMapper: Record<ColorContext, string>;

type TTheme = Record<keyof IUITheme, string>;
declare const theme: stream<TTheme>;

interface IScreenSize {
    readonly small: boolean;
    readonly medium: boolean;
    readonly large: boolean;
    readonly ns: boolean;
}
interface ISize {
    readonly width: number;
    readonly height: number;
}
declare const size: IReadonlyStream<ISize>;
declare const screenSize: IReadonlyStream<IScreenSize>;

declare function loadDataList(): Promise<(void | Map<string, unknown>)[]>;
declare function getData<T>(id: string): T | undefined;

declare function setCssVariables(cssVariables: Partial<Record<string, string>>): void;

interface IActionItem {
    readonly data: TItem;
    readonly action: string;
    readonly actionId?: string;
    readonly opts?: RouteOptions;
    readonly readonly?: boolean;
}
declare function handleItemAction({ data, action, actionId, opts, readonly }: IActionItem): void;
/**
 * Mithril request function with handling for SDX session timout
 */
declare function sdxRequest<T>(options: RequestOptions<T> & {
    url: string;
}): Promise<T>;
declare function sdxRequest<T>(url: string, options?: RequestOptions<T>): Promise<T>;

declare abstract class GridCellRenderer implements ICellRendererComp {
    protected element: HTMLDivElement;
    protected classList: ReadonlyArray<string>;
    init(params: ICellRendererParams): void;
    refresh(params: ICellRendererParams): boolean;
    destroy(): void;
    getGui(): HTMLDivElement;
    protected abstract view(_params: ICellRendererParams): Children;
    protected render(params: ICellRendererParams): void;
}

interface IAnimatedFab {
    readonly onclick: (args: any) => void;
    readonly offset: number;
    readonly index: number;
    readonly style?: TCSSObject;
    readonly open: stream<boolean>;
}

declare abstract class AnimatedFabItem<C extends IAnimatedFab> implements ClassComponent<C> {
    private static openStyle;
    private static closedStyle;
    animationClass: string;
    animationStyle: TCSSObject;
    oninit({ attrs: { open, index, offset } }: CVnode<C>): void;
    abstract view(vnode: CVnode<C>): Children;
}

declare abstract class Themable<C, T = Partial<IUITheme>> implements ClassComponent<C> {
    private themeHandler?;
    protected overwrite: Readonly<Partial<Record<keyof T, string>>>;
    protected createTheme(theme?: T): void;
    protected updateTheme(theme?: T): void;
    private applyOverwrite;
    abstract view(vnode: CVnode<C>): Children;
}

interface INavbarBuilder {
    readonly navList: ReadonlyArray<TNav>;
    readonly saving?: stream<boolean>;
    readonly progress?: stream<number>;
    readonly logout: boolean;
}

declare function buildNavbar(attrs: INavbarBuilder): (m__default.Children | m__default.Vnode<ICustom, {}>)[];

declare function landing(appConf: string, toastMessage: Partial<IDialogNotification>): Promise<void>;

export { AnimatedFabItem, Dialog, DialogHandler, DialogPosition, DialogType, DropDown, ErrCode, FormBuilder, FormLayout, FormState, GridCellRenderer, type IDialogBase, type IDialogButtonOptions, type IDialogComponent, type IDialogConfirm, type IDialogFeedback, type IDialogForm, type IDialogInvite, type IDialogLogin, type IDialogLoginFunctions, type IDialogNotification, type IDialogUpload, type IDropDownComponentClasses, type ILandingLogin, type IMithrilErr, type IUiDialogComponent, ItemRow, PanelHeader, PanelSubheader, PinchZoom, ResponsiveThemeHandler, SearchBox, type TDialog, type TEnumerate, type TMutable, type TPdfViewer, type TRange, type TTupleOf, type TUiDialogOverwriteKeys, Themable, application, applyFileMap, applyMap, applyMerge, applyTemplate, assembleFormField, assembleFormFieldList, branding, buildComponent, buildComponentList, buildFormLayout, buildNavbar, buildTemplates, buttonContextMapper, canEdit, cellRendererMap, colorContextMapper, colorMapper, createResponsiveClass, deepMerge, dialog, dialogClose, dialogHandler, dialogRedraw, dobRegex, ensure, errNotification, evaluateCondition, extractFields, fileExt, fileExtNameOnly, fileIcon, filterByProperty, flattenObject, formatDate, formatTime, getData, getDocumentRequestAuthHeaders, getFileStream, getFileValue, getFiles, getISODate, getProp, getPropStream, handleItemAction, hasValue, humaniseByteCount, humaniseErrorCode, humaniseTimeValue, isFileField, isPropField, isSignField, isTextField, itemsForCategory, joinClasses, landing, loadDataList, mapMixin, mapToObject, mergeMixin, parseDateStr, parseDateTimeStr, parseDateTimeValue, parseDateValue, parseIso, parseTimeStr, parseTimeValue, pdfViewerFactory, pickById, pickByIdStream, pickByProperty, postCodeRegex, profile, pusher, rectToHtml, registerCellRenderer, registerComponent, registerFileMapFn, registerMapFn, registerMergeFn, removeByProperty, screenSize, sdxRequest, setCssVariables, setMap, simpleResponse, size, smallDevice, streamArrayPullAt, streamArrayPush, theme, tinyDevice, uploadAsset, uploadFile };
