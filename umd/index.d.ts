/// <reference types="mithril" />
import * as _sdxmessaging_ui_widgets from '@sdxmessaging/ui-widgets';
import { TField, TProp, IFile, IPropWidget, ICheckboxField, IOptionField, ITextareaField, IRadioField, IFileWidget, ISignField, TStyle, IMithrilEvent, IButtonLink, IWidgetLabel, IWidgetClasses, IConfig, IOption } from '@sdxmessaging/ui-widgets';
import * as m from 'mithril';
import { ComponentTypes, CommonAttributes, Children } from 'mithril';
import stream from 'mithril/stream';
import { PDFDocumentProxy } from 'pdfjs-dist';
import { DocumentInitParameters } from 'pdfjs-dist/types/src/display/api';
import { Channel } from 'pusher-js';
import { ColDef, GridOptions } from 'ag-grid-community';
export { ICellRendererParams } from 'ag-grid-community';

declare const enum JsonActionType {
    actionCardConfirm = "actionCardConfirm",
    dialog = "dialog",
    openWindow = "openWindow"
}

type TTupleRecursive<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : TTupleRecursive<T, N, [T, ...R]>;
type TTupleOf<T, N extends number> = N extends N ? number extends N ? T[] : TTupleRecursive<T, N, []> : never;
type TEnumerate<N extends number> = Partial<TTupleOf<unknown, N>>["length"];
type TRange<S extends number, E extends number> = Exclude<TEnumerate<E>, TEnumerate<S>>;

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
interface IFieldSlot {
    readonly subgroup?: string;
    readonly row?: number | string;
    readonly col?: number | string;
    readonly wrapperClass?: string;
    readonly style?: TStyle;
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

declare class FormState<T = unknown> {
    private static readonly stateMap;
    private trackMap;
    private streams;
    constructor(form: FormBuilder<T>, observeList: ReadonlyArray<IFormState>);
    destroy(): void;
    getState({ observe, truthy, falsy, condition }?: IFieldObserve): Partial<TField>;
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

declare class FormController {
    private readonly overlays;
    private readonly submitUrl;
    readonly formStateConfig: ReadonlyArray<IFormState>;
    readonly annotations: ReadonlyArray<IAnnotation>;
    private readonly overlayForm;
    readonly annotationForm: FormBuilder<IFormOverlay>;
    readonly formState: FormState;
    private list;
    private _editList;
    get editList(): ReadonlyArray<TOverlayFormField>;
    private _fieldGroups;
    get fieldGroups(): TFieldGroups;
    readonly actionCount: stream<number>;
    readonly actionableCount: stream<number>;
    readonly activeField: stream<TOverlayFormField | undefined>;
    readonly attachments: stream<IFile[]>;
    private requestParty;
    readonly isSingleSignForm: boolean;
    get canNavigate(): boolean;
    constructor(overlays: stream<ReadonlyArray<IOverlay>>, submitUrl: string, formStateConfig?: ReadonlyArray<IFormState>, annotations?: ReadonlyArray<IAnnotation>);
    filterEditList(): void;
    private updateActionCount;
    removeFromList(key: string): void;
    activeFieldIdx: stream<number>;
    activeGroup: stream<string>;
    activeGroupCount: stream<number>;
    activeGroupIdx: stream<number>;
    requestParties: stream<string[]>;
    invitedParties: stream<string[]>;
    partyFieldList: stream<{
        type: "overlay" | ActionType.overlay;
        field: _sdxmessaging_ui_widgets.TField;
        preText?: string | undefined;
        postText?: string | undefined;
        focusOnView?: boolean | undefined;
        assignees?: readonly string[] | undefined;
        page: number;
        rect: IRect;
        initialValue?: TProp | undefined;
        _id: string;
        label: string;
        data?: IFieldObserve | undefined;
        group?: string | undefined;
        computed?: IComputed | undefined;
        fieldSet?: string | undefined;
        user?: IFieldUser | undefined;
        fileValue?: string | undefined;
    }[]>;
    toFieldsJson(): Record<string, string>;
    toFormData(): FormData;
    getWidgetById(id: string): TOverlayFormField | undefined;
    pageFields(pageNum: number): IBuiltFormField<IFormOverlay & IFieldObserve>[];
    pageAnnotations(pageNum: number): IBuiltFormField<IFormOverlay>[];
    serialise(): TFormState;
    deserialise(data: TFormState): void;
    patchValue(key: string, value: TProp): void;
    patchFile(key: string, value: IFile): void;
    submitForm({ _id }: TItem): Promise<unknown>;
    updateRequestParties(id: string): void;
    addLicenseeToFieldList(id: string, licensee: string): void;
}

declare class SyncController {
    private channelName;
    formAction: IPdfForm;
    private formController;
    private _multiUser;
    get mutltiUser(): boolean;
    private _saveSupported;
    get saveSupported(): boolean;
    get syncSupported(): boolean;
    private _isDirty;
    get isDirty(): boolean;
    private channel?;
    currentUser: IUser;
    colorIndexes: Map<string, TUserIndex>;
    activeUsers: IProfile[];
    activeUsersFields: Map<string, string | null>;
    activeFieldUsers: Map<string, string>;
    activeFieldSet: stream<TOverlayFormField[]>;
    saving: stream<boolean>;
    private saveDocumentState?;
    private saveStateVisibility;
    constructor(channelName: string, formAction: IPdfForm, formController: FormController);
    getUserColorFromId(licensee: string): string;
    broadcastFieldChange(field?: TOverlayFormField): void;
    createChange(field: TOverlayFormField): TChangeEvent | null;
    loadState(): void;
    saveState(): Promise<void>;
    private redrawSyncButton;
    private onSubscribe;
    private listenForChange;
    isConnected(channel?: Channel | undefined): channel is Channel;
    private isLeader;
    private syncState;
    private addMember;
    private removeMember;
    private updateMultiUser;
    private updateActiveUserField;
    private indexActiveFields;
    private onUserChange;
    destroy(): void;
}

declare class ViewController implements IPageManagerController {
    item: IDataItem;
    private documentUrl;
    private onSubmit?;
    private onClose?;
    private navigateOnClose?;
    formController: FormController;
    syncController: SyncController;
    viewState: stream<PdfState>;
    showRequestPartysFab: boolean;
    showSubmitFab: stream<boolean>;
    initialPdfState?: TPdfInitialStates;
    focusInput: boolean;
    lastFocusedField?: TOverlayFormField;
    private highlightTimeout;
    private _highlightUser;
    get highlightUser(): string | null;
    readonly pageScale: PageScale;
    private container;
    readonly zoom: stream<number>;
    readonly jumpPage: stream<number>;
    readonly viewPage: stream<number>;
    private jumpDelay;
    private focusOnViewId?;
    readonly formAction: IPdfForm;
    metadata?: ICustomMetadata;
    readonly customAction?: IComponentAction;
    constructor(item: IDataItem, viewer: TPdfViewer, documentUrl: string, onSubmit?: (() => void) | undefined, onClose?: (() => void) | undefined, navigateOnClose?: boolean | undefined, useItemOverlays?: boolean, readonly?: boolean);
    submitted: stream<boolean>;
    submit(): void;
    close(): void;
    private resetInitialStateIfPossible;
    setDefaultState(): void;
    firstActive(): boolean;
    lastActive(): boolean;
    setActive(field?: TOverlayFormField): void;
    setGroup(groupId: string): void;
    setNextWidget(direction?: 1 | -1): void;
    startFormAction(): void;
    setNextEmptyWidget(): void;
    getActiveFieldSet(): stream<TOverlayFormField[]>;
    getFormActionSets(): readonly IFieldSet[] | undefined;
    formActionSetSelectionCount({ fieldSet }: TOverlayFormField): number | undefined;
    activeFieldInSet(): boolean;
    getActiveField(): TOverlayFormField;
    tabControls: (event: KeyboardEvent) => void;
    loadMetadata(): Promise<void>;
    private getAuthHeaders;
    postRequestParty({ email, mobile, fullName, key }: IPostRequestParty): Promise<unknown>;
    managerCreate(container: HTMLElement): void;
    private checkTarget;
    managerClick({ target }: MouseEvent & IMithrilEvent): void;
    managerScroll(): void;
    private clearHighlightTimeout;
    setHighlightUser(userId: string): void;
    adjustZoom(delta: number): void;
    destroy(): void;
}

declare const enum PageScale {
    FitWidth = 0,
    FitHeight = 1,
    Pct100 = 2
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
type TFieldGroups = Record<string, ReadonlyArray<TOverlayFormField>>;
interface IPostRequestParty {
    email: string;
    mobile: string;
    fullName: string;
    key: string;
}
interface IUser {
    readonly id: string;
    readonly info: IProfile;
}
interface IPdfViewer {
    readonly item: IDataItem;
    readonly onClose?: () => void;
    readonly onSubmit?: () => void;
    readonly disableBackNavigation?: boolean;
    /** only use the item overlays */
    readonly useItemOverlays?: boolean;
    readonly assignee?: string;
}
declare const enum PdfState {
    view = "view",
    call = "call",
    edit = "edit",
    complete = "complete",
    custom = "custom"
}
type TPdfInitialStates = Exclude<PdfState, PdfState.complete>;
declare const enum ZoomAmount {
    Min = -2,
    Decrement = -0.5,
    Default = 0,
    Increment = 0.5,
    Max = 2
}
interface IPdfFormGroupInfoItem {
    active: boolean;
    progress: number;
    title?: string;
    onclick: () => void;
}
interface IPdfFooterStateComponent {
    viewController: ViewController;
}
interface IFileState {
    readonly text: string;
    readonly heightPct: number;
}
type TFormState = Record<string, TProp | IFileState>;
declare const enum FieldEvents {
    Change = "client-change",
    Sync = "client-sync"
}
interface IEventMetadata {
    readonly user_id: string;
}
interface ISelectEvent {
    readonly key: string | null;
}
interface IValueEvent {
    readonly key: string;
    readonly value: TProp;
}
interface ISignEvent extends IFileState {
    readonly key: string;
}
type TChangeEvent = IValueEvent | ISignEvent;
interface IOverlayEvent {
    readonly select: string | null;
    readonly change: TChangeEvent[];
}
interface ISyncEvent {
    readonly form: TFormState;
    readonly users: IProfile[];
    readonly activeUsersFields: Record<string, string | null>;
    readonly colorIndexes: Record<string, TUserIndex>;
}
interface IPageManagerController {
    readonly pageScale: PageScale;
    /** Stream for zoom level, recommend to keep between -2 and 2 */
    readonly zoom: stream<number>;
    /** Read only scaling based on pageScale and zoom level */
    readonly viewScale?: stream<number>;
    readonly jumpPage: stream<number>;
    readonly viewPage: stream<number>;
    managerCreate(container: HTMLElement): void;
    managerClick(event: MouseEvent & IMithrilEvent): void;
    managerScroll(event: Event & IMithrilEvent): void;
}
interface IPageOverlay<T> {
    readonly controller: T;
    readonly pageNumber: number;
    readonly height: number;
}

type TPdfState = Record<string, IDocumentState>;
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
interface IFormOverlay extends Pick<IOverlay, "page" | "rect" | "preText" | "postText" | "focusOnView"> {
    readonly fontSize?: string;
}
type TOverlayFormField = IBuiltFormField<IFormOverlay & IFieldObserve>;

interface IHideColumns {
    readonly small: ReadonlyArray<string>;
    readonly medium: ReadonlyArray<string>;
    readonly large: ReadonlyArray<string>;
}

interface ICustomColDef extends ColDef {
    readonly cellRenderer: string;
}
declare const presetGridColumns: Map<string, ColDef>;

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
interface IDataCardConfig {
    readonly detailed?: ReadonlyArray<{
        readonly label: string;
        readonly keys: ReadonlyArray<string>;
    }>;
    readonly overview?: ReadonlyArray<string>;
}
interface ICustomDataCard extends ICustom {
    readonly data: {
        readonly config?: IDataCardConfig;
    } & IDataCard;
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
interface ITemplate {
    readonly templateKey: string;
}
type TTemplate = TItem & ITemplate;
interface IAsset {
    readonly id: number;
    readonly uuid: string;
    readonly origin: string;
    readonly embargo_date: string | null;
    readonly expiry_date: string | null;
    readonly date_deposited: string;
    readonly name: string;
    readonly filetype: string;
    readonly href?: string;
    readonly url?: string;
    readonly size: number;
    readonly date_viewed: null | string;
    readonly viewed: boolean;
    readonly category: string;
    readonly subcategory: string;
    readonly reference: string;
    readonly status: string;
    readonly actionsjson?: string;
    readonly metadata?: TPropMap | TPropMap[];
}
declare const enum ColDefKeys {
    size = "size",
    type = "type",
    date = "date",
    documentName = "documentName",
    viewedIndicator = "viewedIndicator",
    select = "select",
    from = "from"
}

type TColorStrings = "aliceblue" | "antiquewhite" | "aqua" | "aquamarine" | "azure" | "beige" | "bisque" | "black" | "blanchedalmond" | "blue" | "blueviolet" | "brown" | "burlywood" | "cadetblue" | "chartreuse" | "chocolate" | "coral" | "cornflowerblue" | "cornsilk" | "crimson" | "cyan" | "darkblue" | "darkcyan" | "darkgoldenrod" | "darkgray" | "darkgreen" | "darkgrey" | "darkkhaki" | "darkmagenta" | "darkolivegreen" | "darkorange" | "darkorchid" | "darkred" | "darksalmon" | "darkseagreen" | "darkslateblue" | "darkslategray" | "darkslategrey" | "darkturquoise" | "darkviolet" | "deeppink" | "deepskyblue" | "dimgray" | "dimgrey" | "dodgerblue" | "firebrick" | "floralwhite" | "forestgreen" | "fuchsia" | "gainsboro" | "ghostwhite" | "gold" | "goldenrod" | "gray" | "green" | "greenyellow" | "grey" | "honeydew" | "hotpink" | "indianred" | "indigo" | "ivory" | "khaki" | "lavender" | "lavenderblush" | "lawngreen" | "lemonchiffon" | "lightblue" | "lightcoral" | "lightcyan" | "lightgoldenrodyellow" | "lightgray" | "lightgreen" | "lightgrey" | "lightpink" | "lightsalmon" | "lightseagreen" | "lightskyblue" | "lightslategray" | "lightslategrey" | "lightsteelblue" | "lightyellow" | "lime" | "limegreen" | "linen" | "magenta" | "maroon" | "mediumaquamarine" | "mediumblue" | "mediumorchid" | "mediumpurple" | "mediumseagreen" | "mediumslateblue" | "mediumspringgreen" | "mediumturquoise" | "mediumvioletred" | "midnightblue" | "mintcream" | "mistyrose" | "moccasin" | "navajowhite" | "navy" | "oldlace" | "olive" | "olivedrab" | "orange" | "orangered" | "orchid" | "palegoldenrod" | "palegreen" | "paleturquoise" | "palevioletred" | "papayawhip" | "peachpuff" | "peru" | "pink" | "plum" | "powderblue" | "purple" | "red" | "rosybrown" | "royalblue" | "saddlebrown" | "salmon" | "sandybrown" | "seagreen" | "seashell" | "sienna" | "silver" | "skyblue" | "slateblue" | "slategray" | "slategrey" | "snow" | "springgreen" | "steelblue" | "tan" | "teal" | "thistle" | "tomato" | "turquoise" | "violet" | "wheat" | "white" | "whitesmoke" | "yellow" | "yellowgreen";
type TRgb = `rgb(${number}, ${number}, ${number})`;
type TRgba = `rgba(${number}, ${number}, ${number}, ${number})`;
type THex = `#${string}`;
type TCssColor = TRgb | TRgba | THex | TColorStrings | "" | "unset" | `var(--${string})`;

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
/** Reference CSS variables `var(--ui-builder-$value) */
declare const enum CssVar {
    accent = "var(--ui-builder-accent)",
    accentLight = "var(--ui-builder-accent-light)",
    accentSark = "var(--ui-builder-accent-dark)",
    accentInvert = "var(--ui-builder-accent-invert)",
    card = "var(--ui-builder-card)",
    text = "var(--ui-builder-text)",
    textInvert = "var(--ui-builder-text-invert)",
    warn = "var(--ui-builder-warn)",
    danger = "var(--ui-builder-danger)",
    user1 = "var(--ui-builder-user1)",
    user2 = "var(--ui-builder-user2)",
    user3 = "var(--ui-builder-user3)",
    user4 = "var(--ui-builder-user4)",
    user5 = "var(--ui-builder-user5)",
    spacing0_5 = "var(--ui-builder-spacing-0_5)",
    spacing1 = "var(--ui-builder-spacing-1)",
    spacing1_5 = "var(--ui-builder-spacing-1_5)",
    spacing2 = "var(--ui-builder-spacing-2)",
    spacing2_5 = "var(--ui-builder-spacing-2_5)",
    spacing3 = "var(--ui-builder-spacing-3)",
    spacing3_5 = "var(--ui-builder-spacing-3_5)",
    spacing4 = "var(--ui-builder-spacing-4)",
    spacing4_5 = "var(--ui-builder-spacing-4_5)"
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
type TLastUser = 5;
type TUserIndex = TRange<0, TLastUser>;
type TUser = `user${TUserIndex}`;
type TUIPdfFieldOverlayUser = `uiPdfFieldOverlayUser${TUserIndex}`;
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
type TPaletteKey = "accent" | "accent-light" | "accent-dark" | "accent-invert" | "card" | "text" | "text-invert" | "warn" | "danger" | "user1" | "user2" | "user3" | "user4" | "user5";
interface ITheme extends IUITheme {
    readonly palette?: Partial<Record<TPaletteKey, TCssColor>>;
    readonly vars?: Record<`--${string}`, string>;
}
interface IBrandingService {
    load(): Promise<ITheme>;
}

type TOverwriteKeys$2 = Pick<IUITheme, "uiBlockLinesWrapper">;
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
    readonly applyTheme?: Partial<TOverwriteKeys$2>;
    readonly classes?: string;
}
interface ICustomBlockLines extends ICustom {
    readonly data: IBlockLinesData;
}

declare const enum PusherEvents {
    reload = "reload",
    redirect = "redirect",
    notification = "notification",
    reloadBootstrap = "reloadbootstrap",
    reloadBranding = "reloadbranding",
    reloadProfile = "reloadprofile",
    reloadDataList = "reloaddatalist",
    reloadAll = "reloadAll",
    reloadApplication = "reloadapplication",
    reloadModels = "reloadmodels",
    reloadItems = "reloaditems",
    reloadAssets = "reloadassets",
    updateAssets = "newassets",
    addAssets = "document",
    viewed = "viewed"
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

type TOverwriteKeys$1 = Pick<IUITheme, "uiActionCardWrapper" | "uiActionCardInnerWrapper" | "uiActionCardButton" | "uiActionCardContent" | "uiActionCardHeader" | "uiActionCardImage" | "uiActionCardImageWrapper" | "uiActionCardLines" | "uiBlockLinesWrapper">;
interface IActionCardData {
    readonly context?: ColorContext;
    readonly buttonContext?: ColorContext;
    readonly src?: string;
    readonly header?: string;
    readonly lines?: ReadonlyArray<string>;
    readonly linesAsList?: boolean;
    readonly buttonLabel?: string;
    readonly buttonIcon?: string;
    readonly buttonIconRight?: string;
    readonly href?: string;
    readonly confirm?: {
        readonly icon?: string;
        readonly title?: string;
        readonly message?: TLines;
        readonly cancelButton?: IDialogButtonOptions;
        readonly confirmButton?: IDialogButtonOptions;
    };
    readonly target?: "_self" | "_blank" | "_parent" | "_top";
    readonly applyTheme?: Partial<TOverwriteKeys$1>;
}
interface ICustomActionCard extends ICustom {
    readonly data: IActionCardData;
}

interface ICustomBasic extends ICustom {
    readonly data: ReadonlyArray<TBasicPart>;
}

declare const enum ListType {
    basic = "basic",
    file = "file",
    link = "link",
    category = "category"
}
interface IDataModelActionButton {
    readonly action: ActionType;
    readonly label?: string;
    readonly icon?: string;
    readonly applyTheme?: IUIComponentBranding;
    readonly classes?: string;
}
interface IFieldDefault {
    readonly default?: string;
}
interface IDataModel {
    readonly _id: string;
    readonly category?: boolean;
    readonly customComponent?: string;
    readonly readonly: boolean;
    readonly label: string;
    readonly icon: string | IBrandingImage;
    readonly action: ActionType | IDataModelActionButton[];
    readonly fields: ReadonlyArray<TField & IFieldDefault>;
    readonly listType: ListType;
    readonly search: ReadonlyArray<string>;
    readonly heading: ReadonlyArray<string>;
    readonly subheading: ReadonlyArray<string>;
    readonly subheadingIcon?: string;
    readonly daysItemIsNew?: number;
}
interface IFileHeading {
    readonly prop: keyof IDataFile;
    readonly classes?: string;
}
interface IFileModel extends IDataModel {
    readonly listType: ListType.file;
    readonly fileHeading: ReadonlyArray<IFileHeading>;
}
interface ILinkModel extends IDataModel {
    readonly listType: ListType.link;
    readonly links: ReadonlyArray<string>;
}
interface IDataCardModel extends IDataModel {
    readonly category: true;
    config: {
        readonly _id: string;
        readonly overview?: string[];
        readonly detailed?: {
            readonly label: string;
            readonly keys: string[];
        }[];
    }[];
}
type TDataModel = IDataModel | IFileModel | ILinkModel | IDataCardModel;

interface IWidget {
    readonly modelList: IDataModel[];
    readonly itemList: stream<TItem[]>;
}
interface IItemListWidget extends IWidget {
    readonly item: ICategory;
    readonly modelMap: Record<string, IDataModel>;
    onUpload?(fileList: IDataFile[]): Promise<unknown>;
}

interface IItemGroup {
    readonly label: string | false;
    readonly icon?: string;
    readonly itemList: TItem[];
}

declare class ItemListViewHelper {
    taggedItemList: stream<TItem[]>;
    filteredItems: stream<TItem[]>;
    groupingEnabled: boolean;
    itemGroups: stream<IItemGroup[]>;
    listModels: boolean;
    createModels: IDataModel[];
    searchValue: stream<string>;
    filter: stream<RegExp>;
    hideView: boolean;
    item: ICategory;
    modelList: IDataModel[];
    modelMap: Record<string, IDataModel>;
    itemList: stream<TItem[]>;
    onUpload?: ((fileList: IDataFile[]) => Promise<unknown>);
    numCols: number;
    accordion: boolean;
    constructor({ item, modelList, modelMap, itemList, onUpload, }: IItemListWidget);
    destroy(): void;
    createNew(): void;
}

interface IItemViewCustomComponent extends ICustom {
    readonly data: {
        readonly model: IDataModel;
        readonly category: ICategory;
        readonly viewHelper: ItemListViewHelper;
    };
}

type TOverwriteKeys = Pick<IUITheme, "uiCustomHeader">;
interface ICustomHeader extends ICustom {
    readonly data: {
        readonly text: string;
        readonly id?: string;
        readonly applyTheme?: Partial<TOverwriteKeys>;
    };
}

declare const enum ProgressStatus {
    incomplete = "incomplete",
    complete = "complete",
    error = "error",
    warn = "warn",
    waiting = "waiting"
}
declare const enum ProgressPosition {
    top = "top",
    left = "left",
    bottom = "bottom",
    right = "right"
}
interface IProgressCardLink extends Omit<IButtonLink, "label"> {
    readonly text?: string;
}
interface IProgressCardData {
    readonly disabled?: boolean;
    readonly status?: ProgressStatus;
    readonly heading?: string;
    readonly subheading?: string;
    readonly style?: TCSSObject;
    readonly onclick?: () => void;
    readonly stepNumber?: string;
    readonly icons?: {
        readonly complete?: string | null;
        readonly incomplete?: string | null;
        readonly error?: string | null;
        readonly warn?: string | null;
        readonly waiting?: string | null;
    };
    readonly link?: IProgressCardLink;
    readonly post?: ICustom[];
    readonly children?: Children;
}
interface ICustomProgressCard extends ICustom {
    readonly data: IProgressCardData;
}

interface ICustomProgressFlow extends ICustom {
    readonly data: ReadonlyArray<IProgressCardData>;
}

interface ICartSection {
    pre?: ICustom[];
    post?: ICustom[];
}
interface ICartItems extends ICartSection {
    title: IWidgetLabel;
    amount: string;
    uiClass?: IWidgetClasses;
    editable?: boolean;
    textField?: boolean;
}
interface IToggleLabel {
    toggleOffLabel: string;
    toggleOnLabel: string;
}
interface IPaymentOptions extends ICartSection {
    showToggle: boolean;
    toggleLabel?: IToggleLabel;
    leftComponent?: ICustom;
    rightComponent?: ICustom;
    leftLabel?: string;
    rightLabel?: string;
}
interface IProceedToPayment extends ICartSection {
    toggleOffButton: {
        label: string;
        url: string;
    };
    toggleOnButton: {
        label: string;
        url: string;
    };
}
interface IShoppingCartCheckBox {
    text: string;
    pre?: ICustom[];
    post?: ICustom[];
}
interface IPaymentStateComponent {
    text?: string | IBlockLinesData;
    header?: string;
    pre?: ICustom[];
    post?: ICustom[];
}
interface IShoppingCartHandler {
    pre?: ICustom[];
    post?: ICustom[];
    header: string;
    items: ICartItems[];
    paymentOptions: IPaymentOptions;
    confirmCheckbox: IShoppingCartCheckBox;
    proceedToPayment: IProceedToPayment;
    dataPathId: string;
    paymentSuccessDirectDebit: IPaymentStateComponent;
    paymentSuccess: IPaymentStateComponent;
    paymentFailed: IPaymentStateComponent;
    paymentExpired: IPaymentStateComponent;
}
interface ICustomShoppingCart extends ICustom {
    readonly data: IShoppingCartHandler;
}

interface IPaymentItems {
    title: string;
    amount: string;
    uiClass?: IWidgetClasses;
}
interface ICustomToggleForm extends ICustom {
    readonly data: {
        items: ReadonlyArray<IPaymentItems>;
        pre?: ICustom[];
        post?: ICustom[];
    };
}

interface ICustomOdometer extends ICustom {
    readonly data: {
        readonly endpoint: string;
        readonly label?: IOdometerLabel;
        readonly eventName?: string;
    };
}
interface IOdometerLabel {
    default: string;
    negative?: string;
}

interface ICustomWrapperData extends IThemeConfig {
    readonly key?: string;
    readonly children: ICustom | ReadonlyArray<string>;
}
interface ICustomWrapper extends ICustom {
    readonly data: ICustomWrapperData;
}

interface ICustom extends IThemeConfig {
    readonly type: string;
    /** Component data passed in attributes, override in custom component interface */
    readonly data: any;
    readonly hideMobile?: boolean;
}
interface ICustomTableHeader extends ICustom {
    readonly data: {
        readonly viewHelper: ItemListViewHelper;
    };
}
type TCustomComponent = ICustomProgressCard | ICustomProgressFlow | ICustomHeader | ICustomBasic | ICustomBlockLines | ICustomWrapper | ICustomActionCard | ICustomDataCard;
interface IBasicPart {
    readonly selector: string;
    readonly content?: string;
}
interface ILinkPart {
    readonly href: string;
    readonly text: string;
}
type TBasicPart = string | IBasicPart | ILinkPart;

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

declare function pusherInit(): void;

export { ActionType, AuthType, BrandingRoute, ColorContext, Colors, CssVar, DataCardDisplayType, DataScope, DataType, DocumentStatus, FieldEvents, type IApplication, type IAsset, type IAssignee, type IBasicPart, type IBranding, type IBranding16, type IBrandingImage, type IBrandingService, type IBuiltFormField, type ICategory, type IComponentAction, type IComputed, type IComputedField, type IComputedFunc, type IComputedMixin, type ICustom, type ICustomActionCard, type ICustomBasic, type ICustomBlockLines, type ICustomDataCard, type ICustomHeader, type ICustomMetadata, type ICustomOdometer, type ICustomProgressCard, type ICustomProgressFlow, type ICustomShoppingCart, type ICustomTableHeader, type ICustomToggleForm, type IDataDriven, type IDataItem, type TDialog as IDialog, type IDocumentState, type IDocumentStateEntry, type IEventMetadata, type IFieldObserve, type IFieldSet, type IFieldSlot, type IFieldUser, type IFileFunc, type IFileState, type IFormField, type IFormFlow, type IFormLayout, type IFormState, type IFormUpdate, type IItemViewCustomComponent, type ILineElement, type ILinkPart, type IMergeFunc, type IMergeMixin, type INav, type INavBase, type INavCustom, type INavDropDown, type IOverlay, type IOverlayEvent, type IPageManagerController, type IPageOverlay, type IPdfFooterStateComponent, type IPdfForm, type IPdfFormGroupInfoItem, type IPdfViewer, type IPostRequestParty, type IPoweredBy, type IProfile, type IProgressCardData, type IPusher, type IReadonlyStream, type ISalutation, type ISelectEvent, type ISignEvent, type ISyncEvent, type ITheme, type IThemeConfig, type IUIComponentBranding, type IUITheme, type IUser, type IValueEvent, type IVault, JsonActionType, ListType, ModelType, NavType, OrderType, PageScale, PdfState, ProgressPosition, ProgressStatus, PusherEvents, ResetType, type TBasicPart, type TCSSEntry, type TCSSObject, type TChangeEvent, type TCondition, type TCustomComponent, type TDataModel, type TFieldGroups, type TFileComponent, type TFormField, type TFormState, type TFormWrapper, type TItem, type TLastUser, type TNav, type TObserveState, type TPdfInitialStates, type TPropComponent, type TStreamMap, type TTemplate, type TUIPdfFieldOverlayUser, type TUser, type TUserIndex, WidgetType, ZoomAmount, presetGridColumns, pusherInit };
