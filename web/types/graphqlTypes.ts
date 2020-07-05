export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: any,
  JSON: any,
};

export type BooleanQueryOperatorInput = {
  eq?: Maybe<Scalars['Boolean']>,
  ne?: Maybe<Scalars['Boolean']>,
  in?: Maybe<Array<Maybe<Scalars['Boolean']>>>,
  nin?: Maybe<Array<Maybe<Scalars['Boolean']>>>,
};


export type DateQueryOperatorInput = {
  eq?: Maybe<Scalars['Date']>,
  ne?: Maybe<Scalars['Date']>,
  gt?: Maybe<Scalars['Date']>,
  gte?: Maybe<Scalars['Date']>,
  lt?: Maybe<Scalars['Date']>,
  lte?: Maybe<Scalars['Date']>,
  in?: Maybe<Array<Maybe<Scalars['Date']>>>,
  nin?: Maybe<Array<Maybe<Scalars['Date']>>>,
};

export type Directory = Node & {
   __typename?: 'Directory',
  sourceInstanceName: Scalars['String'],
  absolutePath: Scalars['String'],
  relativePath: Scalars['String'],
  extension: Scalars['String'],
  size: Scalars['Int'],
  prettySize: Scalars['String'],
  modifiedTime: Scalars['Date'],
  accessTime: Scalars['Date'],
  changeTime: Scalars['Date'],
  birthTime: Scalars['Date'],
  root: Scalars['String'],
  dir: Scalars['String'],
  base: Scalars['String'],
  ext: Scalars['String'],
  name: Scalars['String'],
  relativeDirectory: Scalars['String'],
  dev: Scalars['Int'],
  mode: Scalars['Int'],
  nlink: Scalars['Int'],
  uid: Scalars['Int'],
  gid: Scalars['Int'],
  rdev: Scalars['Int'],
  ino: Scalars['Float'],
  atimeMs: Scalars['Float'],
  mtimeMs: Scalars['Float'],
  ctimeMs: Scalars['Float'],
  atime: Scalars['Date'],
  mtime: Scalars['Date'],
  ctime: Scalars['Date'],
  birthtime?: Maybe<Scalars['Date']>,
  birthtimeMs?: Maybe<Scalars['Float']>,
  blksize?: Maybe<Scalars['Int']>,
  blocks?: Maybe<Scalars['Int']>,
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
};


export type DirectoryModifiedTimeArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type DirectoryAccessTimeArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type DirectoryChangeTimeArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type DirectoryBirthTimeArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type DirectoryAtimeArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type DirectoryMtimeArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type DirectoryCtimeArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};

export type DirectoryConnection = {
   __typename?: 'DirectoryConnection',
  totalCount: Scalars['Int'],
  edges: Array<DirectoryEdge>,
  nodes: Array<Directory>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<DirectoryGroupConnection>,
};


export type DirectoryConnectionDistinctArgs = {
  field: DirectoryFieldsEnum
};


export type DirectoryConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: DirectoryFieldsEnum
};

export type DirectoryEdge = {
   __typename?: 'DirectoryEdge',
  next?: Maybe<Directory>,
  node: Directory,
  previous?: Maybe<Directory>,
};

export enum DirectoryFieldsEnum {
  SourceInstanceName = 'sourceInstanceName',
  AbsolutePath = 'absolutePath',
  RelativePath = 'relativePath',
  Extension = 'extension',
  Size = 'size',
  PrettySize = 'prettySize',
  ModifiedTime = 'modifiedTime',
  AccessTime = 'accessTime',
  ChangeTime = 'changeTime',
  BirthTime = 'birthTime',
  Root = 'root',
  Dir = 'dir',
  Base = 'base',
  Ext = 'ext',
  Name = 'name',
  RelativeDirectory = 'relativeDirectory',
  Dev = 'dev',
  Mode = 'mode',
  Nlink = 'nlink',
  Uid = 'uid',
  Gid = 'gid',
  Rdev = 'rdev',
  Ino = 'ino',
  AtimeMs = 'atimeMs',
  MtimeMs = 'mtimeMs',
  CtimeMs = 'ctimeMs',
  Atime = 'atime',
  Mtime = 'mtime',
  Ctime = 'ctime',
  Birthtime = 'birthtime',
  BirthtimeMs = 'birthtimeMs',
  Blksize = 'blksize',
  Blocks = 'blocks',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type DirectoryFilterInput = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>,
  absolutePath?: Maybe<StringQueryOperatorInput>,
  relativePath?: Maybe<StringQueryOperatorInput>,
  extension?: Maybe<StringQueryOperatorInput>,
  size?: Maybe<IntQueryOperatorInput>,
  prettySize?: Maybe<StringQueryOperatorInput>,
  modifiedTime?: Maybe<DateQueryOperatorInput>,
  accessTime?: Maybe<DateQueryOperatorInput>,
  changeTime?: Maybe<DateQueryOperatorInput>,
  birthTime?: Maybe<DateQueryOperatorInput>,
  root?: Maybe<StringQueryOperatorInput>,
  dir?: Maybe<StringQueryOperatorInput>,
  base?: Maybe<StringQueryOperatorInput>,
  ext?: Maybe<StringQueryOperatorInput>,
  name?: Maybe<StringQueryOperatorInput>,
  relativeDirectory?: Maybe<StringQueryOperatorInput>,
  dev?: Maybe<IntQueryOperatorInput>,
  mode?: Maybe<IntQueryOperatorInput>,
  nlink?: Maybe<IntQueryOperatorInput>,
  uid?: Maybe<IntQueryOperatorInput>,
  gid?: Maybe<IntQueryOperatorInput>,
  rdev?: Maybe<IntQueryOperatorInput>,
  ino?: Maybe<FloatQueryOperatorInput>,
  atimeMs?: Maybe<FloatQueryOperatorInput>,
  mtimeMs?: Maybe<FloatQueryOperatorInput>,
  ctimeMs?: Maybe<FloatQueryOperatorInput>,
  atime?: Maybe<DateQueryOperatorInput>,
  mtime?: Maybe<DateQueryOperatorInput>,
  ctime?: Maybe<DateQueryOperatorInput>,
  birthtime?: Maybe<DateQueryOperatorInput>,
  birthtimeMs?: Maybe<FloatQueryOperatorInput>,
  blksize?: Maybe<IntQueryOperatorInput>,
  blocks?: Maybe<IntQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
};

export type DirectoryGroupConnection = {
   __typename?: 'DirectoryGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<DirectoryEdge>,
  nodes: Array<Directory>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type DirectorySortInput = {
  fields?: Maybe<Array<Maybe<DirectoryFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type DuotoneGradient = {
  highlight: Scalars['String'],
  shadow: Scalars['String'],
  opacity?: Maybe<Scalars['Int']>,
};

export type File = Node & {
   __typename?: 'File',
  sourceInstanceName: Scalars['String'],
  absolutePath: Scalars['String'],
  relativePath: Scalars['String'],
  extension: Scalars['String'],
  size: Scalars['Int'],
  prettySize: Scalars['String'],
  modifiedTime: Scalars['Date'],
  accessTime: Scalars['Date'],
  changeTime: Scalars['Date'],
  birthTime: Scalars['Date'],
  root: Scalars['String'],
  dir: Scalars['String'],
  base: Scalars['String'],
  ext: Scalars['String'],
  name: Scalars['String'],
  relativeDirectory: Scalars['String'],
  dev: Scalars['Int'],
  mode: Scalars['Int'],
  nlink: Scalars['Int'],
  uid: Scalars['Int'],
  gid: Scalars['Int'],
  rdev: Scalars['Int'],
  ino: Scalars['Float'],
  atimeMs: Scalars['Float'],
  mtimeMs: Scalars['Float'],
  ctimeMs: Scalars['Float'],
  atime: Scalars['Date'],
  mtime: Scalars['Date'],
  ctime: Scalars['Date'],
  birthtime?: Maybe<Scalars['Date']>,
  birthtimeMs?: Maybe<Scalars['Float']>,
  blksize?: Maybe<Scalars['Int']>,
  blocks?: Maybe<Scalars['Int']>,
  publicURL?: Maybe<Scalars['String']>,
  childImageSharp?: Maybe<ImageSharp>,
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
};


export type FileModifiedTimeArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type FileAccessTimeArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type FileChangeTimeArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type FileBirthTimeArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type FileAtimeArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type FileMtimeArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type FileCtimeArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};

export type FileConnection = {
   __typename?: 'FileConnection',
  totalCount: Scalars['Int'],
  edges: Array<FileEdge>,
  nodes: Array<File>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<FileGroupConnection>,
};


export type FileConnectionDistinctArgs = {
  field: FileFieldsEnum
};


export type FileConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: FileFieldsEnum
};

export type FileEdge = {
   __typename?: 'FileEdge',
  next?: Maybe<File>,
  node: File,
  previous?: Maybe<File>,
};

export enum FileFieldsEnum {
  SourceInstanceName = 'sourceInstanceName',
  AbsolutePath = 'absolutePath',
  RelativePath = 'relativePath',
  Extension = 'extension',
  Size = 'size',
  PrettySize = 'prettySize',
  ModifiedTime = 'modifiedTime',
  AccessTime = 'accessTime',
  ChangeTime = 'changeTime',
  BirthTime = 'birthTime',
  Root = 'root',
  Dir = 'dir',
  Base = 'base',
  Ext = 'ext',
  Name = 'name',
  RelativeDirectory = 'relativeDirectory',
  Dev = 'dev',
  Mode = 'mode',
  Nlink = 'nlink',
  Uid = 'uid',
  Gid = 'gid',
  Rdev = 'rdev',
  Ino = 'ino',
  AtimeMs = 'atimeMs',
  MtimeMs = 'mtimeMs',
  CtimeMs = 'ctimeMs',
  Atime = 'atime',
  Mtime = 'mtime',
  Ctime = 'ctime',
  Birthtime = 'birthtime',
  BirthtimeMs = 'birthtimeMs',
  Blksize = 'blksize',
  Blocks = 'blocks',
  PublicUrl = 'publicURL',
  ChildImageSharpFixedBase64 = 'childImageSharp___fixed___base64',
  ChildImageSharpFixedTracedSvg = 'childImageSharp___fixed___tracedSVG',
  ChildImageSharpFixedAspectRatio = 'childImageSharp___fixed___aspectRatio',
  ChildImageSharpFixedWidth = 'childImageSharp___fixed___width',
  ChildImageSharpFixedHeight = 'childImageSharp___fixed___height',
  ChildImageSharpFixedSrc = 'childImageSharp___fixed___src',
  ChildImageSharpFixedSrcSet = 'childImageSharp___fixed___srcSet',
  ChildImageSharpFixedSrcWebp = 'childImageSharp___fixed___srcWebp',
  ChildImageSharpFixedSrcSetWebp = 'childImageSharp___fixed___srcSetWebp',
  ChildImageSharpFixedOriginalName = 'childImageSharp___fixed___originalName',
  ChildImageSharpResolutionsBase64 = 'childImageSharp___resolutions___base64',
  ChildImageSharpResolutionsTracedSvg = 'childImageSharp___resolutions___tracedSVG',
  ChildImageSharpResolutionsAspectRatio = 'childImageSharp___resolutions___aspectRatio',
  ChildImageSharpResolutionsWidth = 'childImageSharp___resolutions___width',
  ChildImageSharpResolutionsHeight = 'childImageSharp___resolutions___height',
  ChildImageSharpResolutionsSrc = 'childImageSharp___resolutions___src',
  ChildImageSharpResolutionsSrcSet = 'childImageSharp___resolutions___srcSet',
  ChildImageSharpResolutionsSrcWebp = 'childImageSharp___resolutions___srcWebp',
  ChildImageSharpResolutionsSrcSetWebp = 'childImageSharp___resolutions___srcSetWebp',
  ChildImageSharpResolutionsOriginalName = 'childImageSharp___resolutions___originalName',
  ChildImageSharpFluidBase64 = 'childImageSharp___fluid___base64',
  ChildImageSharpFluidTracedSvg = 'childImageSharp___fluid___tracedSVG',
  ChildImageSharpFluidAspectRatio = 'childImageSharp___fluid___aspectRatio',
  ChildImageSharpFluidSrc = 'childImageSharp___fluid___src',
  ChildImageSharpFluidSrcSet = 'childImageSharp___fluid___srcSet',
  ChildImageSharpFluidSrcWebp = 'childImageSharp___fluid___srcWebp',
  ChildImageSharpFluidSrcSetWebp = 'childImageSharp___fluid___srcSetWebp',
  ChildImageSharpFluidSizes = 'childImageSharp___fluid___sizes',
  ChildImageSharpFluidOriginalImg = 'childImageSharp___fluid___originalImg',
  ChildImageSharpFluidOriginalName = 'childImageSharp___fluid___originalName',
  ChildImageSharpFluidPresentationWidth = 'childImageSharp___fluid___presentationWidth',
  ChildImageSharpFluidPresentationHeight = 'childImageSharp___fluid___presentationHeight',
  ChildImageSharpSizesBase64 = 'childImageSharp___sizes___base64',
  ChildImageSharpSizesTracedSvg = 'childImageSharp___sizes___tracedSVG',
  ChildImageSharpSizesAspectRatio = 'childImageSharp___sizes___aspectRatio',
  ChildImageSharpSizesSrc = 'childImageSharp___sizes___src',
  ChildImageSharpSizesSrcSet = 'childImageSharp___sizes___srcSet',
  ChildImageSharpSizesSrcWebp = 'childImageSharp___sizes___srcWebp',
  ChildImageSharpSizesSrcSetWebp = 'childImageSharp___sizes___srcSetWebp',
  ChildImageSharpSizesSizes = 'childImageSharp___sizes___sizes',
  ChildImageSharpSizesOriginalImg = 'childImageSharp___sizes___originalImg',
  ChildImageSharpSizesOriginalName = 'childImageSharp___sizes___originalName',
  ChildImageSharpSizesPresentationWidth = 'childImageSharp___sizes___presentationWidth',
  ChildImageSharpSizesPresentationHeight = 'childImageSharp___sizes___presentationHeight',
  ChildImageSharpOriginalWidth = 'childImageSharp___original___width',
  ChildImageSharpOriginalHeight = 'childImageSharp___original___height',
  ChildImageSharpOriginalSrc = 'childImageSharp___original___src',
  ChildImageSharpResizeSrc = 'childImageSharp___resize___src',
  ChildImageSharpResizeTracedSvg = 'childImageSharp___resize___tracedSVG',
  ChildImageSharpResizeWidth = 'childImageSharp___resize___width',
  ChildImageSharpResizeHeight = 'childImageSharp___resize___height',
  ChildImageSharpResizeAspectRatio = 'childImageSharp___resize___aspectRatio',
  ChildImageSharpResizeOriginalName = 'childImageSharp___resize___originalName',
  ChildImageSharpId = 'childImageSharp___id',
  ChildImageSharpParentId = 'childImageSharp___parent___id',
  ChildImageSharpParentParentId = 'childImageSharp___parent___parent___id',
  ChildImageSharpParentParentChildren = 'childImageSharp___parent___parent___children',
  ChildImageSharpParentChildren = 'childImageSharp___parent___children',
  ChildImageSharpParentChildrenId = 'childImageSharp___parent___children___id',
  ChildImageSharpParentChildrenChildren = 'childImageSharp___parent___children___children',
  ChildImageSharpParentInternalContent = 'childImageSharp___parent___internal___content',
  ChildImageSharpParentInternalContentDigest = 'childImageSharp___parent___internal___contentDigest',
  ChildImageSharpParentInternalDescription = 'childImageSharp___parent___internal___description',
  ChildImageSharpParentInternalFieldOwners = 'childImageSharp___parent___internal___fieldOwners',
  ChildImageSharpParentInternalIgnoreType = 'childImageSharp___parent___internal___ignoreType',
  ChildImageSharpParentInternalMediaType = 'childImageSharp___parent___internal___mediaType',
  ChildImageSharpParentInternalOwner = 'childImageSharp___parent___internal___owner',
  ChildImageSharpParentInternalType = 'childImageSharp___parent___internal___type',
  ChildImageSharpChildren = 'childImageSharp___children',
  ChildImageSharpChildrenId = 'childImageSharp___children___id',
  ChildImageSharpChildrenParentId = 'childImageSharp___children___parent___id',
  ChildImageSharpChildrenParentChildren = 'childImageSharp___children___parent___children',
  ChildImageSharpChildrenChildren = 'childImageSharp___children___children',
  ChildImageSharpChildrenChildrenId = 'childImageSharp___children___children___id',
  ChildImageSharpChildrenChildrenChildren = 'childImageSharp___children___children___children',
  ChildImageSharpChildrenInternalContent = 'childImageSharp___children___internal___content',
  ChildImageSharpChildrenInternalContentDigest = 'childImageSharp___children___internal___contentDigest',
  ChildImageSharpChildrenInternalDescription = 'childImageSharp___children___internal___description',
  ChildImageSharpChildrenInternalFieldOwners = 'childImageSharp___children___internal___fieldOwners',
  ChildImageSharpChildrenInternalIgnoreType = 'childImageSharp___children___internal___ignoreType',
  ChildImageSharpChildrenInternalMediaType = 'childImageSharp___children___internal___mediaType',
  ChildImageSharpChildrenInternalOwner = 'childImageSharp___children___internal___owner',
  ChildImageSharpChildrenInternalType = 'childImageSharp___children___internal___type',
  ChildImageSharpInternalContent = 'childImageSharp___internal___content',
  ChildImageSharpInternalContentDigest = 'childImageSharp___internal___contentDigest',
  ChildImageSharpInternalDescription = 'childImageSharp___internal___description',
  ChildImageSharpInternalFieldOwners = 'childImageSharp___internal___fieldOwners',
  ChildImageSharpInternalIgnoreType = 'childImageSharp___internal___ignoreType',
  ChildImageSharpInternalMediaType = 'childImageSharp___internal___mediaType',
  ChildImageSharpInternalOwner = 'childImageSharp___internal___owner',
  ChildImageSharpInternalType = 'childImageSharp___internal___type',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type FileFilterInput = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>,
  absolutePath?: Maybe<StringQueryOperatorInput>,
  relativePath?: Maybe<StringQueryOperatorInput>,
  extension?: Maybe<StringQueryOperatorInput>,
  size?: Maybe<IntQueryOperatorInput>,
  prettySize?: Maybe<StringQueryOperatorInput>,
  modifiedTime?: Maybe<DateQueryOperatorInput>,
  accessTime?: Maybe<DateQueryOperatorInput>,
  changeTime?: Maybe<DateQueryOperatorInput>,
  birthTime?: Maybe<DateQueryOperatorInput>,
  root?: Maybe<StringQueryOperatorInput>,
  dir?: Maybe<StringQueryOperatorInput>,
  base?: Maybe<StringQueryOperatorInput>,
  ext?: Maybe<StringQueryOperatorInput>,
  name?: Maybe<StringQueryOperatorInput>,
  relativeDirectory?: Maybe<StringQueryOperatorInput>,
  dev?: Maybe<IntQueryOperatorInput>,
  mode?: Maybe<IntQueryOperatorInput>,
  nlink?: Maybe<IntQueryOperatorInput>,
  uid?: Maybe<IntQueryOperatorInput>,
  gid?: Maybe<IntQueryOperatorInput>,
  rdev?: Maybe<IntQueryOperatorInput>,
  ino?: Maybe<FloatQueryOperatorInput>,
  atimeMs?: Maybe<FloatQueryOperatorInput>,
  mtimeMs?: Maybe<FloatQueryOperatorInput>,
  ctimeMs?: Maybe<FloatQueryOperatorInput>,
  atime?: Maybe<DateQueryOperatorInput>,
  mtime?: Maybe<DateQueryOperatorInput>,
  ctime?: Maybe<DateQueryOperatorInput>,
  birthtime?: Maybe<DateQueryOperatorInput>,
  birthtimeMs?: Maybe<FloatQueryOperatorInput>,
  blksize?: Maybe<IntQueryOperatorInput>,
  blocks?: Maybe<IntQueryOperatorInput>,
  publicURL?: Maybe<StringQueryOperatorInput>,
  childImageSharp?: Maybe<ImageSharpFilterInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
};

export type FileGroupConnection = {
   __typename?: 'FileGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<FileEdge>,
  nodes: Array<File>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type FileSortInput = {
  fields?: Maybe<Array<Maybe<FileFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type FloatQueryOperatorInput = {
  eq?: Maybe<Scalars['Float']>,
  ne?: Maybe<Scalars['Float']>,
  gt?: Maybe<Scalars['Float']>,
  gte?: Maybe<Scalars['Float']>,
  lt?: Maybe<Scalars['Float']>,
  lte?: Maybe<Scalars['Float']>,
  in?: Maybe<Array<Maybe<Scalars['Float']>>>,
  nin?: Maybe<Array<Maybe<Scalars['Float']>>>,
};

export enum ImageCropFocus {
  Center = 'CENTER',
  North = 'NORTH',
  Northeast = 'NORTHEAST',
  East = 'EAST',
  Southeast = 'SOUTHEAST',
  South = 'SOUTH',
  Southwest = 'SOUTHWEST',
  West = 'WEST',
  Northwest = 'NORTHWEST',
  Entropy = 'ENTROPY',
  Attention = 'ATTENTION'
}

export enum ImageFit {
  Cover = 'COVER',
  Contain = 'CONTAIN',
  Fill = 'FILL'
}

export enum ImageFormat {
  NoChange = 'NO_CHANGE',
  Jpg = 'JPG',
  Png = 'PNG',
  Webp = 'WEBP'
}

export type ImageSharp = Node & {
   __typename?: 'ImageSharp',
  fixed?: Maybe<ImageSharpFixed>,
  resolutions?: Maybe<ImageSharpResolutions>,
  fluid?: Maybe<ImageSharpFluid>,
  sizes?: Maybe<ImageSharpSizes>,
  original?: Maybe<ImageSharpOriginal>,
  resize?: Maybe<ImageSharpResize>,
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
};


export type ImageSharpFixedArgs = {
  width?: Maybe<Scalars['Int']>,
  height?: Maybe<Scalars['Int']>,
  base64Width?: Maybe<Scalars['Int']>,
  jpegProgressive?: Maybe<Scalars['Boolean']>,
  pngCompressionSpeed?: Maybe<Scalars['Int']>,
  grayscale?: Maybe<Scalars['Boolean']>,
  duotone?: Maybe<DuotoneGradient>,
  traceSVG?: Maybe<Potrace>,
  quality?: Maybe<Scalars['Int']>,
  jpegQuality?: Maybe<Scalars['Int']>,
  pngQuality?: Maybe<Scalars['Int']>,
  webpQuality?: Maybe<Scalars['Int']>,
  toFormat?: Maybe<ImageFormat>,
  toFormatBase64?: Maybe<ImageFormat>,
  cropFocus?: Maybe<ImageCropFocus>,
  fit?: Maybe<ImageFit>,
  background?: Maybe<Scalars['String']>,
  rotate?: Maybe<Scalars['Int']>,
  trim?: Maybe<Scalars['Float']>
};


export type ImageSharpResolutionsArgs = {
  width?: Maybe<Scalars['Int']>,
  height?: Maybe<Scalars['Int']>,
  base64Width?: Maybe<Scalars['Int']>,
  jpegProgressive?: Maybe<Scalars['Boolean']>,
  pngCompressionSpeed?: Maybe<Scalars['Int']>,
  grayscale?: Maybe<Scalars['Boolean']>,
  duotone?: Maybe<DuotoneGradient>,
  traceSVG?: Maybe<Potrace>,
  quality?: Maybe<Scalars['Int']>,
  jpegQuality?: Maybe<Scalars['Int']>,
  pngQuality?: Maybe<Scalars['Int']>,
  webpQuality?: Maybe<Scalars['Int']>,
  toFormat?: Maybe<ImageFormat>,
  toFormatBase64?: Maybe<ImageFormat>,
  cropFocus?: Maybe<ImageCropFocus>,
  fit?: Maybe<ImageFit>,
  background?: Maybe<Scalars['String']>,
  rotate?: Maybe<Scalars['Int']>,
  trim?: Maybe<Scalars['Float']>
};


export type ImageSharpFluidArgs = {
  maxWidth?: Maybe<Scalars['Int']>,
  maxHeight?: Maybe<Scalars['Int']>,
  base64Width?: Maybe<Scalars['Int']>,
  grayscale?: Maybe<Scalars['Boolean']>,
  jpegProgressive?: Maybe<Scalars['Boolean']>,
  pngCompressionSpeed?: Maybe<Scalars['Int']>,
  duotone?: Maybe<DuotoneGradient>,
  traceSVG?: Maybe<Potrace>,
  quality?: Maybe<Scalars['Int']>,
  jpegQuality?: Maybe<Scalars['Int']>,
  pngQuality?: Maybe<Scalars['Int']>,
  webpQuality?: Maybe<Scalars['Int']>,
  toFormat?: Maybe<ImageFormat>,
  toFormatBase64?: Maybe<ImageFormat>,
  cropFocus?: Maybe<ImageCropFocus>,
  fit?: Maybe<ImageFit>,
  background?: Maybe<Scalars['String']>,
  rotate?: Maybe<Scalars['Int']>,
  trim?: Maybe<Scalars['Float']>,
  sizes?: Maybe<Scalars['String']>,
  srcSetBreakpoints?: Maybe<Array<Maybe<Scalars['Int']>>>
};


export type ImageSharpSizesArgs = {
  maxWidth?: Maybe<Scalars['Int']>,
  maxHeight?: Maybe<Scalars['Int']>,
  base64Width?: Maybe<Scalars['Int']>,
  grayscale?: Maybe<Scalars['Boolean']>,
  jpegProgressive?: Maybe<Scalars['Boolean']>,
  pngCompressionSpeed?: Maybe<Scalars['Int']>,
  duotone?: Maybe<DuotoneGradient>,
  traceSVG?: Maybe<Potrace>,
  quality?: Maybe<Scalars['Int']>,
  jpegQuality?: Maybe<Scalars['Int']>,
  pngQuality?: Maybe<Scalars['Int']>,
  webpQuality?: Maybe<Scalars['Int']>,
  toFormat?: Maybe<ImageFormat>,
  toFormatBase64?: Maybe<ImageFormat>,
  cropFocus?: Maybe<ImageCropFocus>,
  fit?: Maybe<ImageFit>,
  background?: Maybe<Scalars['String']>,
  rotate?: Maybe<Scalars['Int']>,
  trim?: Maybe<Scalars['Float']>,
  sizes?: Maybe<Scalars['String']>,
  srcSetBreakpoints?: Maybe<Array<Maybe<Scalars['Int']>>>
};


export type ImageSharpResizeArgs = {
  width?: Maybe<Scalars['Int']>,
  height?: Maybe<Scalars['Int']>,
  quality?: Maybe<Scalars['Int']>,
  jpegQuality?: Maybe<Scalars['Int']>,
  pngQuality?: Maybe<Scalars['Int']>,
  webpQuality?: Maybe<Scalars['Int']>,
  jpegProgressive?: Maybe<Scalars['Boolean']>,
  pngCompressionLevel?: Maybe<Scalars['Int']>,
  pngCompressionSpeed?: Maybe<Scalars['Int']>,
  grayscale?: Maybe<Scalars['Boolean']>,
  duotone?: Maybe<DuotoneGradient>,
  base64?: Maybe<Scalars['Boolean']>,
  traceSVG?: Maybe<Potrace>,
  toFormat?: Maybe<ImageFormat>,
  cropFocus?: Maybe<ImageCropFocus>,
  fit?: Maybe<ImageFit>,
  background?: Maybe<Scalars['String']>,
  rotate?: Maybe<Scalars['Int']>,
  trim?: Maybe<Scalars['Float']>
};

export type ImageSharpConnection = {
   __typename?: 'ImageSharpConnection',
  totalCount: Scalars['Int'],
  edges: Array<ImageSharpEdge>,
  nodes: Array<ImageSharp>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<ImageSharpGroupConnection>,
};


export type ImageSharpConnectionDistinctArgs = {
  field: ImageSharpFieldsEnum
};


export type ImageSharpConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: ImageSharpFieldsEnum
};

export type ImageSharpEdge = {
   __typename?: 'ImageSharpEdge',
  next?: Maybe<ImageSharp>,
  node: ImageSharp,
  previous?: Maybe<ImageSharp>,
};

export enum ImageSharpFieldsEnum {
  FixedBase64 = 'fixed___base64',
  FixedTracedSvg = 'fixed___tracedSVG',
  FixedAspectRatio = 'fixed___aspectRatio',
  FixedWidth = 'fixed___width',
  FixedHeight = 'fixed___height',
  FixedSrc = 'fixed___src',
  FixedSrcSet = 'fixed___srcSet',
  FixedSrcWebp = 'fixed___srcWebp',
  FixedSrcSetWebp = 'fixed___srcSetWebp',
  FixedOriginalName = 'fixed___originalName',
  ResolutionsBase64 = 'resolutions___base64',
  ResolutionsTracedSvg = 'resolutions___tracedSVG',
  ResolutionsAspectRatio = 'resolutions___aspectRatio',
  ResolutionsWidth = 'resolutions___width',
  ResolutionsHeight = 'resolutions___height',
  ResolutionsSrc = 'resolutions___src',
  ResolutionsSrcSet = 'resolutions___srcSet',
  ResolutionsSrcWebp = 'resolutions___srcWebp',
  ResolutionsSrcSetWebp = 'resolutions___srcSetWebp',
  ResolutionsOriginalName = 'resolutions___originalName',
  FluidBase64 = 'fluid___base64',
  FluidTracedSvg = 'fluid___tracedSVG',
  FluidAspectRatio = 'fluid___aspectRatio',
  FluidSrc = 'fluid___src',
  FluidSrcSet = 'fluid___srcSet',
  FluidSrcWebp = 'fluid___srcWebp',
  FluidSrcSetWebp = 'fluid___srcSetWebp',
  FluidSizes = 'fluid___sizes',
  FluidOriginalImg = 'fluid___originalImg',
  FluidOriginalName = 'fluid___originalName',
  FluidPresentationWidth = 'fluid___presentationWidth',
  FluidPresentationHeight = 'fluid___presentationHeight',
  SizesBase64 = 'sizes___base64',
  SizesTracedSvg = 'sizes___tracedSVG',
  SizesAspectRatio = 'sizes___aspectRatio',
  SizesSrc = 'sizes___src',
  SizesSrcSet = 'sizes___srcSet',
  SizesSrcWebp = 'sizes___srcWebp',
  SizesSrcSetWebp = 'sizes___srcSetWebp',
  SizesSizes = 'sizes___sizes',
  SizesOriginalImg = 'sizes___originalImg',
  SizesOriginalName = 'sizes___originalName',
  SizesPresentationWidth = 'sizes___presentationWidth',
  SizesPresentationHeight = 'sizes___presentationHeight',
  OriginalWidth = 'original___width',
  OriginalHeight = 'original___height',
  OriginalSrc = 'original___src',
  ResizeSrc = 'resize___src',
  ResizeTracedSvg = 'resize___tracedSVG',
  ResizeWidth = 'resize___width',
  ResizeHeight = 'resize___height',
  ResizeAspectRatio = 'resize___aspectRatio',
  ResizeOriginalName = 'resize___originalName',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type ImageSharpFilterInput = {
  fixed?: Maybe<ImageSharpFixedFilterInput>,
  resolutions?: Maybe<ImageSharpResolutionsFilterInput>,
  fluid?: Maybe<ImageSharpFluidFilterInput>,
  sizes?: Maybe<ImageSharpSizesFilterInput>,
  original?: Maybe<ImageSharpOriginalFilterInput>,
  resize?: Maybe<ImageSharpResizeFilterInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
};

export type ImageSharpFixed = {
   __typename?: 'ImageSharpFixed',
  base64?: Maybe<Scalars['String']>,
  tracedSVG?: Maybe<Scalars['String']>,
  aspectRatio?: Maybe<Scalars['Float']>,
  width: Scalars['Float'],
  height: Scalars['Float'],
  src: Scalars['String'],
  srcSet: Scalars['String'],
  srcWebp?: Maybe<Scalars['String']>,
  srcSetWebp?: Maybe<Scalars['String']>,
  originalName?: Maybe<Scalars['String']>,
};

export type ImageSharpFixedFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>,
  tracedSVG?: Maybe<StringQueryOperatorInput>,
  aspectRatio?: Maybe<FloatQueryOperatorInput>,
  width?: Maybe<FloatQueryOperatorInput>,
  height?: Maybe<FloatQueryOperatorInput>,
  src?: Maybe<StringQueryOperatorInput>,
  srcSet?: Maybe<StringQueryOperatorInput>,
  srcWebp?: Maybe<StringQueryOperatorInput>,
  srcSetWebp?: Maybe<StringQueryOperatorInput>,
  originalName?: Maybe<StringQueryOperatorInput>,
};

export type ImageSharpFluid = {
   __typename?: 'ImageSharpFluid',
  base64?: Maybe<Scalars['String']>,
  tracedSVG?: Maybe<Scalars['String']>,
  aspectRatio: Scalars['Float'],
  src: Scalars['String'],
  srcSet: Scalars['String'],
  srcWebp?: Maybe<Scalars['String']>,
  srcSetWebp?: Maybe<Scalars['String']>,
  sizes: Scalars['String'],
  originalImg?: Maybe<Scalars['String']>,
  originalName?: Maybe<Scalars['String']>,
  presentationWidth?: Maybe<Scalars['Int']>,
  presentationHeight?: Maybe<Scalars['Int']>,
};

export type ImageSharpFluidFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>,
  tracedSVG?: Maybe<StringQueryOperatorInput>,
  aspectRatio?: Maybe<FloatQueryOperatorInput>,
  src?: Maybe<StringQueryOperatorInput>,
  srcSet?: Maybe<StringQueryOperatorInput>,
  srcWebp?: Maybe<StringQueryOperatorInput>,
  srcSetWebp?: Maybe<StringQueryOperatorInput>,
  sizes?: Maybe<StringQueryOperatorInput>,
  originalImg?: Maybe<StringQueryOperatorInput>,
  originalName?: Maybe<StringQueryOperatorInput>,
  presentationWidth?: Maybe<IntQueryOperatorInput>,
  presentationHeight?: Maybe<IntQueryOperatorInput>,
};

export type ImageSharpGroupConnection = {
   __typename?: 'ImageSharpGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<ImageSharpEdge>,
  nodes: Array<ImageSharp>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type ImageSharpOriginal = {
   __typename?: 'ImageSharpOriginal',
  width?: Maybe<Scalars['Float']>,
  height?: Maybe<Scalars['Float']>,
  src?: Maybe<Scalars['String']>,
};

export type ImageSharpOriginalFilterInput = {
  width?: Maybe<FloatQueryOperatorInput>,
  height?: Maybe<FloatQueryOperatorInput>,
  src?: Maybe<StringQueryOperatorInput>,
};

export type ImageSharpResize = {
   __typename?: 'ImageSharpResize',
  src?: Maybe<Scalars['String']>,
  tracedSVG?: Maybe<Scalars['String']>,
  width?: Maybe<Scalars['Int']>,
  height?: Maybe<Scalars['Int']>,
  aspectRatio?: Maybe<Scalars['Float']>,
  originalName?: Maybe<Scalars['String']>,
};

export type ImageSharpResizeFilterInput = {
  src?: Maybe<StringQueryOperatorInput>,
  tracedSVG?: Maybe<StringQueryOperatorInput>,
  width?: Maybe<IntQueryOperatorInput>,
  height?: Maybe<IntQueryOperatorInput>,
  aspectRatio?: Maybe<FloatQueryOperatorInput>,
  originalName?: Maybe<StringQueryOperatorInput>,
};

export type ImageSharpResolutions = {
   __typename?: 'ImageSharpResolutions',
  base64?: Maybe<Scalars['String']>,
  tracedSVG?: Maybe<Scalars['String']>,
  aspectRatio?: Maybe<Scalars['Float']>,
  width: Scalars['Float'],
  height: Scalars['Float'],
  src: Scalars['String'],
  srcSet: Scalars['String'],
  srcWebp?: Maybe<Scalars['String']>,
  srcSetWebp?: Maybe<Scalars['String']>,
  originalName?: Maybe<Scalars['String']>,
};

export type ImageSharpResolutionsFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>,
  tracedSVG?: Maybe<StringQueryOperatorInput>,
  aspectRatio?: Maybe<FloatQueryOperatorInput>,
  width?: Maybe<FloatQueryOperatorInput>,
  height?: Maybe<FloatQueryOperatorInput>,
  src?: Maybe<StringQueryOperatorInput>,
  srcSet?: Maybe<StringQueryOperatorInput>,
  srcWebp?: Maybe<StringQueryOperatorInput>,
  srcSetWebp?: Maybe<StringQueryOperatorInput>,
  originalName?: Maybe<StringQueryOperatorInput>,
};

export type ImageSharpSizes = {
   __typename?: 'ImageSharpSizes',
  base64?: Maybe<Scalars['String']>,
  tracedSVG?: Maybe<Scalars['String']>,
  aspectRatio: Scalars['Float'],
  src: Scalars['String'],
  srcSet: Scalars['String'],
  srcWebp?: Maybe<Scalars['String']>,
  srcSetWebp?: Maybe<Scalars['String']>,
  sizes: Scalars['String'],
  originalImg?: Maybe<Scalars['String']>,
  originalName?: Maybe<Scalars['String']>,
  presentationWidth?: Maybe<Scalars['Int']>,
  presentationHeight?: Maybe<Scalars['Int']>,
};

export type ImageSharpSizesFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>,
  tracedSVG?: Maybe<StringQueryOperatorInput>,
  aspectRatio?: Maybe<FloatQueryOperatorInput>,
  src?: Maybe<StringQueryOperatorInput>,
  srcSet?: Maybe<StringQueryOperatorInput>,
  srcWebp?: Maybe<StringQueryOperatorInput>,
  srcSetWebp?: Maybe<StringQueryOperatorInput>,
  sizes?: Maybe<StringQueryOperatorInput>,
  originalImg?: Maybe<StringQueryOperatorInput>,
  originalName?: Maybe<StringQueryOperatorInput>,
  presentationWidth?: Maybe<IntQueryOperatorInput>,
  presentationHeight?: Maybe<IntQueryOperatorInput>,
};

export type ImageSharpSortInput = {
  fields?: Maybe<Array<Maybe<ImageSharpFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type Internal = {
   __typename?: 'Internal',
  content?: Maybe<Scalars['String']>,
  contentDigest: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  fieldOwners?: Maybe<Array<Maybe<Scalars['String']>>>,
  ignoreType?: Maybe<Scalars['Boolean']>,
  mediaType?: Maybe<Scalars['String']>,
  owner: Scalars['String'],
  type: Scalars['String'],
};

export type InternalFilterInput = {
  content?: Maybe<StringQueryOperatorInput>,
  contentDigest?: Maybe<StringQueryOperatorInput>,
  description?: Maybe<StringQueryOperatorInput>,
  fieldOwners?: Maybe<StringQueryOperatorInput>,
  ignoreType?: Maybe<BooleanQueryOperatorInput>,
  mediaType?: Maybe<StringQueryOperatorInput>,
  owner?: Maybe<StringQueryOperatorInput>,
  type?: Maybe<StringQueryOperatorInput>,
};

export type IntQueryOperatorInput = {
  eq?: Maybe<Scalars['Int']>,
  ne?: Maybe<Scalars['Int']>,
  gt?: Maybe<Scalars['Int']>,
  gte?: Maybe<Scalars['Int']>,
  lt?: Maybe<Scalars['Int']>,
  lte?: Maybe<Scalars['Int']>,
  in?: Maybe<Array<Maybe<Scalars['Int']>>>,
  nin?: Maybe<Array<Maybe<Scalars['Int']>>>,
};


export type JsonQueryOperatorInput = {
  eq?: Maybe<Scalars['JSON']>,
  ne?: Maybe<Scalars['JSON']>,
  in?: Maybe<Array<Maybe<Scalars['JSON']>>>,
  nin?: Maybe<Array<Maybe<Scalars['JSON']>>>,
  regex?: Maybe<Scalars['JSON']>,
  glob?: Maybe<Scalars['JSON']>,
};

export type Node = {
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
};

export type NodeFilterInput = {
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
};

export type NodeFilterListInput = {
  elemMatch?: Maybe<NodeFilterInput>,
};

export type PageInfo = {
   __typename?: 'PageInfo',
  currentPage: Scalars['Int'],
  hasPreviousPage: Scalars['Boolean'],
  hasNextPage: Scalars['Boolean'],
  itemCount: Scalars['Int'],
  pageCount: Scalars['Int'],
  perPage?: Maybe<Scalars['Int']>,
};

export type Potrace = {
  turnPolicy?: Maybe<PotraceTurnPolicy>,
  turdSize?: Maybe<Scalars['Float']>,
  alphaMax?: Maybe<Scalars['Float']>,
  optCurve?: Maybe<Scalars['Boolean']>,
  optTolerance?: Maybe<Scalars['Float']>,
  threshold?: Maybe<Scalars['Int']>,
  blackOnWhite?: Maybe<Scalars['Boolean']>,
  color?: Maybe<Scalars['String']>,
  background?: Maybe<Scalars['String']>,
};

export enum PotraceTurnPolicy {
  TurnpolicyBlack = 'TURNPOLICY_BLACK',
  TurnpolicyWhite = 'TURNPOLICY_WHITE',
  TurnpolicyLeft = 'TURNPOLICY_LEFT',
  TurnpolicyRight = 'TURNPOLICY_RIGHT',
  TurnpolicyMinority = 'TURNPOLICY_MINORITY',
  TurnpolicyMajority = 'TURNPOLICY_MAJORITY'
}

export type Query = {
   __typename?: 'Query',
  file?: Maybe<File>,
  allFile: FileConnection,
  directory?: Maybe<Directory>,
  allDirectory: DirectoryConnection,
  sitePage?: Maybe<SitePage>,
  allSitePage: SitePageConnection,
  site?: Maybe<Site>,
  allSite: SiteConnection,
  imageSharp?: Maybe<ImageSharp>,
  allImageSharp: ImageSharpConnection,
  sanityCity?: Maybe<SanityCity>,
  allSanityCity: SanityCityConnection,
  sanityCityHost?: Maybe<SanityCityHost>,
  allSanityCityHost: SanityCityHostConnection,
  sanityFaqCategory?: Maybe<SanityFaqCategory>,
  allSanityFaqCategory: SanityFaqCategoryConnection,
  sanityGallery?: Maybe<SanityGallery>,
  allSanityGallery: SanityGalleryConnection,
  sanityGalleryCategory?: Maybe<SanityGalleryCategory>,
  allSanityGalleryCategory: SanityGalleryCategoryConnection,
  sanityGeneral?: Maybe<SanityGeneral>,
  allSanityGeneral: SanityGeneralConnection,
  sanityHangout?: Maybe<SanityHangout>,
  allSanityHangout: SanityHangoutConnection,
  sanityHub?: Maybe<SanityHub>,
  allSanityHub: SanityHubConnection,
  sanityLocationSubpage?: Maybe<SanityLocationSubpage>,
  allSanityLocationSubpage: SanityLocationSubpageConnection,
  sanityMainPage?: Maybe<SanityMainPage>,
  allSanityMainPage: SanityMainPageConnection,
  sanityFileAsset?: Maybe<SanityFileAsset>,
  allSanityFileAsset: SanityFileAssetConnection,
  sanityImageAsset?: Maybe<SanityImageAsset>,
  allSanityImageAsset: SanityImageAssetConnection,
  sanityTemplate?: Maybe<SanityTemplate>,
  allSanityTemplate: SanityTemplateConnection,
  siteBuildMetadata?: Maybe<SiteBuildMetadata>,
  allSiteBuildMetadata: SiteBuildMetadataConnection,
  sitePlugin?: Maybe<SitePlugin>,
  allSitePlugin: SitePluginConnection,
};


export type QueryFileArgs = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>,
  absolutePath?: Maybe<StringQueryOperatorInput>,
  relativePath?: Maybe<StringQueryOperatorInput>,
  extension?: Maybe<StringQueryOperatorInput>,
  size?: Maybe<IntQueryOperatorInput>,
  prettySize?: Maybe<StringQueryOperatorInput>,
  modifiedTime?: Maybe<DateQueryOperatorInput>,
  accessTime?: Maybe<DateQueryOperatorInput>,
  changeTime?: Maybe<DateQueryOperatorInput>,
  birthTime?: Maybe<DateQueryOperatorInput>,
  root?: Maybe<StringQueryOperatorInput>,
  dir?: Maybe<StringQueryOperatorInput>,
  base?: Maybe<StringQueryOperatorInput>,
  ext?: Maybe<StringQueryOperatorInput>,
  name?: Maybe<StringQueryOperatorInput>,
  relativeDirectory?: Maybe<StringQueryOperatorInput>,
  dev?: Maybe<IntQueryOperatorInput>,
  mode?: Maybe<IntQueryOperatorInput>,
  nlink?: Maybe<IntQueryOperatorInput>,
  uid?: Maybe<IntQueryOperatorInput>,
  gid?: Maybe<IntQueryOperatorInput>,
  rdev?: Maybe<IntQueryOperatorInput>,
  ino?: Maybe<FloatQueryOperatorInput>,
  atimeMs?: Maybe<FloatQueryOperatorInput>,
  mtimeMs?: Maybe<FloatQueryOperatorInput>,
  ctimeMs?: Maybe<FloatQueryOperatorInput>,
  atime?: Maybe<DateQueryOperatorInput>,
  mtime?: Maybe<DateQueryOperatorInput>,
  ctime?: Maybe<DateQueryOperatorInput>,
  birthtime?: Maybe<DateQueryOperatorInput>,
  birthtimeMs?: Maybe<FloatQueryOperatorInput>,
  blksize?: Maybe<IntQueryOperatorInput>,
  blocks?: Maybe<IntQueryOperatorInput>,
  publicURL?: Maybe<StringQueryOperatorInput>,
  childImageSharp?: Maybe<ImageSharpFilterInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>
};


export type QueryAllFileArgs = {
  filter?: Maybe<FileFilterInput>,
  sort?: Maybe<FileSortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QueryDirectoryArgs = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>,
  absolutePath?: Maybe<StringQueryOperatorInput>,
  relativePath?: Maybe<StringQueryOperatorInput>,
  extension?: Maybe<StringQueryOperatorInput>,
  size?: Maybe<IntQueryOperatorInput>,
  prettySize?: Maybe<StringQueryOperatorInput>,
  modifiedTime?: Maybe<DateQueryOperatorInput>,
  accessTime?: Maybe<DateQueryOperatorInput>,
  changeTime?: Maybe<DateQueryOperatorInput>,
  birthTime?: Maybe<DateQueryOperatorInput>,
  root?: Maybe<StringQueryOperatorInput>,
  dir?: Maybe<StringQueryOperatorInput>,
  base?: Maybe<StringQueryOperatorInput>,
  ext?: Maybe<StringQueryOperatorInput>,
  name?: Maybe<StringQueryOperatorInput>,
  relativeDirectory?: Maybe<StringQueryOperatorInput>,
  dev?: Maybe<IntQueryOperatorInput>,
  mode?: Maybe<IntQueryOperatorInput>,
  nlink?: Maybe<IntQueryOperatorInput>,
  uid?: Maybe<IntQueryOperatorInput>,
  gid?: Maybe<IntQueryOperatorInput>,
  rdev?: Maybe<IntQueryOperatorInput>,
  ino?: Maybe<FloatQueryOperatorInput>,
  atimeMs?: Maybe<FloatQueryOperatorInput>,
  mtimeMs?: Maybe<FloatQueryOperatorInput>,
  ctimeMs?: Maybe<FloatQueryOperatorInput>,
  atime?: Maybe<DateQueryOperatorInput>,
  mtime?: Maybe<DateQueryOperatorInput>,
  ctime?: Maybe<DateQueryOperatorInput>,
  birthtime?: Maybe<DateQueryOperatorInput>,
  birthtimeMs?: Maybe<FloatQueryOperatorInput>,
  blksize?: Maybe<IntQueryOperatorInput>,
  blocks?: Maybe<IntQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>
};


export type QueryAllDirectoryArgs = {
  filter?: Maybe<DirectoryFilterInput>,
  sort?: Maybe<DirectorySortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QuerySitePageArgs = {
  path?: Maybe<StringQueryOperatorInput>,
  component?: Maybe<StringQueryOperatorInput>,
  internalComponentName?: Maybe<StringQueryOperatorInput>,
  componentChunkName?: Maybe<StringQueryOperatorInput>,
  matchPath?: Maybe<StringQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
  isCreatedByStatefulCreatePages?: Maybe<BooleanQueryOperatorInput>,
  context?: Maybe<SitePageContextFilterInput>,
  pluginCreator?: Maybe<SitePluginFilterInput>,
  pluginCreatorId?: Maybe<StringQueryOperatorInput>,
  componentPath?: Maybe<StringQueryOperatorInput>
};


export type QueryAllSitePageArgs = {
  filter?: Maybe<SitePageFilterInput>,
  sort?: Maybe<SitePageSortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QuerySiteArgs = {
  buildTime?: Maybe<DateQueryOperatorInput>,
  siteMetadata?: Maybe<SiteSiteMetadataFilterInput>,
  port?: Maybe<IntQueryOperatorInput>,
  host?: Maybe<StringQueryOperatorInput>,
  polyfill?: Maybe<BooleanQueryOperatorInput>,
  pathPrefix?: Maybe<StringQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>
};


export type QueryAllSiteArgs = {
  filter?: Maybe<SiteFilterInput>,
  sort?: Maybe<SiteSortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QueryImageSharpArgs = {
  fixed?: Maybe<ImageSharpFixedFilterInput>,
  resolutions?: Maybe<ImageSharpResolutionsFilterInput>,
  fluid?: Maybe<ImageSharpFluidFilterInput>,
  sizes?: Maybe<ImageSharpSizesFilterInput>,
  original?: Maybe<ImageSharpOriginalFilterInput>,
  resize?: Maybe<ImageSharpResizeFilterInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>
};


export type QueryAllImageSharpArgs = {
  filter?: Maybe<ImageSharpFilterInput>,
  sort?: Maybe<ImageSharpSortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QuerySanityCityArgs = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  name?: Maybe<SanityLocaleStringFilterInput>,
  slug?: Maybe<SanitySlugFilterInput>,
  image?: Maybe<SanityPictureFilterInput>,
  subpages?: Maybe<SanityLocationSubpageFilterListInput>,
  meta?: Maybe<SanityPageMetaFilterInput>,
  _rawName?: Maybe<JsonQueryOperatorInput>,
  _rawSlug?: Maybe<JsonQueryOperatorInput>,
  _rawImage?: Maybe<JsonQueryOperatorInput>,
  _rawSubpages?: Maybe<JsonQueryOperatorInput>,
  _rawMeta?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>
};


export type QueryAllSanityCityArgs = {
  filter?: Maybe<SanityCityFilterInput>,
  sort?: Maybe<SanityCitySortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QuerySanityCityHostArgs = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  name?: Maybe<StringQueryOperatorInput>,
  city?: Maybe<SanityCityFilterInput>,
  image?: Maybe<SanityPictureFilterInput>,
  _rawCity?: Maybe<JsonQueryOperatorInput>,
  _rawImage?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>
};


export type QueryAllSanityCityHostArgs = {
  filter?: Maybe<SanityCityHostFilterInput>,
  sort?: Maybe<SanityCityHostSortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QuerySanityFaqCategoryArgs = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  title?: Maybe<SanityLocaleStringFilterInput>,
  description?: Maybe<SanityLocaleTextFilterInput>,
  questions?: Maybe<SanityFaqFilterListInput>,
  _rawTitle?: Maybe<JsonQueryOperatorInput>,
  _rawDescription?: Maybe<JsonQueryOperatorInput>,
  _rawQuestions?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>
};


export type QueryAllSanityFaqCategoryArgs = {
  filter?: Maybe<SanityFaqCategoryFilterInput>,
  sort?: Maybe<SanityFaqCategorySortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QuerySanityGalleryArgs = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  name?: Maybe<StringQueryOperatorInput>,
  _rawImages?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>
};


export type QueryAllSanityGalleryArgs = {
  filter?: Maybe<SanityGalleryFilterInput>,
  sort?: Maybe<SanityGallerySortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QuerySanityGalleryCategoryArgs = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  title?: Maybe<SanityLocaleStringFilterInput>,
  _rawTitle?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>
};


export type QueryAllSanityGalleryCategoryArgs = {
  filter?: Maybe<SanityGalleryCategoryFilterInput>,
  sort?: Maybe<SanityGalleryCategorySortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QuerySanityGeneralArgs = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  title?: Maybe<SanityLocaleStringFilterInput>,
  lead?: Maybe<SanityLocaleTextFilterInput>,
  _rawTitle?: Maybe<JsonQueryOperatorInput>,
  _rawLead?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>
};


export type QueryAllSanityGeneralArgs = {
  filter?: Maybe<SanityGeneralFilterInput>,
  sort?: Maybe<SanityGeneralSortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QuerySanityHangoutArgs = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  city?: Maybe<SanityCityFilterInput>,
  title?: Maybe<SanityLocaleStringFilterInput>,
  lead?: Maybe<SanityLocaleTextFilterInput>,
  _rawCity?: Maybe<JsonQueryOperatorInput>,
  _rawTitle?: Maybe<JsonQueryOperatorInput>,
  _rawLead?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>
};


export type QueryAllSanityHangoutArgs = {
  filter?: Maybe<SanityHangoutFilterInput>,
  sort?: Maybe<SanityHangoutSortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QuerySanityHubArgs = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  city?: Maybe<SanityCityFilterInput>,
  title?: Maybe<SanityLocaleStringFilterInput>,
  lead?: Maybe<SanityLocaleTextFilterInput>,
  _rawCity?: Maybe<JsonQueryOperatorInput>,
  _rawTitle?: Maybe<JsonQueryOperatorInput>,
  _rawLead?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>
};


export type QueryAllSanityHubArgs = {
  filter?: Maybe<SanityHubFilterInput>,
  sort?: Maybe<SanityHubSortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QuerySanityLocationSubpageArgs = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  template?: Maybe<SanityTemplateFilterInput>,
  city?: Maybe<SanityCityFilterInput>,
  menuImage?: Maybe<SanityPictureFilterInput>,
  meta?: Maybe<SanityPageMetaFilterInput>,
  _rawTemplate?: Maybe<JsonQueryOperatorInput>,
  _rawCity?: Maybe<JsonQueryOperatorInput>,
  _rawLayout?: Maybe<JsonQueryOperatorInput>,
  _rawMenuImage?: Maybe<JsonQueryOperatorInput>,
  _rawMeta?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>
};


export type QueryAllSanityLocationSubpageArgs = {
  filter?: Maybe<SanityLocationSubpageFilterInput>,
  sort?: Maybe<SanityLocationSubpageSortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QuerySanityMainPageArgs = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  title?: Maybe<SanityLocaleStringFilterInput>,
  slug?: Maybe<SanitySlugFilterInput>,
  layout?: Maybe<SanityGeneralFilterInput>,
  meta?: Maybe<SanityPageMetaFilterInput>,
  _rawTitle?: Maybe<JsonQueryOperatorInput>,
  _rawSlug?: Maybe<JsonQueryOperatorInput>,
  _rawLayout?: Maybe<JsonQueryOperatorInput>,
  _rawMeta?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>
};


export type QueryAllSanityMainPageArgs = {
  filter?: Maybe<SanityMainPageFilterInput>,
  sort?: Maybe<SanityMainPageSortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QuerySanityFileAssetArgs = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  originalFilename?: Maybe<StringQueryOperatorInput>,
  label?: Maybe<StringQueryOperatorInput>,
  title?: Maybe<StringQueryOperatorInput>,
  description?: Maybe<StringQueryOperatorInput>,
  sha1hash?: Maybe<StringQueryOperatorInput>,
  extension?: Maybe<StringQueryOperatorInput>,
  mimeType?: Maybe<StringQueryOperatorInput>,
  size?: Maybe<FloatQueryOperatorInput>,
  assetId?: Maybe<StringQueryOperatorInput>,
  path?: Maybe<StringQueryOperatorInput>,
  url?: Maybe<StringQueryOperatorInput>,
  source?: Maybe<SanityAssetSourceDataFilterInput>,
  _rawSource?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>
};


export type QueryAllSanityFileAssetArgs = {
  filter?: Maybe<SanityFileAssetFilterInput>,
  sort?: Maybe<SanityFileAssetSortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QuerySanityImageAssetArgs = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  originalFilename?: Maybe<StringQueryOperatorInput>,
  label?: Maybe<StringQueryOperatorInput>,
  title?: Maybe<StringQueryOperatorInput>,
  description?: Maybe<StringQueryOperatorInput>,
  sha1hash?: Maybe<StringQueryOperatorInput>,
  extension?: Maybe<StringQueryOperatorInput>,
  mimeType?: Maybe<StringQueryOperatorInput>,
  size?: Maybe<FloatQueryOperatorInput>,
  assetId?: Maybe<StringQueryOperatorInput>,
  path?: Maybe<StringQueryOperatorInput>,
  url?: Maybe<StringQueryOperatorInput>,
  metadata?: Maybe<SanityImageMetadataFilterInput>,
  source?: Maybe<SanityAssetSourceDataFilterInput>,
  fixed?: Maybe<SanityImageFixedFilterInput>,
  fluid?: Maybe<SanityImageFluidFilterInput>,
  _rawMetadata?: Maybe<JsonQueryOperatorInput>,
  _rawSource?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>
};


export type QueryAllSanityImageAssetArgs = {
  filter?: Maybe<SanityImageAssetFilterInput>,
  sort?: Maybe<SanityImageAssetSortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QuerySanityTemplateArgs = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  title?: Maybe<SanityLocaleStringFilterInput>,
  slug?: Maybe<SanitySlugFilterInput>,
  _rawTitle?: Maybe<JsonQueryOperatorInput>,
  _rawSlug?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>
};


export type QueryAllSanityTemplateArgs = {
  filter?: Maybe<SanityTemplateFilterInput>,
  sort?: Maybe<SanityTemplateSortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QuerySiteBuildMetadataArgs = {
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
  buildTime?: Maybe<DateQueryOperatorInput>
};


export type QueryAllSiteBuildMetadataArgs = {
  filter?: Maybe<SiteBuildMetadataFilterInput>,
  sort?: Maybe<SiteBuildMetadataSortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};


export type QuerySitePluginArgs = {
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
  resolve?: Maybe<StringQueryOperatorInput>,
  name?: Maybe<StringQueryOperatorInput>,
  version?: Maybe<StringQueryOperatorInput>,
  pluginOptions?: Maybe<SitePluginPluginOptionsFilterInput>,
  nodeAPIs?: Maybe<StringQueryOperatorInput>,
  browserAPIs?: Maybe<StringQueryOperatorInput>,
  ssrAPIs?: Maybe<StringQueryOperatorInput>,
  pluginFilepath?: Maybe<StringQueryOperatorInput>,
  packageJson?: Maybe<SitePluginPackageJsonFilterInput>
};


export type QueryAllSitePluginArgs = {
  filter?: Maybe<SitePluginFilterInput>,
  sort?: Maybe<SitePluginSortInput>,
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>
};

export type SanityAlt = {
   __typename?: 'SanityAlt',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  en?: Maybe<Scalars['String']>,
  nl?: Maybe<Scalars['String']>,
};

export type SanityAssetSourceData = {
   __typename?: 'SanityAssetSourceData',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  sanityId?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
};

export type SanityAssetSourceDataFilterInput = {
  _key?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  name?: Maybe<StringQueryOperatorInput>,
  sanityId?: Maybe<StringQueryOperatorInput>,
  url?: Maybe<StringQueryOperatorInput>,
};

export type SanityBlock = {
   __typename?: 'SanityBlock',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  sanityChildren?: Maybe<Array<Maybe<SanitySpan>>>,
  style?: Maybe<Scalars['String']>,
  list?: Maybe<Scalars['String']>,
};

export type SanityCard = {
   __typename?: 'SanityCard',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  image?: Maybe<SanityPicture>,
  title?: Maybe<SanityLocaleString>,
  subtitle?: Maybe<SanityLocaleText>,
};

export type SanityCity = SanityDocument & Node & {
   __typename?: 'SanityCity',
  _id?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _createdAt?: Maybe<Scalars['Date']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  _rev?: Maybe<Scalars['String']>,
  _key?: Maybe<Scalars['String']>,
  name?: Maybe<SanityLocaleString>,
  slug?: Maybe<SanitySlug>,
  image?: Maybe<SanityPicture>,
  subpages?: Maybe<Array<Maybe<SanityLocationSubpage>>>,
  meta?: Maybe<SanityPageMeta>,
  _rawName?: Maybe<Scalars['JSON']>,
  _rawSlug?: Maybe<Scalars['JSON']>,
  _rawImage?: Maybe<Scalars['JSON']>,
  _rawSubpages?: Maybe<Scalars['JSON']>,
  _rawMeta?: Maybe<Scalars['JSON']>,
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
};


export type SanityCity_CreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityCity_UpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityCity_RawNameArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityCity_RawSlugArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityCity_RawImageArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityCity_RawSubpagesArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityCity_RawMetaArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};

export type SanityCityConnection = {
   __typename?: 'SanityCityConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityCityEdge>,
  nodes: Array<SanityCity>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<SanityCityGroupConnection>,
};


export type SanityCityConnectionDistinctArgs = {
  field: SanityCityFieldsEnum
};


export type SanityCityConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: SanityCityFieldsEnum
};

export type SanityCityEdge = {
   __typename?: 'SanityCityEdge',
  next?: Maybe<SanityCity>,
  node: SanityCity,
  previous?: Maybe<SanityCity>,
};

export enum SanityCityFieldsEnum {
  Id = '_id',
  Type = '_type',
  CreatedAt = '_createdAt',
  UpdatedAt = '_updatedAt',
  Rev = '_rev',
  Key = '_key',
  NameKey = 'name____key',
  NameType = 'name____type',
  NameEn = 'name___en',
  NameNl = 'name___nl',
  SlugKey = 'slug____key',
  SlugType = 'slug____type',
  SlugCurrent = 'slug___current',
  ImageKey = 'image____key',
  ImageType = 'image____type',
  ImageAltKey = 'image___alt____key',
  ImageAltType = 'image___alt____type',
  ImageAltEn = 'image___alt___en',
  ImageAltNl = 'image___alt___nl',
  ImageAssetId = 'image___asset____id',
  ImageAssetType = 'image___asset____type',
  ImageAssetCreatedAt = 'image___asset____createdAt',
  ImageAssetUpdatedAt = 'image___asset____updatedAt',
  ImageAssetRev = 'image___asset____rev',
  ImageAssetKey = 'image___asset____key',
  ImageAssetOriginalFilename = 'image___asset___originalFilename',
  ImageAssetLabel = 'image___asset___label',
  ImageAssetTitle = 'image___asset___title',
  ImageAssetDescription = 'image___asset___description',
  ImageAssetSha1hash = 'image___asset___sha1hash',
  ImageAssetExtension = 'image___asset___extension',
  ImageAssetMimeType = 'image___asset___mimeType',
  ImageAssetSize = 'image___asset___size',
  ImageAssetAssetId = 'image___asset___assetId',
  ImageAssetPath = 'image___asset___path',
  ImageAssetUrl = 'image___asset___url',
  ImageAssetMetadataKey = 'image___asset___metadata____key',
  ImageAssetMetadataType = 'image___asset___metadata____type',
  ImageAssetMetadataLqip = 'image___asset___metadata___lqip',
  ImageAssetMetadataHasAlpha = 'image___asset___metadata___hasAlpha',
  ImageAssetMetadataIsOpaque = 'image___asset___metadata___isOpaque',
  ImageAssetSourceKey = 'image___asset___source____key',
  ImageAssetSourceType = 'image___asset___source____type',
  ImageAssetSourceName = 'image___asset___source___name',
  ImageAssetSourceSanityId = 'image___asset___source___sanityId',
  ImageAssetSourceUrl = 'image___asset___source___url',
  ImageAssetFixedBase64 = 'image___asset___fixed___base64',
  ImageAssetFixedAspectRatio = 'image___asset___fixed___aspectRatio',
  ImageAssetFixedWidth = 'image___asset___fixed___width',
  ImageAssetFixedHeight = 'image___asset___fixed___height',
  ImageAssetFixedSrc = 'image___asset___fixed___src',
  ImageAssetFixedSrcSet = 'image___asset___fixed___srcSet',
  ImageAssetFixedSrcWebp = 'image___asset___fixed___srcWebp',
  ImageAssetFixedSrcSetWebp = 'image___asset___fixed___srcSetWebp',
  ImageAssetFluidBase64 = 'image___asset___fluid___base64',
  ImageAssetFluidAspectRatio = 'image___asset___fluid___aspectRatio',
  ImageAssetFluidSrc = 'image___asset___fluid___src',
  ImageAssetFluidSrcSet = 'image___asset___fluid___srcSet',
  ImageAssetFluidSrcWebp = 'image___asset___fluid___srcWebp',
  ImageAssetFluidSrcSetWebp = 'image___asset___fluid___srcSetWebp',
  ImageAssetFluidSizes = 'image___asset___fluid___sizes',
  ImageAssetRawMetadata = 'image___asset____rawMetadata',
  ImageAssetRawSource = 'image___asset____rawSource',
  ImageAssetId = 'image___asset___id',
  ImageAssetParentId = 'image___asset___parent___id',
  ImageAssetParentChildren = 'image___asset___parent___children',
  ImageAssetChildren = 'image___asset___children',
  ImageAssetChildrenId = 'image___asset___children___id',
  ImageAssetChildrenChildren = 'image___asset___children___children',
  ImageAssetInternalContent = 'image___asset___internal___content',
  ImageAssetInternalContentDigest = 'image___asset___internal___contentDigest',
  ImageAssetInternalDescription = 'image___asset___internal___description',
  ImageAssetInternalFieldOwners = 'image___asset___internal___fieldOwners',
  ImageAssetInternalIgnoreType = 'image___asset___internal___ignoreType',
  ImageAssetInternalMediaType = 'image___asset___internal___mediaType',
  ImageAssetInternalOwner = 'image___asset___internal___owner',
  ImageAssetInternalType = 'image___asset___internal___type',
  ImageHotspotKey = 'image___hotspot____key',
  ImageHotspotType = 'image___hotspot____type',
  ImageHotspotX = 'image___hotspot___x',
  ImageHotspotY = 'image___hotspot___y',
  ImageHotspotHeight = 'image___hotspot___height',
  ImageHotspotWidth = 'image___hotspot___width',
  ImageCropKey = 'image___crop____key',
  ImageCropType = 'image___crop____type',
  ImageCropTop = 'image___crop___top',
  ImageCropBottom = 'image___crop___bottom',
  ImageCropLeft = 'image___crop___left',
  ImageCropRight = 'image___crop___right',
  Subpages = 'subpages',
  SubpagesId = 'subpages____id',
  SubpagesType = 'subpages____type',
  SubpagesCreatedAt = 'subpages____createdAt',
  SubpagesUpdatedAt = 'subpages____updatedAt',
  SubpagesRev = 'subpages____rev',
  SubpagesKey = 'subpages____key',
  SubpagesTemplateId = 'subpages___template____id',
  SubpagesTemplateType = 'subpages___template____type',
  SubpagesTemplateCreatedAt = 'subpages___template____createdAt',
  SubpagesTemplateUpdatedAt = 'subpages___template____updatedAt',
  SubpagesTemplateRev = 'subpages___template____rev',
  SubpagesTemplateKey = 'subpages___template____key',
  SubpagesTemplateTitleKey = 'subpages___template___title____key',
  SubpagesTemplateTitleType = 'subpages___template___title____type',
  SubpagesTemplateTitleEn = 'subpages___template___title___en',
  SubpagesTemplateTitleNl = 'subpages___template___title___nl',
  SubpagesTemplateSlugKey = 'subpages___template___slug____key',
  SubpagesTemplateSlugType = 'subpages___template___slug____type',
  SubpagesTemplateSlugCurrent = 'subpages___template___slug___current',
  SubpagesTemplateRawTitle = 'subpages___template____rawTitle',
  SubpagesTemplateRawSlug = 'subpages___template____rawSlug',
  SubpagesTemplateId = 'subpages___template___id',
  SubpagesTemplateParentId = 'subpages___template___parent___id',
  SubpagesTemplateParentChildren = 'subpages___template___parent___children',
  SubpagesTemplateChildren = 'subpages___template___children',
  SubpagesTemplateChildrenId = 'subpages___template___children___id',
  SubpagesTemplateChildrenChildren = 'subpages___template___children___children',
  SubpagesTemplateInternalContent = 'subpages___template___internal___content',
  SubpagesTemplateInternalContentDigest = 'subpages___template___internal___contentDigest',
  SubpagesTemplateInternalDescription = 'subpages___template___internal___description',
  SubpagesTemplateInternalFieldOwners = 'subpages___template___internal___fieldOwners',
  SubpagesTemplateInternalIgnoreType = 'subpages___template___internal___ignoreType',
  SubpagesTemplateInternalMediaType = 'subpages___template___internal___mediaType',
  SubpagesTemplateInternalOwner = 'subpages___template___internal___owner',
  SubpagesTemplateInternalType = 'subpages___template___internal___type',
  SubpagesCityId = 'subpages___city____id',
  SubpagesCityType = 'subpages___city____type',
  SubpagesCityCreatedAt = 'subpages___city____createdAt',
  SubpagesCityUpdatedAt = 'subpages___city____updatedAt',
  SubpagesCityRev = 'subpages___city____rev',
  SubpagesCityKey = 'subpages___city____key',
  SubpagesCityNameKey = 'subpages___city___name____key',
  SubpagesCityNameType = 'subpages___city___name____type',
  SubpagesCityNameEn = 'subpages___city___name___en',
  SubpagesCityNameNl = 'subpages___city___name___nl',
  SubpagesCitySlugKey = 'subpages___city___slug____key',
  SubpagesCitySlugType = 'subpages___city___slug____type',
  SubpagesCitySlugCurrent = 'subpages___city___slug___current',
  SubpagesCityImageKey = 'subpages___city___image____key',
  SubpagesCityImageType = 'subpages___city___image____type',
  SubpagesCitySubpages = 'subpages___city___subpages',
  SubpagesCitySubpagesId = 'subpages___city___subpages____id',
  SubpagesCitySubpagesType = 'subpages___city___subpages____type',
  SubpagesCitySubpagesCreatedAt = 'subpages___city___subpages____createdAt',
  SubpagesCitySubpagesUpdatedAt = 'subpages___city___subpages____updatedAt',
  SubpagesCitySubpagesRev = 'subpages___city___subpages____rev',
  SubpagesCitySubpagesKey = 'subpages___city___subpages____key',
  SubpagesCitySubpagesRawTemplate = 'subpages___city___subpages____rawTemplate',
  SubpagesCitySubpagesRawCity = 'subpages___city___subpages____rawCity',
  SubpagesCitySubpagesRawLayout = 'subpages___city___subpages____rawLayout',
  SubpagesCitySubpagesRawMenuImage = 'subpages___city___subpages____rawMenuImage',
  SubpagesCitySubpagesRawMeta = 'subpages___city___subpages____rawMeta',
  SubpagesCitySubpagesId = 'subpages___city___subpages___id',
  SubpagesCitySubpagesChildren = 'subpages___city___subpages___children',
  SubpagesCityMetaKey = 'subpages___city___meta____key',
  SubpagesCityMetaType = 'subpages___city___meta____type',
  SubpagesCityMetaSitemap = 'subpages___city___meta___sitemap',
  SubpagesCityMetaRobots = 'subpages___city___meta___robots',
  SubpagesCityRawName = 'subpages___city____rawName',
  SubpagesCityRawSlug = 'subpages___city____rawSlug',
  SubpagesCityRawImage = 'subpages___city____rawImage',
  SubpagesCityRawSubpages = 'subpages___city____rawSubpages',
  SubpagesCityRawMeta = 'subpages___city____rawMeta',
  SubpagesCityId = 'subpages___city___id',
  SubpagesCityParentId = 'subpages___city___parent___id',
  SubpagesCityParentChildren = 'subpages___city___parent___children',
  SubpagesCityChildren = 'subpages___city___children',
  SubpagesCityChildrenId = 'subpages___city___children___id',
  SubpagesCityChildrenChildren = 'subpages___city___children___children',
  SubpagesCityInternalContent = 'subpages___city___internal___content',
  SubpagesCityInternalContentDigest = 'subpages___city___internal___contentDigest',
  SubpagesCityInternalDescription = 'subpages___city___internal___description',
  SubpagesCityInternalFieldOwners = 'subpages___city___internal___fieldOwners',
  SubpagesCityInternalIgnoreType = 'subpages___city___internal___ignoreType',
  SubpagesCityInternalMediaType = 'subpages___city___internal___mediaType',
  SubpagesCityInternalOwner = 'subpages___city___internal___owner',
  SubpagesCityInternalType = 'subpages___city___internal___type',
  SubpagesMenuImageKey = 'subpages___menuImage____key',
  SubpagesMenuImageType = 'subpages___menuImage____type',
  SubpagesMenuImageAltKey = 'subpages___menuImage___alt____key',
  SubpagesMenuImageAltType = 'subpages___menuImage___alt____type',
  SubpagesMenuImageAltEn = 'subpages___menuImage___alt___en',
  SubpagesMenuImageAltNl = 'subpages___menuImage___alt___nl',
  SubpagesMenuImageAssetId = 'subpages___menuImage___asset____id',
  SubpagesMenuImageAssetType = 'subpages___menuImage___asset____type',
  SubpagesMenuImageAssetCreatedAt = 'subpages___menuImage___asset____createdAt',
  SubpagesMenuImageAssetUpdatedAt = 'subpages___menuImage___asset____updatedAt',
  SubpagesMenuImageAssetRev = 'subpages___menuImage___asset____rev',
  SubpagesMenuImageAssetKey = 'subpages___menuImage___asset____key',
  SubpagesMenuImageAssetOriginalFilename = 'subpages___menuImage___asset___originalFilename',
  SubpagesMenuImageAssetLabel = 'subpages___menuImage___asset___label',
  SubpagesMenuImageAssetTitle = 'subpages___menuImage___asset___title',
  SubpagesMenuImageAssetDescription = 'subpages___menuImage___asset___description',
  SubpagesMenuImageAssetSha1hash = 'subpages___menuImage___asset___sha1hash',
  SubpagesMenuImageAssetExtension = 'subpages___menuImage___asset___extension',
  SubpagesMenuImageAssetMimeType = 'subpages___menuImage___asset___mimeType',
  SubpagesMenuImageAssetSize = 'subpages___menuImage___asset___size',
  SubpagesMenuImageAssetAssetId = 'subpages___menuImage___asset___assetId',
  SubpagesMenuImageAssetPath = 'subpages___menuImage___asset___path',
  SubpagesMenuImageAssetUrl = 'subpages___menuImage___asset___url',
  SubpagesMenuImageAssetRawMetadata = 'subpages___menuImage___asset____rawMetadata',
  SubpagesMenuImageAssetRawSource = 'subpages___menuImage___asset____rawSource',
  SubpagesMenuImageAssetId = 'subpages___menuImage___asset___id',
  SubpagesMenuImageAssetChildren = 'subpages___menuImage___asset___children',
  SubpagesMenuImageHotspotKey = 'subpages___menuImage___hotspot____key',
  SubpagesMenuImageHotspotType = 'subpages___menuImage___hotspot____type',
  SubpagesMenuImageHotspotX = 'subpages___menuImage___hotspot___x',
  SubpagesMenuImageHotspotY = 'subpages___menuImage___hotspot___y',
  SubpagesMenuImageHotspotHeight = 'subpages___menuImage___hotspot___height',
  SubpagesMenuImageHotspotWidth = 'subpages___menuImage___hotspot___width',
  SubpagesMenuImageCropKey = 'subpages___menuImage___crop____key',
  SubpagesMenuImageCropType = 'subpages___menuImage___crop____type',
  SubpagesMenuImageCropTop = 'subpages___menuImage___crop___top',
  SubpagesMenuImageCropBottom = 'subpages___menuImage___crop___bottom',
  SubpagesMenuImageCropLeft = 'subpages___menuImage___crop___left',
  SubpagesMenuImageCropRight = 'subpages___menuImage___crop___right',
  SubpagesMetaKey = 'subpages___meta____key',
  SubpagesMetaType = 'subpages___meta____type',
  SubpagesMetaSeoTitleKey = 'subpages___meta___seoTitle____key',
  SubpagesMetaSeoTitleType = 'subpages___meta___seoTitle____type',
  SubpagesMetaSeoTitleEn = 'subpages___meta___seoTitle___en',
  SubpagesMetaSeoTitleNl = 'subpages___meta___seoTitle___nl',
  SubpagesMetaSeoDescriptionKey = 'subpages___meta___seoDescription____key',
  SubpagesMetaSeoDescriptionType = 'subpages___meta___seoDescription____type',
  SubpagesMetaSeoDescriptionEn = 'subpages___meta___seoDescription___en',
  SubpagesMetaSeoDescriptionNl = 'subpages___meta___seoDescription___nl',
  SubpagesMetaSeoImageKey = 'subpages___meta___seoImage____key',
  SubpagesMetaSeoImageType = 'subpages___meta___seoImage____type',
  SubpagesMetaSitemap = 'subpages___meta___sitemap',
  SubpagesMetaRobots = 'subpages___meta___robots',
  SubpagesRawTemplate = 'subpages____rawTemplate',
  SubpagesRawCity = 'subpages____rawCity',
  SubpagesRawLayout = 'subpages____rawLayout',
  SubpagesRawMenuImage = 'subpages____rawMenuImage',
  SubpagesRawMeta = 'subpages____rawMeta',
  SubpagesId = 'subpages___id',
  SubpagesParentId = 'subpages___parent___id',
  SubpagesParentParentId = 'subpages___parent___parent___id',
  SubpagesParentParentChildren = 'subpages___parent___parent___children',
  SubpagesParentChildren = 'subpages___parent___children',
  SubpagesParentChildrenId = 'subpages___parent___children___id',
  SubpagesParentChildrenChildren = 'subpages___parent___children___children',
  SubpagesParentInternalContent = 'subpages___parent___internal___content',
  SubpagesParentInternalContentDigest = 'subpages___parent___internal___contentDigest',
  SubpagesParentInternalDescription = 'subpages___parent___internal___description',
  SubpagesParentInternalFieldOwners = 'subpages___parent___internal___fieldOwners',
  SubpagesParentInternalIgnoreType = 'subpages___parent___internal___ignoreType',
  SubpagesParentInternalMediaType = 'subpages___parent___internal___mediaType',
  SubpagesParentInternalOwner = 'subpages___parent___internal___owner',
  SubpagesParentInternalType = 'subpages___parent___internal___type',
  SubpagesChildren = 'subpages___children',
  SubpagesChildrenId = 'subpages___children___id',
  SubpagesChildrenParentId = 'subpages___children___parent___id',
  SubpagesChildrenParentChildren = 'subpages___children___parent___children',
  SubpagesChildrenChildren = 'subpages___children___children',
  SubpagesChildrenChildrenId = 'subpages___children___children___id',
  SubpagesChildrenChildrenChildren = 'subpages___children___children___children',
  SubpagesChildrenInternalContent = 'subpages___children___internal___content',
  SubpagesChildrenInternalContentDigest = 'subpages___children___internal___contentDigest',
  SubpagesChildrenInternalDescription = 'subpages___children___internal___description',
  SubpagesChildrenInternalFieldOwners = 'subpages___children___internal___fieldOwners',
  SubpagesChildrenInternalIgnoreType = 'subpages___children___internal___ignoreType',
  SubpagesChildrenInternalMediaType = 'subpages___children___internal___mediaType',
  SubpagesChildrenInternalOwner = 'subpages___children___internal___owner',
  SubpagesChildrenInternalType = 'subpages___children___internal___type',
  SubpagesInternalContent = 'subpages___internal___content',
  SubpagesInternalContentDigest = 'subpages___internal___contentDigest',
  SubpagesInternalDescription = 'subpages___internal___description',
  SubpagesInternalFieldOwners = 'subpages___internal___fieldOwners',
  SubpagesInternalIgnoreType = 'subpages___internal___ignoreType',
  SubpagesInternalMediaType = 'subpages___internal___mediaType',
  SubpagesInternalOwner = 'subpages___internal___owner',
  SubpagesInternalType = 'subpages___internal___type',
  MetaKey = 'meta____key',
  MetaType = 'meta____type',
  MetaSeoTitleKey = 'meta___seoTitle____key',
  MetaSeoTitleType = 'meta___seoTitle____type',
  MetaSeoTitleEn = 'meta___seoTitle___en',
  MetaSeoTitleNl = 'meta___seoTitle___nl',
  MetaSeoDescriptionKey = 'meta___seoDescription____key',
  MetaSeoDescriptionType = 'meta___seoDescription____type',
  MetaSeoDescriptionEn = 'meta___seoDescription___en',
  MetaSeoDescriptionNl = 'meta___seoDescription___nl',
  MetaSeoImageKey = 'meta___seoImage____key',
  MetaSeoImageType = 'meta___seoImage____type',
  MetaSeoImageAssetId = 'meta___seoImage___asset____id',
  MetaSeoImageAssetType = 'meta___seoImage___asset____type',
  MetaSeoImageAssetCreatedAt = 'meta___seoImage___asset____createdAt',
  MetaSeoImageAssetUpdatedAt = 'meta___seoImage___asset____updatedAt',
  MetaSeoImageAssetRev = 'meta___seoImage___asset____rev',
  MetaSeoImageAssetKey = 'meta___seoImage___asset____key',
  MetaSeoImageAssetOriginalFilename = 'meta___seoImage___asset___originalFilename',
  MetaSeoImageAssetLabel = 'meta___seoImage___asset___label',
  MetaSeoImageAssetTitle = 'meta___seoImage___asset___title',
  MetaSeoImageAssetDescription = 'meta___seoImage___asset___description',
  MetaSeoImageAssetSha1hash = 'meta___seoImage___asset___sha1hash',
  MetaSeoImageAssetExtension = 'meta___seoImage___asset___extension',
  MetaSeoImageAssetMimeType = 'meta___seoImage___asset___mimeType',
  MetaSeoImageAssetSize = 'meta___seoImage___asset___size',
  MetaSeoImageAssetAssetId = 'meta___seoImage___asset___assetId',
  MetaSeoImageAssetPath = 'meta___seoImage___asset___path',
  MetaSeoImageAssetUrl = 'meta___seoImage___asset___url',
  MetaSeoImageAssetRawMetadata = 'meta___seoImage___asset____rawMetadata',
  MetaSeoImageAssetRawSource = 'meta___seoImage___asset____rawSource',
  MetaSeoImageAssetId = 'meta___seoImage___asset___id',
  MetaSeoImageAssetChildren = 'meta___seoImage___asset___children',
  MetaSeoImageHotspotKey = 'meta___seoImage___hotspot____key',
  MetaSeoImageHotspotType = 'meta___seoImage___hotspot____type',
  MetaSeoImageHotspotX = 'meta___seoImage___hotspot___x',
  MetaSeoImageHotspotY = 'meta___seoImage___hotspot___y',
  MetaSeoImageHotspotHeight = 'meta___seoImage___hotspot___height',
  MetaSeoImageHotspotWidth = 'meta___seoImage___hotspot___width',
  MetaSeoImageCropKey = 'meta___seoImage___crop____key',
  MetaSeoImageCropType = 'meta___seoImage___crop____type',
  MetaSeoImageCropTop = 'meta___seoImage___crop___top',
  MetaSeoImageCropBottom = 'meta___seoImage___crop___bottom',
  MetaSeoImageCropLeft = 'meta___seoImage___crop___left',
  MetaSeoImageCropRight = 'meta___seoImage___crop___right',
  MetaSitemap = 'meta___sitemap',
  MetaRobots = 'meta___robots',
  RawName = '_rawName',
  RawSlug = '_rawSlug',
  RawImage = '_rawImage',
  RawSubpages = '_rawSubpages',
  RawMeta = '_rawMeta',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type SanityCityFilterInput = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  name?: Maybe<SanityLocaleStringFilterInput>,
  slug?: Maybe<SanitySlugFilterInput>,
  image?: Maybe<SanityPictureFilterInput>,
  subpages?: Maybe<SanityLocationSubpageFilterListInput>,
  meta?: Maybe<SanityPageMetaFilterInput>,
  _rawName?: Maybe<JsonQueryOperatorInput>,
  _rawSlug?: Maybe<JsonQueryOperatorInput>,
  _rawImage?: Maybe<JsonQueryOperatorInput>,
  _rawSubpages?: Maybe<JsonQueryOperatorInput>,
  _rawMeta?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
};

export type SanityCityGroupConnection = {
   __typename?: 'SanityCityGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityCityEdge>,
  nodes: Array<SanityCity>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type SanityCityHost = SanityDocument & Node & {
   __typename?: 'SanityCityHost',
  _id?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _createdAt?: Maybe<Scalars['Date']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  _rev?: Maybe<Scalars['String']>,
  _key?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  city?: Maybe<SanityCity>,
  image?: Maybe<SanityPicture>,
  _rawCity?: Maybe<Scalars['JSON']>,
  _rawImage?: Maybe<Scalars['JSON']>,
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
};


export type SanityCityHost_CreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityCityHost_UpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityCityHost_RawCityArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityCityHost_RawImageArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};

export type SanityCityHostConnection = {
   __typename?: 'SanityCityHostConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityCityHostEdge>,
  nodes: Array<SanityCityHost>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<SanityCityHostGroupConnection>,
};


export type SanityCityHostConnectionDistinctArgs = {
  field: SanityCityHostFieldsEnum
};


export type SanityCityHostConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: SanityCityHostFieldsEnum
};

export type SanityCityHostEdge = {
   __typename?: 'SanityCityHostEdge',
  next?: Maybe<SanityCityHost>,
  node: SanityCityHost,
  previous?: Maybe<SanityCityHost>,
};

export enum SanityCityHostFieldsEnum {
  Id = '_id',
  Type = '_type',
  CreatedAt = '_createdAt',
  UpdatedAt = '_updatedAt',
  Rev = '_rev',
  Key = '_key',
  Name = 'name',
  CityId = 'city____id',
  CityType = 'city____type',
  CityCreatedAt = 'city____createdAt',
  CityUpdatedAt = 'city____updatedAt',
  CityRev = 'city____rev',
  CityKey = 'city____key',
  CityNameKey = 'city___name____key',
  CityNameType = 'city___name____type',
  CityNameEn = 'city___name___en',
  CityNameNl = 'city___name___nl',
  CitySlugKey = 'city___slug____key',
  CitySlugType = 'city___slug____type',
  CitySlugCurrent = 'city___slug___current',
  CityImageKey = 'city___image____key',
  CityImageType = 'city___image____type',
  CityImageAltKey = 'city___image___alt____key',
  CityImageAltType = 'city___image___alt____type',
  CityImageAltEn = 'city___image___alt___en',
  CityImageAltNl = 'city___image___alt___nl',
  CityImageAssetId = 'city___image___asset____id',
  CityImageAssetType = 'city___image___asset____type',
  CityImageAssetCreatedAt = 'city___image___asset____createdAt',
  CityImageAssetUpdatedAt = 'city___image___asset____updatedAt',
  CityImageAssetRev = 'city___image___asset____rev',
  CityImageAssetKey = 'city___image___asset____key',
  CityImageAssetOriginalFilename = 'city___image___asset___originalFilename',
  CityImageAssetLabel = 'city___image___asset___label',
  CityImageAssetTitle = 'city___image___asset___title',
  CityImageAssetDescription = 'city___image___asset___description',
  CityImageAssetSha1hash = 'city___image___asset___sha1hash',
  CityImageAssetExtension = 'city___image___asset___extension',
  CityImageAssetMimeType = 'city___image___asset___mimeType',
  CityImageAssetSize = 'city___image___asset___size',
  CityImageAssetAssetId = 'city___image___asset___assetId',
  CityImageAssetPath = 'city___image___asset___path',
  CityImageAssetUrl = 'city___image___asset___url',
  CityImageAssetRawMetadata = 'city___image___asset____rawMetadata',
  CityImageAssetRawSource = 'city___image___asset____rawSource',
  CityImageAssetId = 'city___image___asset___id',
  CityImageAssetChildren = 'city___image___asset___children',
  CityImageHotspotKey = 'city___image___hotspot____key',
  CityImageHotspotType = 'city___image___hotspot____type',
  CityImageHotspotX = 'city___image___hotspot___x',
  CityImageHotspotY = 'city___image___hotspot___y',
  CityImageHotspotHeight = 'city___image___hotspot___height',
  CityImageHotspotWidth = 'city___image___hotspot___width',
  CityImageCropKey = 'city___image___crop____key',
  CityImageCropType = 'city___image___crop____type',
  CityImageCropTop = 'city___image___crop___top',
  CityImageCropBottom = 'city___image___crop___bottom',
  CityImageCropLeft = 'city___image___crop___left',
  CityImageCropRight = 'city___image___crop___right',
  CitySubpages = 'city___subpages',
  CitySubpagesId = 'city___subpages____id',
  CitySubpagesType = 'city___subpages____type',
  CitySubpagesCreatedAt = 'city___subpages____createdAt',
  CitySubpagesUpdatedAt = 'city___subpages____updatedAt',
  CitySubpagesRev = 'city___subpages____rev',
  CitySubpagesKey = 'city___subpages____key',
  CitySubpagesTemplateId = 'city___subpages___template____id',
  CitySubpagesTemplateType = 'city___subpages___template____type',
  CitySubpagesTemplateCreatedAt = 'city___subpages___template____createdAt',
  CitySubpagesTemplateUpdatedAt = 'city___subpages___template____updatedAt',
  CitySubpagesTemplateRev = 'city___subpages___template____rev',
  CitySubpagesTemplateKey = 'city___subpages___template____key',
  CitySubpagesTemplateRawTitle = 'city___subpages___template____rawTitle',
  CitySubpagesTemplateRawSlug = 'city___subpages___template____rawSlug',
  CitySubpagesTemplateId = 'city___subpages___template___id',
  CitySubpagesTemplateChildren = 'city___subpages___template___children',
  CitySubpagesCityId = 'city___subpages___city____id',
  CitySubpagesCityType = 'city___subpages___city____type',
  CitySubpagesCityCreatedAt = 'city___subpages___city____createdAt',
  CitySubpagesCityUpdatedAt = 'city___subpages___city____updatedAt',
  CitySubpagesCityRev = 'city___subpages___city____rev',
  CitySubpagesCityKey = 'city___subpages___city____key',
  CitySubpagesCitySubpages = 'city___subpages___city___subpages',
  CitySubpagesCityRawName = 'city___subpages___city____rawName',
  CitySubpagesCityRawSlug = 'city___subpages___city____rawSlug',
  CitySubpagesCityRawImage = 'city___subpages___city____rawImage',
  CitySubpagesCityRawSubpages = 'city___subpages___city____rawSubpages',
  CitySubpagesCityRawMeta = 'city___subpages___city____rawMeta',
  CitySubpagesCityId = 'city___subpages___city___id',
  CitySubpagesCityChildren = 'city___subpages___city___children',
  CitySubpagesMenuImageKey = 'city___subpages___menuImage____key',
  CitySubpagesMenuImageType = 'city___subpages___menuImage____type',
  CitySubpagesMetaKey = 'city___subpages___meta____key',
  CitySubpagesMetaType = 'city___subpages___meta____type',
  CitySubpagesMetaSitemap = 'city___subpages___meta___sitemap',
  CitySubpagesMetaRobots = 'city___subpages___meta___robots',
  CitySubpagesRawTemplate = 'city___subpages____rawTemplate',
  CitySubpagesRawCity = 'city___subpages____rawCity',
  CitySubpagesRawLayout = 'city___subpages____rawLayout',
  CitySubpagesRawMenuImage = 'city___subpages____rawMenuImage',
  CitySubpagesRawMeta = 'city___subpages____rawMeta',
  CitySubpagesId = 'city___subpages___id',
  CitySubpagesParentId = 'city___subpages___parent___id',
  CitySubpagesParentChildren = 'city___subpages___parent___children',
  CitySubpagesChildren = 'city___subpages___children',
  CitySubpagesChildrenId = 'city___subpages___children___id',
  CitySubpagesChildrenChildren = 'city___subpages___children___children',
  CitySubpagesInternalContent = 'city___subpages___internal___content',
  CitySubpagesInternalContentDigest = 'city___subpages___internal___contentDigest',
  CitySubpagesInternalDescription = 'city___subpages___internal___description',
  CitySubpagesInternalFieldOwners = 'city___subpages___internal___fieldOwners',
  CitySubpagesInternalIgnoreType = 'city___subpages___internal___ignoreType',
  CitySubpagesInternalMediaType = 'city___subpages___internal___mediaType',
  CitySubpagesInternalOwner = 'city___subpages___internal___owner',
  CitySubpagesInternalType = 'city___subpages___internal___type',
  CityMetaKey = 'city___meta____key',
  CityMetaType = 'city___meta____type',
  CityMetaSeoTitleKey = 'city___meta___seoTitle____key',
  CityMetaSeoTitleType = 'city___meta___seoTitle____type',
  CityMetaSeoTitleEn = 'city___meta___seoTitle___en',
  CityMetaSeoTitleNl = 'city___meta___seoTitle___nl',
  CityMetaSeoDescriptionKey = 'city___meta___seoDescription____key',
  CityMetaSeoDescriptionType = 'city___meta___seoDescription____type',
  CityMetaSeoDescriptionEn = 'city___meta___seoDescription___en',
  CityMetaSeoDescriptionNl = 'city___meta___seoDescription___nl',
  CityMetaSeoImageKey = 'city___meta___seoImage____key',
  CityMetaSeoImageType = 'city___meta___seoImage____type',
  CityMetaSitemap = 'city___meta___sitemap',
  CityMetaRobots = 'city___meta___robots',
  CityRawName = 'city____rawName',
  CityRawSlug = 'city____rawSlug',
  CityRawImage = 'city____rawImage',
  CityRawSubpages = 'city____rawSubpages',
  CityRawMeta = 'city____rawMeta',
  CityId = 'city___id',
  CityParentId = 'city___parent___id',
  CityParentParentId = 'city___parent___parent___id',
  CityParentParentChildren = 'city___parent___parent___children',
  CityParentChildren = 'city___parent___children',
  CityParentChildrenId = 'city___parent___children___id',
  CityParentChildrenChildren = 'city___parent___children___children',
  CityParentInternalContent = 'city___parent___internal___content',
  CityParentInternalContentDigest = 'city___parent___internal___contentDigest',
  CityParentInternalDescription = 'city___parent___internal___description',
  CityParentInternalFieldOwners = 'city___parent___internal___fieldOwners',
  CityParentInternalIgnoreType = 'city___parent___internal___ignoreType',
  CityParentInternalMediaType = 'city___parent___internal___mediaType',
  CityParentInternalOwner = 'city___parent___internal___owner',
  CityParentInternalType = 'city___parent___internal___type',
  CityChildren = 'city___children',
  CityChildrenId = 'city___children___id',
  CityChildrenParentId = 'city___children___parent___id',
  CityChildrenParentChildren = 'city___children___parent___children',
  CityChildrenChildren = 'city___children___children',
  CityChildrenChildrenId = 'city___children___children___id',
  CityChildrenChildrenChildren = 'city___children___children___children',
  CityChildrenInternalContent = 'city___children___internal___content',
  CityChildrenInternalContentDigest = 'city___children___internal___contentDigest',
  CityChildrenInternalDescription = 'city___children___internal___description',
  CityChildrenInternalFieldOwners = 'city___children___internal___fieldOwners',
  CityChildrenInternalIgnoreType = 'city___children___internal___ignoreType',
  CityChildrenInternalMediaType = 'city___children___internal___mediaType',
  CityChildrenInternalOwner = 'city___children___internal___owner',
  CityChildrenInternalType = 'city___children___internal___type',
  CityInternalContent = 'city___internal___content',
  CityInternalContentDigest = 'city___internal___contentDigest',
  CityInternalDescription = 'city___internal___description',
  CityInternalFieldOwners = 'city___internal___fieldOwners',
  CityInternalIgnoreType = 'city___internal___ignoreType',
  CityInternalMediaType = 'city___internal___mediaType',
  CityInternalOwner = 'city___internal___owner',
  CityInternalType = 'city___internal___type',
  ImageKey = 'image____key',
  ImageType = 'image____type',
  ImageAltKey = 'image___alt____key',
  ImageAltType = 'image___alt____type',
  ImageAltEn = 'image___alt___en',
  ImageAltNl = 'image___alt___nl',
  ImageAssetId = 'image___asset____id',
  ImageAssetType = 'image___asset____type',
  ImageAssetCreatedAt = 'image___asset____createdAt',
  ImageAssetUpdatedAt = 'image___asset____updatedAt',
  ImageAssetRev = 'image___asset____rev',
  ImageAssetKey = 'image___asset____key',
  ImageAssetOriginalFilename = 'image___asset___originalFilename',
  ImageAssetLabel = 'image___asset___label',
  ImageAssetTitle = 'image___asset___title',
  ImageAssetDescription = 'image___asset___description',
  ImageAssetSha1hash = 'image___asset___sha1hash',
  ImageAssetExtension = 'image___asset___extension',
  ImageAssetMimeType = 'image___asset___mimeType',
  ImageAssetSize = 'image___asset___size',
  ImageAssetAssetId = 'image___asset___assetId',
  ImageAssetPath = 'image___asset___path',
  ImageAssetUrl = 'image___asset___url',
  ImageAssetMetadataKey = 'image___asset___metadata____key',
  ImageAssetMetadataType = 'image___asset___metadata____type',
  ImageAssetMetadataLqip = 'image___asset___metadata___lqip',
  ImageAssetMetadataHasAlpha = 'image___asset___metadata___hasAlpha',
  ImageAssetMetadataIsOpaque = 'image___asset___metadata___isOpaque',
  ImageAssetSourceKey = 'image___asset___source____key',
  ImageAssetSourceType = 'image___asset___source____type',
  ImageAssetSourceName = 'image___asset___source___name',
  ImageAssetSourceSanityId = 'image___asset___source___sanityId',
  ImageAssetSourceUrl = 'image___asset___source___url',
  ImageAssetFixedBase64 = 'image___asset___fixed___base64',
  ImageAssetFixedAspectRatio = 'image___asset___fixed___aspectRatio',
  ImageAssetFixedWidth = 'image___asset___fixed___width',
  ImageAssetFixedHeight = 'image___asset___fixed___height',
  ImageAssetFixedSrc = 'image___asset___fixed___src',
  ImageAssetFixedSrcSet = 'image___asset___fixed___srcSet',
  ImageAssetFixedSrcWebp = 'image___asset___fixed___srcWebp',
  ImageAssetFixedSrcSetWebp = 'image___asset___fixed___srcSetWebp',
  ImageAssetFluidBase64 = 'image___asset___fluid___base64',
  ImageAssetFluidAspectRatio = 'image___asset___fluid___aspectRatio',
  ImageAssetFluidSrc = 'image___asset___fluid___src',
  ImageAssetFluidSrcSet = 'image___asset___fluid___srcSet',
  ImageAssetFluidSrcWebp = 'image___asset___fluid___srcWebp',
  ImageAssetFluidSrcSetWebp = 'image___asset___fluid___srcSetWebp',
  ImageAssetFluidSizes = 'image___asset___fluid___sizes',
  ImageAssetRawMetadata = 'image___asset____rawMetadata',
  ImageAssetRawSource = 'image___asset____rawSource',
  ImageAssetId = 'image___asset___id',
  ImageAssetParentId = 'image___asset___parent___id',
  ImageAssetParentChildren = 'image___asset___parent___children',
  ImageAssetChildren = 'image___asset___children',
  ImageAssetChildrenId = 'image___asset___children___id',
  ImageAssetChildrenChildren = 'image___asset___children___children',
  ImageAssetInternalContent = 'image___asset___internal___content',
  ImageAssetInternalContentDigest = 'image___asset___internal___contentDigest',
  ImageAssetInternalDescription = 'image___asset___internal___description',
  ImageAssetInternalFieldOwners = 'image___asset___internal___fieldOwners',
  ImageAssetInternalIgnoreType = 'image___asset___internal___ignoreType',
  ImageAssetInternalMediaType = 'image___asset___internal___mediaType',
  ImageAssetInternalOwner = 'image___asset___internal___owner',
  ImageAssetInternalType = 'image___asset___internal___type',
  ImageHotspotKey = 'image___hotspot____key',
  ImageHotspotType = 'image___hotspot____type',
  ImageHotspotX = 'image___hotspot___x',
  ImageHotspotY = 'image___hotspot___y',
  ImageHotspotHeight = 'image___hotspot___height',
  ImageHotspotWidth = 'image___hotspot___width',
  ImageCropKey = 'image___crop____key',
  ImageCropType = 'image___crop____type',
  ImageCropTop = 'image___crop___top',
  ImageCropBottom = 'image___crop___bottom',
  ImageCropLeft = 'image___crop___left',
  ImageCropRight = 'image___crop___right',
  RawCity = '_rawCity',
  RawImage = '_rawImage',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type SanityCityHostFilterInput = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  name?: Maybe<StringQueryOperatorInput>,
  city?: Maybe<SanityCityFilterInput>,
  image?: Maybe<SanityPictureFilterInput>,
  _rawCity?: Maybe<JsonQueryOperatorInput>,
  _rawImage?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
};

export type SanityCityHostGroupConnection = {
   __typename?: 'SanityCityHostGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityCityHostEdge>,
  nodes: Array<SanityCityHost>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type SanityCityHostSortInput = {
  fields?: Maybe<Array<Maybe<SanityCityHostFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type SanityCitySortInput = {
  fields?: Maybe<Array<Maybe<SanityCityFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type SanityCustomSlug = {
   __typename?: 'SanityCustomSlug',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  current?: Maybe<Scalars['String']>,
};

export type SanityDocument = {
  _id?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _createdAt?: Maybe<Scalars['Date']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  _rev?: Maybe<Scalars['String']>,
};

export type SanityFaq = {
   __typename?: 'SanityFaq',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  question?: Maybe<SanityLocaleString>,
  answer?: Maybe<SanityLocaleText>,
  city?: Maybe<SanityCity>,
};

export type SanityFaqCategory = SanityDocument & Node & {
   __typename?: 'SanityFaqCategory',
  _id?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _createdAt?: Maybe<Scalars['Date']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  _rev?: Maybe<Scalars['String']>,
  _key?: Maybe<Scalars['String']>,
  title?: Maybe<SanityLocaleString>,
  description?: Maybe<SanityLocaleText>,
  questions?: Maybe<Array<Maybe<SanityFaq>>>,
  _rawTitle?: Maybe<Scalars['JSON']>,
  _rawDescription?: Maybe<Scalars['JSON']>,
  _rawQuestions?: Maybe<Scalars['JSON']>,
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
};


export type SanityFaqCategory_CreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityFaqCategory_UpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityFaqCategory_RawTitleArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityFaqCategory_RawDescriptionArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityFaqCategory_RawQuestionsArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};

export type SanityFaqCategoryConnection = {
   __typename?: 'SanityFaqCategoryConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityFaqCategoryEdge>,
  nodes: Array<SanityFaqCategory>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<SanityFaqCategoryGroupConnection>,
};


export type SanityFaqCategoryConnectionDistinctArgs = {
  field: SanityFaqCategoryFieldsEnum
};


export type SanityFaqCategoryConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: SanityFaqCategoryFieldsEnum
};

export type SanityFaqCategoryEdge = {
   __typename?: 'SanityFaqCategoryEdge',
  next?: Maybe<SanityFaqCategory>,
  node: SanityFaqCategory,
  previous?: Maybe<SanityFaqCategory>,
};

export enum SanityFaqCategoryFieldsEnum {
  Id = '_id',
  Type = '_type',
  CreatedAt = '_createdAt',
  UpdatedAt = '_updatedAt',
  Rev = '_rev',
  Key = '_key',
  TitleKey = 'title____key',
  TitleType = 'title____type',
  TitleEn = 'title___en',
  TitleNl = 'title___nl',
  DescriptionKey = 'description____key',
  DescriptionType = 'description____type',
  DescriptionEn = 'description___en',
  DescriptionNl = 'description___nl',
  Questions = 'questions',
  QuestionsKey = 'questions____key',
  QuestionsType = 'questions____type',
  QuestionsQuestionKey = 'questions___question____key',
  QuestionsQuestionType = 'questions___question____type',
  QuestionsQuestionEn = 'questions___question___en',
  QuestionsQuestionNl = 'questions___question___nl',
  QuestionsAnswerKey = 'questions___answer____key',
  QuestionsAnswerType = 'questions___answer____type',
  QuestionsAnswerEn = 'questions___answer___en',
  QuestionsAnswerNl = 'questions___answer___nl',
  QuestionsCityId = 'questions___city____id',
  QuestionsCityType = 'questions___city____type',
  QuestionsCityCreatedAt = 'questions___city____createdAt',
  QuestionsCityUpdatedAt = 'questions___city____updatedAt',
  QuestionsCityRev = 'questions___city____rev',
  QuestionsCityKey = 'questions___city____key',
  QuestionsCityNameKey = 'questions___city___name____key',
  QuestionsCityNameType = 'questions___city___name____type',
  QuestionsCityNameEn = 'questions___city___name___en',
  QuestionsCityNameNl = 'questions___city___name___nl',
  QuestionsCitySlugKey = 'questions___city___slug____key',
  QuestionsCitySlugType = 'questions___city___slug____type',
  QuestionsCitySlugCurrent = 'questions___city___slug___current',
  QuestionsCityImageKey = 'questions___city___image____key',
  QuestionsCityImageType = 'questions___city___image____type',
  QuestionsCitySubpages = 'questions___city___subpages',
  QuestionsCitySubpagesId = 'questions___city___subpages____id',
  QuestionsCitySubpagesType = 'questions___city___subpages____type',
  QuestionsCitySubpagesCreatedAt = 'questions___city___subpages____createdAt',
  QuestionsCitySubpagesUpdatedAt = 'questions___city___subpages____updatedAt',
  QuestionsCitySubpagesRev = 'questions___city___subpages____rev',
  QuestionsCitySubpagesKey = 'questions___city___subpages____key',
  QuestionsCitySubpagesRawTemplate = 'questions___city___subpages____rawTemplate',
  QuestionsCitySubpagesRawCity = 'questions___city___subpages____rawCity',
  QuestionsCitySubpagesRawLayout = 'questions___city___subpages____rawLayout',
  QuestionsCitySubpagesRawMenuImage = 'questions___city___subpages____rawMenuImage',
  QuestionsCitySubpagesRawMeta = 'questions___city___subpages____rawMeta',
  QuestionsCitySubpagesId = 'questions___city___subpages___id',
  QuestionsCitySubpagesChildren = 'questions___city___subpages___children',
  QuestionsCityMetaKey = 'questions___city___meta____key',
  QuestionsCityMetaType = 'questions___city___meta____type',
  QuestionsCityMetaSitemap = 'questions___city___meta___sitemap',
  QuestionsCityMetaRobots = 'questions___city___meta___robots',
  QuestionsCityRawName = 'questions___city____rawName',
  QuestionsCityRawSlug = 'questions___city____rawSlug',
  QuestionsCityRawImage = 'questions___city____rawImage',
  QuestionsCityRawSubpages = 'questions___city____rawSubpages',
  QuestionsCityRawMeta = 'questions___city____rawMeta',
  QuestionsCityId = 'questions___city___id',
  QuestionsCityParentId = 'questions___city___parent___id',
  QuestionsCityParentChildren = 'questions___city___parent___children',
  QuestionsCityChildren = 'questions___city___children',
  QuestionsCityChildrenId = 'questions___city___children___id',
  QuestionsCityChildrenChildren = 'questions___city___children___children',
  QuestionsCityInternalContent = 'questions___city___internal___content',
  QuestionsCityInternalContentDigest = 'questions___city___internal___contentDigest',
  QuestionsCityInternalDescription = 'questions___city___internal___description',
  QuestionsCityInternalFieldOwners = 'questions___city___internal___fieldOwners',
  QuestionsCityInternalIgnoreType = 'questions___city___internal___ignoreType',
  QuestionsCityInternalMediaType = 'questions___city___internal___mediaType',
  QuestionsCityInternalOwner = 'questions___city___internal___owner',
  QuestionsCityInternalType = 'questions___city___internal___type',
  RawTitle = '_rawTitle',
  RawDescription = '_rawDescription',
  RawQuestions = '_rawQuestions',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type SanityFaqCategoryFilterInput = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  title?: Maybe<SanityLocaleStringFilterInput>,
  description?: Maybe<SanityLocaleTextFilterInput>,
  questions?: Maybe<SanityFaqFilterListInput>,
  _rawTitle?: Maybe<JsonQueryOperatorInput>,
  _rawDescription?: Maybe<JsonQueryOperatorInput>,
  _rawQuestions?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
};

export type SanityFaqCategoryGroupConnection = {
   __typename?: 'SanityFaqCategoryGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityFaqCategoryEdge>,
  nodes: Array<SanityFaqCategory>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type SanityFaqCategorySortInput = {
  fields?: Maybe<Array<Maybe<SanityFaqCategoryFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type SanityFaqFilterInput = {
  _key?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  question?: Maybe<SanityLocaleStringFilterInput>,
  answer?: Maybe<SanityLocaleTextFilterInput>,
  city?: Maybe<SanityCityFilterInput>,
};

export type SanityFaqFilterListInput = {
  elemMatch?: Maybe<SanityFaqFilterInput>,
};

export type SanityFile = {
   __typename?: 'SanityFile',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  asset?: Maybe<SanityFileAsset>,
};

export type SanityFileAsset = SanityDocument & Node & {
   __typename?: 'SanityFileAsset',
  _id?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _createdAt?: Maybe<Scalars['Date']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  _rev?: Maybe<Scalars['String']>,
  _key?: Maybe<Scalars['String']>,
  originalFilename?: Maybe<Scalars['String']>,
  label?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  sha1hash?: Maybe<Scalars['String']>,
  extension?: Maybe<Scalars['String']>,
  mimeType?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Float']>,
  assetId?: Maybe<Scalars['String']>,
  path?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
  source?: Maybe<SanityAssetSourceData>,
  _rawSource?: Maybe<Scalars['JSON']>,
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
};


export type SanityFileAsset_CreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityFileAsset_UpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityFileAsset_RawSourceArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};

export type SanityFileAssetConnection = {
   __typename?: 'SanityFileAssetConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityFileAssetEdge>,
  nodes: Array<SanityFileAsset>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<SanityFileAssetGroupConnection>,
};


export type SanityFileAssetConnectionDistinctArgs = {
  field: SanityFileAssetFieldsEnum
};


export type SanityFileAssetConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: SanityFileAssetFieldsEnum
};

export type SanityFileAssetEdge = {
   __typename?: 'SanityFileAssetEdge',
  next?: Maybe<SanityFileAsset>,
  node: SanityFileAsset,
  previous?: Maybe<SanityFileAsset>,
};

export enum SanityFileAssetFieldsEnum {
  Id = '_id',
  Type = '_type',
  CreatedAt = '_createdAt',
  UpdatedAt = '_updatedAt',
  Rev = '_rev',
  Key = '_key',
  OriginalFilename = 'originalFilename',
  Label = 'label',
  Title = 'title',
  Description = 'description',
  Sha1hash = 'sha1hash',
  Extension = 'extension',
  MimeType = 'mimeType',
  Size = 'size',
  AssetId = 'assetId',
  Path = 'path',
  Url = 'url',
  SourceKey = 'source____key',
  SourceType = 'source____type',
  SourceName = 'source___name',
  SourceSanityId = 'source___sanityId',
  SourceUrl = 'source___url',
  RawSource = '_rawSource',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type SanityFileAssetFilterInput = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  originalFilename?: Maybe<StringQueryOperatorInput>,
  label?: Maybe<StringQueryOperatorInput>,
  title?: Maybe<StringQueryOperatorInput>,
  description?: Maybe<StringQueryOperatorInput>,
  sha1hash?: Maybe<StringQueryOperatorInput>,
  extension?: Maybe<StringQueryOperatorInput>,
  mimeType?: Maybe<StringQueryOperatorInput>,
  size?: Maybe<FloatQueryOperatorInput>,
  assetId?: Maybe<StringQueryOperatorInput>,
  path?: Maybe<StringQueryOperatorInput>,
  url?: Maybe<StringQueryOperatorInput>,
  source?: Maybe<SanityAssetSourceDataFilterInput>,
  _rawSource?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
};

export type SanityFileAssetGroupConnection = {
   __typename?: 'SanityFileAssetGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityFileAssetEdge>,
  nodes: Array<SanityFileAsset>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type SanityFileAssetSortInput = {
  fields?: Maybe<Array<Maybe<SanityFileAssetFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type SanityGallery = SanityDocument & Node & {
   __typename?: 'SanityGallery',
  _id?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _createdAt?: Maybe<Scalars['Date']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  _rev?: Maybe<Scalars['String']>,
  _key?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  images?: Maybe<Array<Maybe<SanityGalleryImageOrSocialImage>>>,
  _rawImages?: Maybe<Scalars['JSON']>,
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
};


export type SanityGallery_CreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityGallery_UpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityGallery_RawImagesArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};

export type SanityGalleryCategory = SanityDocument & Node & {
   __typename?: 'SanityGalleryCategory',
  _id?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _createdAt?: Maybe<Scalars['Date']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  _rev?: Maybe<Scalars['String']>,
  _key?: Maybe<Scalars['String']>,
  title?: Maybe<SanityLocaleString>,
  _rawTitle?: Maybe<Scalars['JSON']>,
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
};


export type SanityGalleryCategory_CreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityGalleryCategory_UpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityGalleryCategory_RawTitleArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};

export type SanityGalleryCategoryConnection = {
   __typename?: 'SanityGalleryCategoryConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityGalleryCategoryEdge>,
  nodes: Array<SanityGalleryCategory>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<SanityGalleryCategoryGroupConnection>,
};


export type SanityGalleryCategoryConnectionDistinctArgs = {
  field: SanityGalleryCategoryFieldsEnum
};


export type SanityGalleryCategoryConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: SanityGalleryCategoryFieldsEnum
};

export type SanityGalleryCategoryEdge = {
   __typename?: 'SanityGalleryCategoryEdge',
  next?: Maybe<SanityGalleryCategory>,
  node: SanityGalleryCategory,
  previous?: Maybe<SanityGalleryCategory>,
};

export enum SanityGalleryCategoryFieldsEnum {
  Id = '_id',
  Type = '_type',
  CreatedAt = '_createdAt',
  UpdatedAt = '_updatedAt',
  Rev = '_rev',
  Key = '_key',
  TitleKey = 'title____key',
  TitleType = 'title____type',
  TitleEn = 'title___en',
  TitleNl = 'title___nl',
  RawTitle = '_rawTitle',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type SanityGalleryCategoryFilterInput = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  title?: Maybe<SanityLocaleStringFilterInput>,
  _rawTitle?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
};

export type SanityGalleryCategoryGroupConnection = {
   __typename?: 'SanityGalleryCategoryGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityGalleryCategoryEdge>,
  nodes: Array<SanityGalleryCategory>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type SanityGalleryCategorySortInput = {
  fields?: Maybe<Array<Maybe<SanityGalleryCategoryFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type SanityGalleryConnection = {
   __typename?: 'SanityGalleryConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityGalleryEdge>,
  nodes: Array<SanityGallery>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<SanityGalleryGroupConnection>,
};


export type SanityGalleryConnectionDistinctArgs = {
  field: SanityGalleryFieldsEnum
};


export type SanityGalleryConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: SanityGalleryFieldsEnum
};

export type SanityGalleryEdge = {
   __typename?: 'SanityGalleryEdge',
  next?: Maybe<SanityGallery>,
  node: SanityGallery,
  previous?: Maybe<SanityGallery>,
};

export enum SanityGalleryFieldsEnum {
  Id = '_id',
  Type = '_type',
  CreatedAt = '_createdAt',
  UpdatedAt = '_updatedAt',
  Rev = '_rev',
  Key = '_key',
  Name = 'name',
  RawImages = '_rawImages',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type SanityGalleryFilterInput = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  name?: Maybe<StringQueryOperatorInput>,
  _rawImages?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
};

export type SanityGalleryGroupConnection = {
   __typename?: 'SanityGalleryGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityGalleryEdge>,
  nodes: Array<SanityGallery>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type SanityGalleryImage = {
   __typename?: 'SanityGalleryImage',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  alt?: Maybe<SanityAlt>,
  category?: Maybe<SanityGalleryCategory>,
  caption?: Maybe<SanityLocaleText>,
  asset?: Maybe<SanityImageAsset>,
  hotspot?: Maybe<SanityImageHotspot>,
  crop?: Maybe<SanityImageCrop>,
};

export type SanityGalleryImageOrSocialImage = SanityGalleryImage | SanitySocialImage;

export type SanityGalleryOrHangoutOrHub = SanityGallery | SanityHangout | SanityHub;

export type SanityGallerySortInput = {
  fields?: Maybe<Array<Maybe<SanityGalleryFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type SanityGeneral = SanityDocument & Node & {
   __typename?: 'SanityGeneral',
  _id?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _createdAt?: Maybe<Scalars['Date']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  _rev?: Maybe<Scalars['String']>,
  _key?: Maybe<Scalars['String']>,
  title?: Maybe<SanityLocaleString>,
  lead?: Maybe<SanityLocaleText>,
  _rawTitle?: Maybe<Scalars['JSON']>,
  _rawLead?: Maybe<Scalars['JSON']>,
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
};


export type SanityGeneral_CreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityGeneral_UpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityGeneral_RawTitleArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityGeneral_RawLeadArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};

export type SanityGeneralConnection = {
   __typename?: 'SanityGeneralConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityGeneralEdge>,
  nodes: Array<SanityGeneral>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<SanityGeneralGroupConnection>,
};


export type SanityGeneralConnectionDistinctArgs = {
  field: SanityGeneralFieldsEnum
};


export type SanityGeneralConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: SanityGeneralFieldsEnum
};

export type SanityGeneralEdge = {
   __typename?: 'SanityGeneralEdge',
  next?: Maybe<SanityGeneral>,
  node: SanityGeneral,
  previous?: Maybe<SanityGeneral>,
};

export enum SanityGeneralFieldsEnum {
  Id = '_id',
  Type = '_type',
  CreatedAt = '_createdAt',
  UpdatedAt = '_updatedAt',
  Rev = '_rev',
  Key = '_key',
  TitleKey = 'title____key',
  TitleType = 'title____type',
  TitleEn = 'title___en',
  TitleNl = 'title___nl',
  LeadKey = 'lead____key',
  LeadType = 'lead____type',
  LeadEn = 'lead___en',
  LeadNl = 'lead___nl',
  RawTitle = '_rawTitle',
  RawLead = '_rawLead',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type SanityGeneralFilterInput = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  title?: Maybe<SanityLocaleStringFilterInput>,
  lead?: Maybe<SanityLocaleTextFilterInput>,
  _rawTitle?: Maybe<JsonQueryOperatorInput>,
  _rawLead?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
};

export type SanityGeneralGroupConnection = {
   __typename?: 'SanityGeneralGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityGeneralEdge>,
  nodes: Array<SanityGeneral>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type SanityGeneralSortInput = {
  fields?: Maybe<Array<Maybe<SanityGeneralFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type SanityGeopoint = {
   __typename?: 'SanityGeopoint',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  lat?: Maybe<Scalars['Float']>,
  lng?: Maybe<Scalars['Float']>,
  alt?: Maybe<Scalars['Float']>,
};

export type SanityGeopointFilterInput = {
  _key?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  lat?: Maybe<FloatQueryOperatorInput>,
  lng?: Maybe<FloatQueryOperatorInput>,
  alt?: Maybe<FloatQueryOperatorInput>,
};

export type SanityHangout = SanityDocument & Node & {
   __typename?: 'SanityHangout',
  _id?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _createdAt?: Maybe<Scalars['Date']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  _rev?: Maybe<Scalars['String']>,
  _key?: Maybe<Scalars['String']>,
  city?: Maybe<SanityCity>,
  title?: Maybe<SanityLocaleString>,
  lead?: Maybe<SanityLocaleText>,
  _rawCity?: Maybe<Scalars['JSON']>,
  _rawTitle?: Maybe<Scalars['JSON']>,
  _rawLead?: Maybe<Scalars['JSON']>,
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
};


export type SanityHangout_CreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityHangout_UpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityHangout_RawCityArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityHangout_RawTitleArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityHangout_RawLeadArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};

export type SanityHangoutConnection = {
   __typename?: 'SanityHangoutConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityHangoutEdge>,
  nodes: Array<SanityHangout>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<SanityHangoutGroupConnection>,
};


export type SanityHangoutConnectionDistinctArgs = {
  field: SanityHangoutFieldsEnum
};


export type SanityHangoutConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: SanityHangoutFieldsEnum
};

export type SanityHangoutEdge = {
   __typename?: 'SanityHangoutEdge',
  next?: Maybe<SanityHangout>,
  node: SanityHangout,
  previous?: Maybe<SanityHangout>,
};

export enum SanityHangoutFieldsEnum {
  Id = '_id',
  Type = '_type',
  CreatedAt = '_createdAt',
  UpdatedAt = '_updatedAt',
  Rev = '_rev',
  Key = '_key',
  CityId = 'city____id',
  CityType = 'city____type',
  CityCreatedAt = 'city____createdAt',
  CityUpdatedAt = 'city____updatedAt',
  CityRev = 'city____rev',
  CityKey = 'city____key',
  CityNameKey = 'city___name____key',
  CityNameType = 'city___name____type',
  CityNameEn = 'city___name___en',
  CityNameNl = 'city___name___nl',
  CitySlugKey = 'city___slug____key',
  CitySlugType = 'city___slug____type',
  CitySlugCurrent = 'city___slug___current',
  CityImageKey = 'city___image____key',
  CityImageType = 'city___image____type',
  CityImageAltKey = 'city___image___alt____key',
  CityImageAltType = 'city___image___alt____type',
  CityImageAltEn = 'city___image___alt___en',
  CityImageAltNl = 'city___image___alt___nl',
  CityImageAssetId = 'city___image___asset____id',
  CityImageAssetType = 'city___image___asset____type',
  CityImageAssetCreatedAt = 'city___image___asset____createdAt',
  CityImageAssetUpdatedAt = 'city___image___asset____updatedAt',
  CityImageAssetRev = 'city___image___asset____rev',
  CityImageAssetKey = 'city___image___asset____key',
  CityImageAssetOriginalFilename = 'city___image___asset___originalFilename',
  CityImageAssetLabel = 'city___image___asset___label',
  CityImageAssetTitle = 'city___image___asset___title',
  CityImageAssetDescription = 'city___image___asset___description',
  CityImageAssetSha1hash = 'city___image___asset___sha1hash',
  CityImageAssetExtension = 'city___image___asset___extension',
  CityImageAssetMimeType = 'city___image___asset___mimeType',
  CityImageAssetSize = 'city___image___asset___size',
  CityImageAssetAssetId = 'city___image___asset___assetId',
  CityImageAssetPath = 'city___image___asset___path',
  CityImageAssetUrl = 'city___image___asset___url',
  CityImageAssetRawMetadata = 'city___image___asset____rawMetadata',
  CityImageAssetRawSource = 'city___image___asset____rawSource',
  CityImageAssetId = 'city___image___asset___id',
  CityImageAssetChildren = 'city___image___asset___children',
  CityImageHotspotKey = 'city___image___hotspot____key',
  CityImageHotspotType = 'city___image___hotspot____type',
  CityImageHotspotX = 'city___image___hotspot___x',
  CityImageHotspotY = 'city___image___hotspot___y',
  CityImageHotspotHeight = 'city___image___hotspot___height',
  CityImageHotspotWidth = 'city___image___hotspot___width',
  CityImageCropKey = 'city___image___crop____key',
  CityImageCropType = 'city___image___crop____type',
  CityImageCropTop = 'city___image___crop___top',
  CityImageCropBottom = 'city___image___crop___bottom',
  CityImageCropLeft = 'city___image___crop___left',
  CityImageCropRight = 'city___image___crop___right',
  CitySubpages = 'city___subpages',
  CitySubpagesId = 'city___subpages____id',
  CitySubpagesType = 'city___subpages____type',
  CitySubpagesCreatedAt = 'city___subpages____createdAt',
  CitySubpagesUpdatedAt = 'city___subpages____updatedAt',
  CitySubpagesRev = 'city___subpages____rev',
  CitySubpagesKey = 'city___subpages____key',
  CitySubpagesTemplateId = 'city___subpages___template____id',
  CitySubpagesTemplateType = 'city___subpages___template____type',
  CitySubpagesTemplateCreatedAt = 'city___subpages___template____createdAt',
  CitySubpagesTemplateUpdatedAt = 'city___subpages___template____updatedAt',
  CitySubpagesTemplateRev = 'city___subpages___template____rev',
  CitySubpagesTemplateKey = 'city___subpages___template____key',
  CitySubpagesTemplateRawTitle = 'city___subpages___template____rawTitle',
  CitySubpagesTemplateRawSlug = 'city___subpages___template____rawSlug',
  CitySubpagesTemplateId = 'city___subpages___template___id',
  CitySubpagesTemplateChildren = 'city___subpages___template___children',
  CitySubpagesCityId = 'city___subpages___city____id',
  CitySubpagesCityType = 'city___subpages___city____type',
  CitySubpagesCityCreatedAt = 'city___subpages___city____createdAt',
  CitySubpagesCityUpdatedAt = 'city___subpages___city____updatedAt',
  CitySubpagesCityRev = 'city___subpages___city____rev',
  CitySubpagesCityKey = 'city___subpages___city____key',
  CitySubpagesCitySubpages = 'city___subpages___city___subpages',
  CitySubpagesCityRawName = 'city___subpages___city____rawName',
  CitySubpagesCityRawSlug = 'city___subpages___city____rawSlug',
  CitySubpagesCityRawImage = 'city___subpages___city____rawImage',
  CitySubpagesCityRawSubpages = 'city___subpages___city____rawSubpages',
  CitySubpagesCityRawMeta = 'city___subpages___city____rawMeta',
  CitySubpagesCityId = 'city___subpages___city___id',
  CitySubpagesCityChildren = 'city___subpages___city___children',
  CitySubpagesMenuImageKey = 'city___subpages___menuImage____key',
  CitySubpagesMenuImageType = 'city___subpages___menuImage____type',
  CitySubpagesMetaKey = 'city___subpages___meta____key',
  CitySubpagesMetaType = 'city___subpages___meta____type',
  CitySubpagesMetaSitemap = 'city___subpages___meta___sitemap',
  CitySubpagesMetaRobots = 'city___subpages___meta___robots',
  CitySubpagesRawTemplate = 'city___subpages____rawTemplate',
  CitySubpagesRawCity = 'city___subpages____rawCity',
  CitySubpagesRawLayout = 'city___subpages____rawLayout',
  CitySubpagesRawMenuImage = 'city___subpages____rawMenuImage',
  CitySubpagesRawMeta = 'city___subpages____rawMeta',
  CitySubpagesId = 'city___subpages___id',
  CitySubpagesParentId = 'city___subpages___parent___id',
  CitySubpagesParentChildren = 'city___subpages___parent___children',
  CitySubpagesChildren = 'city___subpages___children',
  CitySubpagesChildrenId = 'city___subpages___children___id',
  CitySubpagesChildrenChildren = 'city___subpages___children___children',
  CitySubpagesInternalContent = 'city___subpages___internal___content',
  CitySubpagesInternalContentDigest = 'city___subpages___internal___contentDigest',
  CitySubpagesInternalDescription = 'city___subpages___internal___description',
  CitySubpagesInternalFieldOwners = 'city___subpages___internal___fieldOwners',
  CitySubpagesInternalIgnoreType = 'city___subpages___internal___ignoreType',
  CitySubpagesInternalMediaType = 'city___subpages___internal___mediaType',
  CitySubpagesInternalOwner = 'city___subpages___internal___owner',
  CitySubpagesInternalType = 'city___subpages___internal___type',
  CityMetaKey = 'city___meta____key',
  CityMetaType = 'city___meta____type',
  CityMetaSeoTitleKey = 'city___meta___seoTitle____key',
  CityMetaSeoTitleType = 'city___meta___seoTitle____type',
  CityMetaSeoTitleEn = 'city___meta___seoTitle___en',
  CityMetaSeoTitleNl = 'city___meta___seoTitle___nl',
  CityMetaSeoDescriptionKey = 'city___meta___seoDescription____key',
  CityMetaSeoDescriptionType = 'city___meta___seoDescription____type',
  CityMetaSeoDescriptionEn = 'city___meta___seoDescription___en',
  CityMetaSeoDescriptionNl = 'city___meta___seoDescription___nl',
  CityMetaSeoImageKey = 'city___meta___seoImage____key',
  CityMetaSeoImageType = 'city___meta___seoImage____type',
  CityMetaSitemap = 'city___meta___sitemap',
  CityMetaRobots = 'city___meta___robots',
  CityRawName = 'city____rawName',
  CityRawSlug = 'city____rawSlug',
  CityRawImage = 'city____rawImage',
  CityRawSubpages = 'city____rawSubpages',
  CityRawMeta = 'city____rawMeta',
  CityId = 'city___id',
  CityParentId = 'city___parent___id',
  CityParentParentId = 'city___parent___parent___id',
  CityParentParentChildren = 'city___parent___parent___children',
  CityParentChildren = 'city___parent___children',
  CityParentChildrenId = 'city___parent___children___id',
  CityParentChildrenChildren = 'city___parent___children___children',
  CityParentInternalContent = 'city___parent___internal___content',
  CityParentInternalContentDigest = 'city___parent___internal___contentDigest',
  CityParentInternalDescription = 'city___parent___internal___description',
  CityParentInternalFieldOwners = 'city___parent___internal___fieldOwners',
  CityParentInternalIgnoreType = 'city___parent___internal___ignoreType',
  CityParentInternalMediaType = 'city___parent___internal___mediaType',
  CityParentInternalOwner = 'city___parent___internal___owner',
  CityParentInternalType = 'city___parent___internal___type',
  CityChildren = 'city___children',
  CityChildrenId = 'city___children___id',
  CityChildrenParentId = 'city___children___parent___id',
  CityChildrenParentChildren = 'city___children___parent___children',
  CityChildrenChildren = 'city___children___children',
  CityChildrenChildrenId = 'city___children___children___id',
  CityChildrenChildrenChildren = 'city___children___children___children',
  CityChildrenInternalContent = 'city___children___internal___content',
  CityChildrenInternalContentDigest = 'city___children___internal___contentDigest',
  CityChildrenInternalDescription = 'city___children___internal___description',
  CityChildrenInternalFieldOwners = 'city___children___internal___fieldOwners',
  CityChildrenInternalIgnoreType = 'city___children___internal___ignoreType',
  CityChildrenInternalMediaType = 'city___children___internal___mediaType',
  CityChildrenInternalOwner = 'city___children___internal___owner',
  CityChildrenInternalType = 'city___children___internal___type',
  CityInternalContent = 'city___internal___content',
  CityInternalContentDigest = 'city___internal___contentDigest',
  CityInternalDescription = 'city___internal___description',
  CityInternalFieldOwners = 'city___internal___fieldOwners',
  CityInternalIgnoreType = 'city___internal___ignoreType',
  CityInternalMediaType = 'city___internal___mediaType',
  CityInternalOwner = 'city___internal___owner',
  CityInternalType = 'city___internal___type',
  TitleKey = 'title____key',
  TitleType = 'title____type',
  TitleEn = 'title___en',
  TitleNl = 'title___nl',
  LeadKey = 'lead____key',
  LeadType = 'lead____type',
  LeadEn = 'lead___en',
  LeadNl = 'lead___nl',
  RawCity = '_rawCity',
  RawTitle = '_rawTitle',
  RawLead = '_rawLead',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type SanityHangoutFilterInput = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  city?: Maybe<SanityCityFilterInput>,
  title?: Maybe<SanityLocaleStringFilterInput>,
  lead?: Maybe<SanityLocaleTextFilterInput>,
  _rawCity?: Maybe<JsonQueryOperatorInput>,
  _rawTitle?: Maybe<JsonQueryOperatorInput>,
  _rawLead?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
};

export type SanityHangoutGroupConnection = {
   __typename?: 'SanityHangoutGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityHangoutEdge>,
  nodes: Array<SanityHangout>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type SanityHangoutSortInput = {
  fields?: Maybe<Array<Maybe<SanityHangoutFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type SanityHub = SanityDocument & Node & {
   __typename?: 'SanityHub',
  _id?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _createdAt?: Maybe<Scalars['Date']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  _rev?: Maybe<Scalars['String']>,
  _key?: Maybe<Scalars['String']>,
  city?: Maybe<SanityCity>,
  title?: Maybe<SanityLocaleString>,
  lead?: Maybe<SanityLocaleText>,
  _rawCity?: Maybe<Scalars['JSON']>,
  _rawTitle?: Maybe<Scalars['JSON']>,
  _rawLead?: Maybe<Scalars['JSON']>,
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
};


export type SanityHub_CreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityHub_UpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityHub_RawCityArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityHub_RawTitleArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityHub_RawLeadArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};

export type SanityHubConnection = {
   __typename?: 'SanityHubConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityHubEdge>,
  nodes: Array<SanityHub>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<SanityHubGroupConnection>,
};


export type SanityHubConnectionDistinctArgs = {
  field: SanityHubFieldsEnum
};


export type SanityHubConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: SanityHubFieldsEnum
};

export type SanityHubEdge = {
   __typename?: 'SanityHubEdge',
  next?: Maybe<SanityHub>,
  node: SanityHub,
  previous?: Maybe<SanityHub>,
};

export enum SanityHubFieldsEnum {
  Id = '_id',
  Type = '_type',
  CreatedAt = '_createdAt',
  UpdatedAt = '_updatedAt',
  Rev = '_rev',
  Key = '_key',
  CityId = 'city____id',
  CityType = 'city____type',
  CityCreatedAt = 'city____createdAt',
  CityUpdatedAt = 'city____updatedAt',
  CityRev = 'city____rev',
  CityKey = 'city____key',
  CityNameKey = 'city___name____key',
  CityNameType = 'city___name____type',
  CityNameEn = 'city___name___en',
  CityNameNl = 'city___name___nl',
  CitySlugKey = 'city___slug____key',
  CitySlugType = 'city___slug____type',
  CitySlugCurrent = 'city___slug___current',
  CityImageKey = 'city___image____key',
  CityImageType = 'city___image____type',
  CityImageAltKey = 'city___image___alt____key',
  CityImageAltType = 'city___image___alt____type',
  CityImageAltEn = 'city___image___alt___en',
  CityImageAltNl = 'city___image___alt___nl',
  CityImageAssetId = 'city___image___asset____id',
  CityImageAssetType = 'city___image___asset____type',
  CityImageAssetCreatedAt = 'city___image___asset____createdAt',
  CityImageAssetUpdatedAt = 'city___image___asset____updatedAt',
  CityImageAssetRev = 'city___image___asset____rev',
  CityImageAssetKey = 'city___image___asset____key',
  CityImageAssetOriginalFilename = 'city___image___asset___originalFilename',
  CityImageAssetLabel = 'city___image___asset___label',
  CityImageAssetTitle = 'city___image___asset___title',
  CityImageAssetDescription = 'city___image___asset___description',
  CityImageAssetSha1hash = 'city___image___asset___sha1hash',
  CityImageAssetExtension = 'city___image___asset___extension',
  CityImageAssetMimeType = 'city___image___asset___mimeType',
  CityImageAssetSize = 'city___image___asset___size',
  CityImageAssetAssetId = 'city___image___asset___assetId',
  CityImageAssetPath = 'city___image___asset___path',
  CityImageAssetUrl = 'city___image___asset___url',
  CityImageAssetRawMetadata = 'city___image___asset____rawMetadata',
  CityImageAssetRawSource = 'city___image___asset____rawSource',
  CityImageAssetId = 'city___image___asset___id',
  CityImageAssetChildren = 'city___image___asset___children',
  CityImageHotspotKey = 'city___image___hotspot____key',
  CityImageHotspotType = 'city___image___hotspot____type',
  CityImageHotspotX = 'city___image___hotspot___x',
  CityImageHotspotY = 'city___image___hotspot___y',
  CityImageHotspotHeight = 'city___image___hotspot___height',
  CityImageHotspotWidth = 'city___image___hotspot___width',
  CityImageCropKey = 'city___image___crop____key',
  CityImageCropType = 'city___image___crop____type',
  CityImageCropTop = 'city___image___crop___top',
  CityImageCropBottom = 'city___image___crop___bottom',
  CityImageCropLeft = 'city___image___crop___left',
  CityImageCropRight = 'city___image___crop___right',
  CitySubpages = 'city___subpages',
  CitySubpagesId = 'city___subpages____id',
  CitySubpagesType = 'city___subpages____type',
  CitySubpagesCreatedAt = 'city___subpages____createdAt',
  CitySubpagesUpdatedAt = 'city___subpages____updatedAt',
  CitySubpagesRev = 'city___subpages____rev',
  CitySubpagesKey = 'city___subpages____key',
  CitySubpagesTemplateId = 'city___subpages___template____id',
  CitySubpagesTemplateType = 'city___subpages___template____type',
  CitySubpagesTemplateCreatedAt = 'city___subpages___template____createdAt',
  CitySubpagesTemplateUpdatedAt = 'city___subpages___template____updatedAt',
  CitySubpagesTemplateRev = 'city___subpages___template____rev',
  CitySubpagesTemplateKey = 'city___subpages___template____key',
  CitySubpagesTemplateRawTitle = 'city___subpages___template____rawTitle',
  CitySubpagesTemplateRawSlug = 'city___subpages___template____rawSlug',
  CitySubpagesTemplateId = 'city___subpages___template___id',
  CitySubpagesTemplateChildren = 'city___subpages___template___children',
  CitySubpagesCityId = 'city___subpages___city____id',
  CitySubpagesCityType = 'city___subpages___city____type',
  CitySubpagesCityCreatedAt = 'city___subpages___city____createdAt',
  CitySubpagesCityUpdatedAt = 'city___subpages___city____updatedAt',
  CitySubpagesCityRev = 'city___subpages___city____rev',
  CitySubpagesCityKey = 'city___subpages___city____key',
  CitySubpagesCitySubpages = 'city___subpages___city___subpages',
  CitySubpagesCityRawName = 'city___subpages___city____rawName',
  CitySubpagesCityRawSlug = 'city___subpages___city____rawSlug',
  CitySubpagesCityRawImage = 'city___subpages___city____rawImage',
  CitySubpagesCityRawSubpages = 'city___subpages___city____rawSubpages',
  CitySubpagesCityRawMeta = 'city___subpages___city____rawMeta',
  CitySubpagesCityId = 'city___subpages___city___id',
  CitySubpagesCityChildren = 'city___subpages___city___children',
  CitySubpagesMenuImageKey = 'city___subpages___menuImage____key',
  CitySubpagesMenuImageType = 'city___subpages___menuImage____type',
  CitySubpagesMetaKey = 'city___subpages___meta____key',
  CitySubpagesMetaType = 'city___subpages___meta____type',
  CitySubpagesMetaSitemap = 'city___subpages___meta___sitemap',
  CitySubpagesMetaRobots = 'city___subpages___meta___robots',
  CitySubpagesRawTemplate = 'city___subpages____rawTemplate',
  CitySubpagesRawCity = 'city___subpages____rawCity',
  CitySubpagesRawLayout = 'city___subpages____rawLayout',
  CitySubpagesRawMenuImage = 'city___subpages____rawMenuImage',
  CitySubpagesRawMeta = 'city___subpages____rawMeta',
  CitySubpagesId = 'city___subpages___id',
  CitySubpagesParentId = 'city___subpages___parent___id',
  CitySubpagesParentChildren = 'city___subpages___parent___children',
  CitySubpagesChildren = 'city___subpages___children',
  CitySubpagesChildrenId = 'city___subpages___children___id',
  CitySubpagesChildrenChildren = 'city___subpages___children___children',
  CitySubpagesInternalContent = 'city___subpages___internal___content',
  CitySubpagesInternalContentDigest = 'city___subpages___internal___contentDigest',
  CitySubpagesInternalDescription = 'city___subpages___internal___description',
  CitySubpagesInternalFieldOwners = 'city___subpages___internal___fieldOwners',
  CitySubpagesInternalIgnoreType = 'city___subpages___internal___ignoreType',
  CitySubpagesInternalMediaType = 'city___subpages___internal___mediaType',
  CitySubpagesInternalOwner = 'city___subpages___internal___owner',
  CitySubpagesInternalType = 'city___subpages___internal___type',
  CityMetaKey = 'city___meta____key',
  CityMetaType = 'city___meta____type',
  CityMetaSeoTitleKey = 'city___meta___seoTitle____key',
  CityMetaSeoTitleType = 'city___meta___seoTitle____type',
  CityMetaSeoTitleEn = 'city___meta___seoTitle___en',
  CityMetaSeoTitleNl = 'city___meta___seoTitle___nl',
  CityMetaSeoDescriptionKey = 'city___meta___seoDescription____key',
  CityMetaSeoDescriptionType = 'city___meta___seoDescription____type',
  CityMetaSeoDescriptionEn = 'city___meta___seoDescription___en',
  CityMetaSeoDescriptionNl = 'city___meta___seoDescription___nl',
  CityMetaSeoImageKey = 'city___meta___seoImage____key',
  CityMetaSeoImageType = 'city___meta___seoImage____type',
  CityMetaSitemap = 'city___meta___sitemap',
  CityMetaRobots = 'city___meta___robots',
  CityRawName = 'city____rawName',
  CityRawSlug = 'city____rawSlug',
  CityRawImage = 'city____rawImage',
  CityRawSubpages = 'city____rawSubpages',
  CityRawMeta = 'city____rawMeta',
  CityId = 'city___id',
  CityParentId = 'city___parent___id',
  CityParentParentId = 'city___parent___parent___id',
  CityParentParentChildren = 'city___parent___parent___children',
  CityParentChildren = 'city___parent___children',
  CityParentChildrenId = 'city___parent___children___id',
  CityParentChildrenChildren = 'city___parent___children___children',
  CityParentInternalContent = 'city___parent___internal___content',
  CityParentInternalContentDigest = 'city___parent___internal___contentDigest',
  CityParentInternalDescription = 'city___parent___internal___description',
  CityParentInternalFieldOwners = 'city___parent___internal___fieldOwners',
  CityParentInternalIgnoreType = 'city___parent___internal___ignoreType',
  CityParentInternalMediaType = 'city___parent___internal___mediaType',
  CityParentInternalOwner = 'city___parent___internal___owner',
  CityParentInternalType = 'city___parent___internal___type',
  CityChildren = 'city___children',
  CityChildrenId = 'city___children___id',
  CityChildrenParentId = 'city___children___parent___id',
  CityChildrenParentChildren = 'city___children___parent___children',
  CityChildrenChildren = 'city___children___children',
  CityChildrenChildrenId = 'city___children___children___id',
  CityChildrenChildrenChildren = 'city___children___children___children',
  CityChildrenInternalContent = 'city___children___internal___content',
  CityChildrenInternalContentDigest = 'city___children___internal___contentDigest',
  CityChildrenInternalDescription = 'city___children___internal___description',
  CityChildrenInternalFieldOwners = 'city___children___internal___fieldOwners',
  CityChildrenInternalIgnoreType = 'city___children___internal___ignoreType',
  CityChildrenInternalMediaType = 'city___children___internal___mediaType',
  CityChildrenInternalOwner = 'city___children___internal___owner',
  CityChildrenInternalType = 'city___children___internal___type',
  CityInternalContent = 'city___internal___content',
  CityInternalContentDigest = 'city___internal___contentDigest',
  CityInternalDescription = 'city___internal___description',
  CityInternalFieldOwners = 'city___internal___fieldOwners',
  CityInternalIgnoreType = 'city___internal___ignoreType',
  CityInternalMediaType = 'city___internal___mediaType',
  CityInternalOwner = 'city___internal___owner',
  CityInternalType = 'city___internal___type',
  TitleKey = 'title____key',
  TitleType = 'title____type',
  TitleEn = 'title___en',
  TitleNl = 'title___nl',
  LeadKey = 'lead____key',
  LeadType = 'lead____type',
  LeadEn = 'lead___en',
  LeadNl = 'lead___nl',
  RawCity = '_rawCity',
  RawTitle = '_rawTitle',
  RawLead = '_rawLead',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type SanityHubFilterInput = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  city?: Maybe<SanityCityFilterInput>,
  title?: Maybe<SanityLocaleStringFilterInput>,
  lead?: Maybe<SanityLocaleTextFilterInput>,
  _rawCity?: Maybe<JsonQueryOperatorInput>,
  _rawTitle?: Maybe<JsonQueryOperatorInput>,
  _rawLead?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
};

export type SanityHubGroupConnection = {
   __typename?: 'SanityHubGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityHubEdge>,
  nodes: Array<SanityHub>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type SanityHubSortInput = {
  fields?: Maybe<Array<Maybe<SanityHubFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type SanityImage = {
   __typename?: 'SanityImage',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  asset?: Maybe<SanityImageAsset>,
  hotspot?: Maybe<SanityImageHotspot>,
  crop?: Maybe<SanityImageCrop>,
};

export type SanityImageAsset = SanityDocument & Node & {
   __typename?: 'SanityImageAsset',
  _id?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _createdAt?: Maybe<Scalars['Date']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  _rev?: Maybe<Scalars['String']>,
  _key?: Maybe<Scalars['String']>,
  originalFilename?: Maybe<Scalars['String']>,
  label?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  sha1hash?: Maybe<Scalars['String']>,
  extension?: Maybe<Scalars['String']>,
  mimeType?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Float']>,
  assetId?: Maybe<Scalars['String']>,
  path?: Maybe<Scalars['String']>,
  url?: Maybe<Scalars['String']>,
  metadata?: Maybe<SanityImageMetadata>,
  source?: Maybe<SanityAssetSourceData>,
  fixed?: Maybe<SanityImageFixed>,
  fluid?: Maybe<SanityImageFluid>,
  _rawMetadata?: Maybe<Scalars['JSON']>,
  _rawSource?: Maybe<Scalars['JSON']>,
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
};


export type SanityImageAsset_CreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityImageAsset_UpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityImageAssetFixedArgs = {
  width?: Maybe<Scalars['Int']>,
  height?: Maybe<Scalars['Int']>,
  toFormat?: Maybe<SanityImageFormat>
};


export type SanityImageAssetFluidArgs = {
  maxWidth?: Maybe<Scalars['Int']>,
  maxHeight?: Maybe<Scalars['Int']>,
  sizes?: Maybe<Scalars['String']>,
  toFormat?: Maybe<SanityImageFormat>
};


export type SanityImageAsset_RawMetadataArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityImageAsset_RawSourceArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};

export type SanityImageAssetConnection = {
   __typename?: 'SanityImageAssetConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityImageAssetEdge>,
  nodes: Array<SanityImageAsset>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<SanityImageAssetGroupConnection>,
};


export type SanityImageAssetConnectionDistinctArgs = {
  field: SanityImageAssetFieldsEnum
};


export type SanityImageAssetConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: SanityImageAssetFieldsEnum
};

export type SanityImageAssetEdge = {
   __typename?: 'SanityImageAssetEdge',
  next?: Maybe<SanityImageAsset>,
  node: SanityImageAsset,
  previous?: Maybe<SanityImageAsset>,
};

export enum SanityImageAssetFieldsEnum {
  Id = '_id',
  Type = '_type',
  CreatedAt = '_createdAt',
  UpdatedAt = '_updatedAt',
  Rev = '_rev',
  Key = '_key',
  OriginalFilename = 'originalFilename',
  Label = 'label',
  Title = 'title',
  Description = 'description',
  Sha1hash = 'sha1hash',
  Extension = 'extension',
  MimeType = 'mimeType',
  Size = 'size',
  AssetId = 'assetId',
  Path = 'path',
  Url = 'url',
  MetadataKey = 'metadata____key',
  MetadataType = 'metadata____type',
  MetadataLocationKey = 'metadata___location____key',
  MetadataLocationType = 'metadata___location____type',
  MetadataLocationLat = 'metadata___location___lat',
  MetadataLocationLng = 'metadata___location___lng',
  MetadataLocationAlt = 'metadata___location___alt',
  MetadataDimensionsKey = 'metadata___dimensions____key',
  MetadataDimensionsType = 'metadata___dimensions____type',
  MetadataDimensionsHeight = 'metadata___dimensions___height',
  MetadataDimensionsWidth = 'metadata___dimensions___width',
  MetadataDimensionsAspectRatio = 'metadata___dimensions___aspectRatio',
  MetadataPaletteKey = 'metadata___palette____key',
  MetadataPaletteType = 'metadata___palette____type',
  MetadataPaletteDarkMutedKey = 'metadata___palette___darkMuted____key',
  MetadataPaletteDarkMutedType = 'metadata___palette___darkMuted____type',
  MetadataPaletteDarkMutedBackground = 'metadata___palette___darkMuted___background',
  MetadataPaletteDarkMutedForeground = 'metadata___palette___darkMuted___foreground',
  MetadataPaletteDarkMutedPopulation = 'metadata___palette___darkMuted___population',
  MetadataPaletteDarkMutedTitle = 'metadata___palette___darkMuted___title',
  MetadataPaletteLightVibrantKey = 'metadata___palette___lightVibrant____key',
  MetadataPaletteLightVibrantType = 'metadata___palette___lightVibrant____type',
  MetadataPaletteLightVibrantBackground = 'metadata___palette___lightVibrant___background',
  MetadataPaletteLightVibrantForeground = 'metadata___palette___lightVibrant___foreground',
  MetadataPaletteLightVibrantPopulation = 'metadata___palette___lightVibrant___population',
  MetadataPaletteLightVibrantTitle = 'metadata___palette___lightVibrant___title',
  MetadataPaletteDarkVibrantKey = 'metadata___palette___darkVibrant____key',
  MetadataPaletteDarkVibrantType = 'metadata___palette___darkVibrant____type',
  MetadataPaletteDarkVibrantBackground = 'metadata___palette___darkVibrant___background',
  MetadataPaletteDarkVibrantForeground = 'metadata___palette___darkVibrant___foreground',
  MetadataPaletteDarkVibrantPopulation = 'metadata___palette___darkVibrant___population',
  MetadataPaletteDarkVibrantTitle = 'metadata___palette___darkVibrant___title',
  MetadataPaletteVibrantKey = 'metadata___palette___vibrant____key',
  MetadataPaletteVibrantType = 'metadata___palette___vibrant____type',
  MetadataPaletteVibrantBackground = 'metadata___palette___vibrant___background',
  MetadataPaletteVibrantForeground = 'metadata___palette___vibrant___foreground',
  MetadataPaletteVibrantPopulation = 'metadata___palette___vibrant___population',
  MetadataPaletteVibrantTitle = 'metadata___palette___vibrant___title',
  MetadataPaletteDominantKey = 'metadata___palette___dominant____key',
  MetadataPaletteDominantType = 'metadata___palette___dominant____type',
  MetadataPaletteDominantBackground = 'metadata___palette___dominant___background',
  MetadataPaletteDominantForeground = 'metadata___palette___dominant___foreground',
  MetadataPaletteDominantPopulation = 'metadata___palette___dominant___population',
  MetadataPaletteDominantTitle = 'metadata___palette___dominant___title',
  MetadataPaletteLightMutedKey = 'metadata___palette___lightMuted____key',
  MetadataPaletteLightMutedType = 'metadata___palette___lightMuted____type',
  MetadataPaletteLightMutedBackground = 'metadata___palette___lightMuted___background',
  MetadataPaletteLightMutedForeground = 'metadata___palette___lightMuted___foreground',
  MetadataPaletteLightMutedPopulation = 'metadata___palette___lightMuted___population',
  MetadataPaletteLightMutedTitle = 'metadata___palette___lightMuted___title',
  MetadataPaletteMutedKey = 'metadata___palette___muted____key',
  MetadataPaletteMutedType = 'metadata___palette___muted____type',
  MetadataPaletteMutedBackground = 'metadata___palette___muted___background',
  MetadataPaletteMutedForeground = 'metadata___palette___muted___foreground',
  MetadataPaletteMutedPopulation = 'metadata___palette___muted___population',
  MetadataPaletteMutedTitle = 'metadata___palette___muted___title',
  MetadataLqip = 'metadata___lqip',
  MetadataHasAlpha = 'metadata___hasAlpha',
  MetadataIsOpaque = 'metadata___isOpaque',
  SourceKey = 'source____key',
  SourceType = 'source____type',
  SourceName = 'source___name',
  SourceSanityId = 'source___sanityId',
  SourceUrl = 'source___url',
  FixedBase64 = 'fixed___base64',
  FixedAspectRatio = 'fixed___aspectRatio',
  FixedWidth = 'fixed___width',
  FixedHeight = 'fixed___height',
  FixedSrc = 'fixed___src',
  FixedSrcSet = 'fixed___srcSet',
  FixedSrcWebp = 'fixed___srcWebp',
  FixedSrcSetWebp = 'fixed___srcSetWebp',
  FluidBase64 = 'fluid___base64',
  FluidAspectRatio = 'fluid___aspectRatio',
  FluidSrc = 'fluid___src',
  FluidSrcSet = 'fluid___srcSet',
  FluidSrcWebp = 'fluid___srcWebp',
  FluidSrcSetWebp = 'fluid___srcSetWebp',
  FluidSizes = 'fluid___sizes',
  RawMetadata = '_rawMetadata',
  RawSource = '_rawSource',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type SanityImageAssetFilterInput = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  originalFilename?: Maybe<StringQueryOperatorInput>,
  label?: Maybe<StringQueryOperatorInput>,
  title?: Maybe<StringQueryOperatorInput>,
  description?: Maybe<StringQueryOperatorInput>,
  sha1hash?: Maybe<StringQueryOperatorInput>,
  extension?: Maybe<StringQueryOperatorInput>,
  mimeType?: Maybe<StringQueryOperatorInput>,
  size?: Maybe<FloatQueryOperatorInput>,
  assetId?: Maybe<StringQueryOperatorInput>,
  path?: Maybe<StringQueryOperatorInput>,
  url?: Maybe<StringQueryOperatorInput>,
  metadata?: Maybe<SanityImageMetadataFilterInput>,
  source?: Maybe<SanityAssetSourceDataFilterInput>,
  fixed?: Maybe<SanityImageFixedFilterInput>,
  fluid?: Maybe<SanityImageFluidFilterInput>,
  _rawMetadata?: Maybe<JsonQueryOperatorInput>,
  _rawSource?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
};

export type SanityImageAssetGroupConnection = {
   __typename?: 'SanityImageAssetGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityImageAssetEdge>,
  nodes: Array<SanityImageAsset>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type SanityImageAssetSortInput = {
  fields?: Maybe<Array<Maybe<SanityImageAssetFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type SanityImageCrop = {
   __typename?: 'SanityImageCrop',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  top?: Maybe<Scalars['Float']>,
  bottom?: Maybe<Scalars['Float']>,
  left?: Maybe<Scalars['Float']>,
  right?: Maybe<Scalars['Float']>,
};

export type SanityImageCropFilterInput = {
  _key?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  top?: Maybe<FloatQueryOperatorInput>,
  bottom?: Maybe<FloatQueryOperatorInput>,
  left?: Maybe<FloatQueryOperatorInput>,
  right?: Maybe<FloatQueryOperatorInput>,
};

export type SanityImageDimensions = {
   __typename?: 'SanityImageDimensions',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  height?: Maybe<Scalars['Float']>,
  width?: Maybe<Scalars['Float']>,
  aspectRatio?: Maybe<Scalars['Float']>,
};

export type SanityImageDimensionsFilterInput = {
  _key?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  height?: Maybe<FloatQueryOperatorInput>,
  width?: Maybe<FloatQueryOperatorInput>,
  aspectRatio?: Maybe<FloatQueryOperatorInput>,
};

export type SanityImageFilterInput = {
  _key?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  asset?: Maybe<SanityImageAssetFilterInput>,
  hotspot?: Maybe<SanityImageHotspotFilterInput>,
  crop?: Maybe<SanityImageCropFilterInput>,
};

export type SanityImageFixed = {
   __typename?: 'SanityImageFixed',
  base64?: Maybe<Scalars['String']>,
  aspectRatio?: Maybe<Scalars['Float']>,
  width?: Maybe<Scalars['Float']>,
  height?: Maybe<Scalars['Float']>,
  src?: Maybe<Scalars['String']>,
  srcSet?: Maybe<Scalars['String']>,
  srcWebp?: Maybe<Scalars['String']>,
  srcSetWebp?: Maybe<Scalars['String']>,
};

export type SanityImageFixedFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>,
  aspectRatio?: Maybe<FloatQueryOperatorInput>,
  width?: Maybe<FloatQueryOperatorInput>,
  height?: Maybe<FloatQueryOperatorInput>,
  src?: Maybe<StringQueryOperatorInput>,
  srcSet?: Maybe<StringQueryOperatorInput>,
  srcWebp?: Maybe<StringQueryOperatorInput>,
  srcSetWebp?: Maybe<StringQueryOperatorInput>,
};

export type SanityImageFluid = {
   __typename?: 'SanityImageFluid',
  base64?: Maybe<Scalars['String']>,
  aspectRatio?: Maybe<Scalars['Float']>,
  src?: Maybe<Scalars['String']>,
  srcSet?: Maybe<Scalars['String']>,
  srcWebp?: Maybe<Scalars['String']>,
  srcSetWebp?: Maybe<Scalars['String']>,
  sizes?: Maybe<Scalars['String']>,
};

export type SanityImageFluidFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>,
  aspectRatio?: Maybe<FloatQueryOperatorInput>,
  src?: Maybe<StringQueryOperatorInput>,
  srcSet?: Maybe<StringQueryOperatorInput>,
  srcWebp?: Maybe<StringQueryOperatorInput>,
  srcSetWebp?: Maybe<StringQueryOperatorInput>,
  sizes?: Maybe<StringQueryOperatorInput>,
};

export enum SanityImageFormat {
  NoChange = 'NO_CHANGE',
  Jpg = 'JPG',
  Png = 'PNG',
  Webp = 'WEBP'
}

export type SanityImageHotspot = {
   __typename?: 'SanityImageHotspot',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  x?: Maybe<Scalars['Float']>,
  y?: Maybe<Scalars['Float']>,
  height?: Maybe<Scalars['Float']>,
  width?: Maybe<Scalars['Float']>,
};

export type SanityImageHotspotFilterInput = {
  _key?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  x?: Maybe<FloatQueryOperatorInput>,
  y?: Maybe<FloatQueryOperatorInput>,
  height?: Maybe<FloatQueryOperatorInput>,
  width?: Maybe<FloatQueryOperatorInput>,
};

export type SanityImageMetadata = {
   __typename?: 'SanityImageMetadata',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  location?: Maybe<SanityGeopoint>,
  dimensions?: Maybe<SanityImageDimensions>,
  palette?: Maybe<SanityImagePalette>,
  lqip?: Maybe<Scalars['String']>,
  hasAlpha?: Maybe<Scalars['Boolean']>,
  isOpaque?: Maybe<Scalars['Boolean']>,
};

export type SanityImageMetadataFilterInput = {
  _key?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  location?: Maybe<SanityGeopointFilterInput>,
  dimensions?: Maybe<SanityImageDimensionsFilterInput>,
  palette?: Maybe<SanityImagePaletteFilterInput>,
  lqip?: Maybe<StringQueryOperatorInput>,
  hasAlpha?: Maybe<BooleanQueryOperatorInput>,
  isOpaque?: Maybe<BooleanQueryOperatorInput>,
};

export type SanityImagePalette = {
   __typename?: 'SanityImagePalette',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  darkMuted?: Maybe<SanityImagePaletteSwatch>,
  lightVibrant?: Maybe<SanityImagePaletteSwatch>,
  darkVibrant?: Maybe<SanityImagePaletteSwatch>,
  vibrant?: Maybe<SanityImagePaletteSwatch>,
  dominant?: Maybe<SanityImagePaletteSwatch>,
  lightMuted?: Maybe<SanityImagePaletteSwatch>,
  muted?: Maybe<SanityImagePaletteSwatch>,
};

export type SanityImagePaletteFilterInput = {
  _key?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  darkMuted?: Maybe<SanityImagePaletteSwatchFilterInput>,
  lightVibrant?: Maybe<SanityImagePaletteSwatchFilterInput>,
  darkVibrant?: Maybe<SanityImagePaletteSwatchFilterInput>,
  vibrant?: Maybe<SanityImagePaletteSwatchFilterInput>,
  dominant?: Maybe<SanityImagePaletteSwatchFilterInput>,
  lightMuted?: Maybe<SanityImagePaletteSwatchFilterInput>,
  muted?: Maybe<SanityImagePaletteSwatchFilterInput>,
};

export type SanityImagePaletteSwatch = {
   __typename?: 'SanityImagePaletteSwatch',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  background?: Maybe<Scalars['String']>,
  foreground?: Maybe<Scalars['String']>,
  population?: Maybe<Scalars['Float']>,
  title?: Maybe<Scalars['String']>,
};

export type SanityImagePaletteSwatchFilterInput = {
  _key?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  background?: Maybe<StringQueryOperatorInput>,
  foreground?: Maybe<StringQueryOperatorInput>,
  population?: Maybe<FloatQueryOperatorInput>,
  title?: Maybe<StringQueryOperatorInput>,
};

export type SanityLocaleString = {
   __typename?: 'SanityLocaleString',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  en?: Maybe<Scalars['String']>,
  nl?: Maybe<Scalars['String']>,
};

export type SanityLocaleStringFilterInput = {
  _key?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  en?: Maybe<StringQueryOperatorInput>,
  nl?: Maybe<StringQueryOperatorInput>,
};

export type SanityLocaleText = {
   __typename?: 'SanityLocaleText',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  en?: Maybe<Scalars['String']>,
  nl?: Maybe<Scalars['String']>,
};

export type SanityLocaleTextFilterInput = {
  _key?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  en?: Maybe<StringQueryOperatorInput>,
  nl?: Maybe<StringQueryOperatorInput>,
};

export type SanityLocationSubpage = SanityDocument & Node & {
   __typename?: 'SanityLocationSubpage',
  _id?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _createdAt?: Maybe<Scalars['Date']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  _rev?: Maybe<Scalars['String']>,
  _key?: Maybe<Scalars['String']>,
  template?: Maybe<SanityTemplate>,
  city?: Maybe<SanityCity>,
  layout?: Maybe<SanityGalleryOrHangoutOrHub>,
  menuImage?: Maybe<SanityPicture>,
  meta?: Maybe<SanityPageMeta>,
  _rawTemplate?: Maybe<Scalars['JSON']>,
  _rawCity?: Maybe<Scalars['JSON']>,
  _rawLayout?: Maybe<Scalars['JSON']>,
  _rawMenuImage?: Maybe<Scalars['JSON']>,
  _rawMeta?: Maybe<Scalars['JSON']>,
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
};


export type SanityLocationSubpage_CreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityLocationSubpage_UpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityLocationSubpage_RawTemplateArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityLocationSubpage_RawCityArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityLocationSubpage_RawLayoutArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityLocationSubpage_RawMenuImageArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityLocationSubpage_RawMetaArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};

export type SanityLocationSubpageConnection = {
   __typename?: 'SanityLocationSubpageConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityLocationSubpageEdge>,
  nodes: Array<SanityLocationSubpage>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<SanityLocationSubpageGroupConnection>,
};


export type SanityLocationSubpageConnectionDistinctArgs = {
  field: SanityLocationSubpageFieldsEnum
};


export type SanityLocationSubpageConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: SanityLocationSubpageFieldsEnum
};

export type SanityLocationSubpageEdge = {
   __typename?: 'SanityLocationSubpageEdge',
  next?: Maybe<SanityLocationSubpage>,
  node: SanityLocationSubpage,
  previous?: Maybe<SanityLocationSubpage>,
};

export enum SanityLocationSubpageFieldsEnum {
  Id = '_id',
  Type = '_type',
  CreatedAt = '_createdAt',
  UpdatedAt = '_updatedAt',
  Rev = '_rev',
  Key = '_key',
  TemplateId = 'template____id',
  TemplateType = 'template____type',
  TemplateCreatedAt = 'template____createdAt',
  TemplateUpdatedAt = 'template____updatedAt',
  TemplateRev = 'template____rev',
  TemplateKey = 'template____key',
  TemplateTitleKey = 'template___title____key',
  TemplateTitleType = 'template___title____type',
  TemplateTitleEn = 'template___title___en',
  TemplateTitleNl = 'template___title___nl',
  TemplateSlugKey = 'template___slug____key',
  TemplateSlugType = 'template___slug____type',
  TemplateSlugCurrent = 'template___slug___current',
  TemplateRawTitle = 'template____rawTitle',
  TemplateRawSlug = 'template____rawSlug',
  TemplateId = 'template___id',
  TemplateParentId = 'template___parent___id',
  TemplateParentParentId = 'template___parent___parent___id',
  TemplateParentParentChildren = 'template___parent___parent___children',
  TemplateParentChildren = 'template___parent___children',
  TemplateParentChildrenId = 'template___parent___children___id',
  TemplateParentChildrenChildren = 'template___parent___children___children',
  TemplateParentInternalContent = 'template___parent___internal___content',
  TemplateParentInternalContentDigest = 'template___parent___internal___contentDigest',
  TemplateParentInternalDescription = 'template___parent___internal___description',
  TemplateParentInternalFieldOwners = 'template___parent___internal___fieldOwners',
  TemplateParentInternalIgnoreType = 'template___parent___internal___ignoreType',
  TemplateParentInternalMediaType = 'template___parent___internal___mediaType',
  TemplateParentInternalOwner = 'template___parent___internal___owner',
  TemplateParentInternalType = 'template___parent___internal___type',
  TemplateChildren = 'template___children',
  TemplateChildrenId = 'template___children___id',
  TemplateChildrenParentId = 'template___children___parent___id',
  TemplateChildrenParentChildren = 'template___children___parent___children',
  TemplateChildrenChildren = 'template___children___children',
  TemplateChildrenChildrenId = 'template___children___children___id',
  TemplateChildrenChildrenChildren = 'template___children___children___children',
  TemplateChildrenInternalContent = 'template___children___internal___content',
  TemplateChildrenInternalContentDigest = 'template___children___internal___contentDigest',
  TemplateChildrenInternalDescription = 'template___children___internal___description',
  TemplateChildrenInternalFieldOwners = 'template___children___internal___fieldOwners',
  TemplateChildrenInternalIgnoreType = 'template___children___internal___ignoreType',
  TemplateChildrenInternalMediaType = 'template___children___internal___mediaType',
  TemplateChildrenInternalOwner = 'template___children___internal___owner',
  TemplateChildrenInternalType = 'template___children___internal___type',
  TemplateInternalContent = 'template___internal___content',
  TemplateInternalContentDigest = 'template___internal___contentDigest',
  TemplateInternalDescription = 'template___internal___description',
  TemplateInternalFieldOwners = 'template___internal___fieldOwners',
  TemplateInternalIgnoreType = 'template___internal___ignoreType',
  TemplateInternalMediaType = 'template___internal___mediaType',
  TemplateInternalOwner = 'template___internal___owner',
  TemplateInternalType = 'template___internal___type',
  CityId = 'city____id',
  CityType = 'city____type',
  CityCreatedAt = 'city____createdAt',
  CityUpdatedAt = 'city____updatedAt',
  CityRev = 'city____rev',
  CityKey = 'city____key',
  CityNameKey = 'city___name____key',
  CityNameType = 'city___name____type',
  CityNameEn = 'city___name___en',
  CityNameNl = 'city___name___nl',
  CitySlugKey = 'city___slug____key',
  CitySlugType = 'city___slug____type',
  CitySlugCurrent = 'city___slug___current',
  CityImageKey = 'city___image____key',
  CityImageType = 'city___image____type',
  CityImageAltKey = 'city___image___alt____key',
  CityImageAltType = 'city___image___alt____type',
  CityImageAltEn = 'city___image___alt___en',
  CityImageAltNl = 'city___image___alt___nl',
  CityImageAssetId = 'city___image___asset____id',
  CityImageAssetType = 'city___image___asset____type',
  CityImageAssetCreatedAt = 'city___image___asset____createdAt',
  CityImageAssetUpdatedAt = 'city___image___asset____updatedAt',
  CityImageAssetRev = 'city___image___asset____rev',
  CityImageAssetKey = 'city___image___asset____key',
  CityImageAssetOriginalFilename = 'city___image___asset___originalFilename',
  CityImageAssetLabel = 'city___image___asset___label',
  CityImageAssetTitle = 'city___image___asset___title',
  CityImageAssetDescription = 'city___image___asset___description',
  CityImageAssetSha1hash = 'city___image___asset___sha1hash',
  CityImageAssetExtension = 'city___image___asset___extension',
  CityImageAssetMimeType = 'city___image___asset___mimeType',
  CityImageAssetSize = 'city___image___asset___size',
  CityImageAssetAssetId = 'city___image___asset___assetId',
  CityImageAssetPath = 'city___image___asset___path',
  CityImageAssetUrl = 'city___image___asset___url',
  CityImageAssetRawMetadata = 'city___image___asset____rawMetadata',
  CityImageAssetRawSource = 'city___image___asset____rawSource',
  CityImageAssetId = 'city___image___asset___id',
  CityImageAssetChildren = 'city___image___asset___children',
  CityImageHotspotKey = 'city___image___hotspot____key',
  CityImageHotspotType = 'city___image___hotspot____type',
  CityImageHotspotX = 'city___image___hotspot___x',
  CityImageHotspotY = 'city___image___hotspot___y',
  CityImageHotspotHeight = 'city___image___hotspot___height',
  CityImageHotspotWidth = 'city___image___hotspot___width',
  CityImageCropKey = 'city___image___crop____key',
  CityImageCropType = 'city___image___crop____type',
  CityImageCropTop = 'city___image___crop___top',
  CityImageCropBottom = 'city___image___crop___bottom',
  CityImageCropLeft = 'city___image___crop___left',
  CityImageCropRight = 'city___image___crop___right',
  CitySubpages = 'city___subpages',
  CitySubpagesId = 'city___subpages____id',
  CitySubpagesType = 'city___subpages____type',
  CitySubpagesCreatedAt = 'city___subpages____createdAt',
  CitySubpagesUpdatedAt = 'city___subpages____updatedAt',
  CitySubpagesRev = 'city___subpages____rev',
  CitySubpagesKey = 'city___subpages____key',
  CitySubpagesTemplateId = 'city___subpages___template____id',
  CitySubpagesTemplateType = 'city___subpages___template____type',
  CitySubpagesTemplateCreatedAt = 'city___subpages___template____createdAt',
  CitySubpagesTemplateUpdatedAt = 'city___subpages___template____updatedAt',
  CitySubpagesTemplateRev = 'city___subpages___template____rev',
  CitySubpagesTemplateKey = 'city___subpages___template____key',
  CitySubpagesTemplateRawTitle = 'city___subpages___template____rawTitle',
  CitySubpagesTemplateRawSlug = 'city___subpages___template____rawSlug',
  CitySubpagesTemplateId = 'city___subpages___template___id',
  CitySubpagesTemplateChildren = 'city___subpages___template___children',
  CitySubpagesCityId = 'city___subpages___city____id',
  CitySubpagesCityType = 'city___subpages___city____type',
  CitySubpagesCityCreatedAt = 'city___subpages___city____createdAt',
  CitySubpagesCityUpdatedAt = 'city___subpages___city____updatedAt',
  CitySubpagesCityRev = 'city___subpages___city____rev',
  CitySubpagesCityKey = 'city___subpages___city____key',
  CitySubpagesCitySubpages = 'city___subpages___city___subpages',
  CitySubpagesCityRawName = 'city___subpages___city____rawName',
  CitySubpagesCityRawSlug = 'city___subpages___city____rawSlug',
  CitySubpagesCityRawImage = 'city___subpages___city____rawImage',
  CitySubpagesCityRawSubpages = 'city___subpages___city____rawSubpages',
  CitySubpagesCityRawMeta = 'city___subpages___city____rawMeta',
  CitySubpagesCityId = 'city___subpages___city___id',
  CitySubpagesCityChildren = 'city___subpages___city___children',
  CitySubpagesMenuImageKey = 'city___subpages___menuImage____key',
  CitySubpagesMenuImageType = 'city___subpages___menuImage____type',
  CitySubpagesMetaKey = 'city___subpages___meta____key',
  CitySubpagesMetaType = 'city___subpages___meta____type',
  CitySubpagesMetaSitemap = 'city___subpages___meta___sitemap',
  CitySubpagesMetaRobots = 'city___subpages___meta___robots',
  CitySubpagesRawTemplate = 'city___subpages____rawTemplate',
  CitySubpagesRawCity = 'city___subpages____rawCity',
  CitySubpagesRawLayout = 'city___subpages____rawLayout',
  CitySubpagesRawMenuImage = 'city___subpages____rawMenuImage',
  CitySubpagesRawMeta = 'city___subpages____rawMeta',
  CitySubpagesId = 'city___subpages___id',
  CitySubpagesParentId = 'city___subpages___parent___id',
  CitySubpagesParentChildren = 'city___subpages___parent___children',
  CitySubpagesChildren = 'city___subpages___children',
  CitySubpagesChildrenId = 'city___subpages___children___id',
  CitySubpagesChildrenChildren = 'city___subpages___children___children',
  CitySubpagesInternalContent = 'city___subpages___internal___content',
  CitySubpagesInternalContentDigest = 'city___subpages___internal___contentDigest',
  CitySubpagesInternalDescription = 'city___subpages___internal___description',
  CitySubpagesInternalFieldOwners = 'city___subpages___internal___fieldOwners',
  CitySubpagesInternalIgnoreType = 'city___subpages___internal___ignoreType',
  CitySubpagesInternalMediaType = 'city___subpages___internal___mediaType',
  CitySubpagesInternalOwner = 'city___subpages___internal___owner',
  CitySubpagesInternalType = 'city___subpages___internal___type',
  CityMetaKey = 'city___meta____key',
  CityMetaType = 'city___meta____type',
  CityMetaSeoTitleKey = 'city___meta___seoTitle____key',
  CityMetaSeoTitleType = 'city___meta___seoTitle____type',
  CityMetaSeoTitleEn = 'city___meta___seoTitle___en',
  CityMetaSeoTitleNl = 'city___meta___seoTitle___nl',
  CityMetaSeoDescriptionKey = 'city___meta___seoDescription____key',
  CityMetaSeoDescriptionType = 'city___meta___seoDescription____type',
  CityMetaSeoDescriptionEn = 'city___meta___seoDescription___en',
  CityMetaSeoDescriptionNl = 'city___meta___seoDescription___nl',
  CityMetaSeoImageKey = 'city___meta___seoImage____key',
  CityMetaSeoImageType = 'city___meta___seoImage____type',
  CityMetaSitemap = 'city___meta___sitemap',
  CityMetaRobots = 'city___meta___robots',
  CityRawName = 'city____rawName',
  CityRawSlug = 'city____rawSlug',
  CityRawImage = 'city____rawImage',
  CityRawSubpages = 'city____rawSubpages',
  CityRawMeta = 'city____rawMeta',
  CityId = 'city___id',
  CityParentId = 'city___parent___id',
  CityParentParentId = 'city___parent___parent___id',
  CityParentParentChildren = 'city___parent___parent___children',
  CityParentChildren = 'city___parent___children',
  CityParentChildrenId = 'city___parent___children___id',
  CityParentChildrenChildren = 'city___parent___children___children',
  CityParentInternalContent = 'city___parent___internal___content',
  CityParentInternalContentDigest = 'city___parent___internal___contentDigest',
  CityParentInternalDescription = 'city___parent___internal___description',
  CityParentInternalFieldOwners = 'city___parent___internal___fieldOwners',
  CityParentInternalIgnoreType = 'city___parent___internal___ignoreType',
  CityParentInternalMediaType = 'city___parent___internal___mediaType',
  CityParentInternalOwner = 'city___parent___internal___owner',
  CityParentInternalType = 'city___parent___internal___type',
  CityChildren = 'city___children',
  CityChildrenId = 'city___children___id',
  CityChildrenParentId = 'city___children___parent___id',
  CityChildrenParentChildren = 'city___children___parent___children',
  CityChildrenChildren = 'city___children___children',
  CityChildrenChildrenId = 'city___children___children___id',
  CityChildrenChildrenChildren = 'city___children___children___children',
  CityChildrenInternalContent = 'city___children___internal___content',
  CityChildrenInternalContentDigest = 'city___children___internal___contentDigest',
  CityChildrenInternalDescription = 'city___children___internal___description',
  CityChildrenInternalFieldOwners = 'city___children___internal___fieldOwners',
  CityChildrenInternalIgnoreType = 'city___children___internal___ignoreType',
  CityChildrenInternalMediaType = 'city___children___internal___mediaType',
  CityChildrenInternalOwner = 'city___children___internal___owner',
  CityChildrenInternalType = 'city___children___internal___type',
  CityInternalContent = 'city___internal___content',
  CityInternalContentDigest = 'city___internal___contentDigest',
  CityInternalDescription = 'city___internal___description',
  CityInternalFieldOwners = 'city___internal___fieldOwners',
  CityInternalIgnoreType = 'city___internal___ignoreType',
  CityInternalMediaType = 'city___internal___mediaType',
  CityInternalOwner = 'city___internal___owner',
  CityInternalType = 'city___internal___type',
  MenuImageKey = 'menuImage____key',
  MenuImageType = 'menuImage____type',
  MenuImageAltKey = 'menuImage___alt____key',
  MenuImageAltType = 'menuImage___alt____type',
  MenuImageAltEn = 'menuImage___alt___en',
  MenuImageAltNl = 'menuImage___alt___nl',
  MenuImageAssetId = 'menuImage___asset____id',
  MenuImageAssetType = 'menuImage___asset____type',
  MenuImageAssetCreatedAt = 'menuImage___asset____createdAt',
  MenuImageAssetUpdatedAt = 'menuImage___asset____updatedAt',
  MenuImageAssetRev = 'menuImage___asset____rev',
  MenuImageAssetKey = 'menuImage___asset____key',
  MenuImageAssetOriginalFilename = 'menuImage___asset___originalFilename',
  MenuImageAssetLabel = 'menuImage___asset___label',
  MenuImageAssetTitle = 'menuImage___asset___title',
  MenuImageAssetDescription = 'menuImage___asset___description',
  MenuImageAssetSha1hash = 'menuImage___asset___sha1hash',
  MenuImageAssetExtension = 'menuImage___asset___extension',
  MenuImageAssetMimeType = 'menuImage___asset___mimeType',
  MenuImageAssetSize = 'menuImage___asset___size',
  MenuImageAssetAssetId = 'menuImage___asset___assetId',
  MenuImageAssetPath = 'menuImage___asset___path',
  MenuImageAssetUrl = 'menuImage___asset___url',
  MenuImageAssetMetadataKey = 'menuImage___asset___metadata____key',
  MenuImageAssetMetadataType = 'menuImage___asset___metadata____type',
  MenuImageAssetMetadataLqip = 'menuImage___asset___metadata___lqip',
  MenuImageAssetMetadataHasAlpha = 'menuImage___asset___metadata___hasAlpha',
  MenuImageAssetMetadataIsOpaque = 'menuImage___asset___metadata___isOpaque',
  MenuImageAssetSourceKey = 'menuImage___asset___source____key',
  MenuImageAssetSourceType = 'menuImage___asset___source____type',
  MenuImageAssetSourceName = 'menuImage___asset___source___name',
  MenuImageAssetSourceSanityId = 'menuImage___asset___source___sanityId',
  MenuImageAssetSourceUrl = 'menuImage___asset___source___url',
  MenuImageAssetFixedBase64 = 'menuImage___asset___fixed___base64',
  MenuImageAssetFixedAspectRatio = 'menuImage___asset___fixed___aspectRatio',
  MenuImageAssetFixedWidth = 'menuImage___asset___fixed___width',
  MenuImageAssetFixedHeight = 'menuImage___asset___fixed___height',
  MenuImageAssetFixedSrc = 'menuImage___asset___fixed___src',
  MenuImageAssetFixedSrcSet = 'menuImage___asset___fixed___srcSet',
  MenuImageAssetFixedSrcWebp = 'menuImage___asset___fixed___srcWebp',
  MenuImageAssetFixedSrcSetWebp = 'menuImage___asset___fixed___srcSetWebp',
  MenuImageAssetFluidBase64 = 'menuImage___asset___fluid___base64',
  MenuImageAssetFluidAspectRatio = 'menuImage___asset___fluid___aspectRatio',
  MenuImageAssetFluidSrc = 'menuImage___asset___fluid___src',
  MenuImageAssetFluidSrcSet = 'menuImage___asset___fluid___srcSet',
  MenuImageAssetFluidSrcWebp = 'menuImage___asset___fluid___srcWebp',
  MenuImageAssetFluidSrcSetWebp = 'menuImage___asset___fluid___srcSetWebp',
  MenuImageAssetFluidSizes = 'menuImage___asset___fluid___sizes',
  MenuImageAssetRawMetadata = 'menuImage___asset____rawMetadata',
  MenuImageAssetRawSource = 'menuImage___asset____rawSource',
  MenuImageAssetId = 'menuImage___asset___id',
  MenuImageAssetParentId = 'menuImage___asset___parent___id',
  MenuImageAssetParentChildren = 'menuImage___asset___parent___children',
  MenuImageAssetChildren = 'menuImage___asset___children',
  MenuImageAssetChildrenId = 'menuImage___asset___children___id',
  MenuImageAssetChildrenChildren = 'menuImage___asset___children___children',
  MenuImageAssetInternalContent = 'menuImage___asset___internal___content',
  MenuImageAssetInternalContentDigest = 'menuImage___asset___internal___contentDigest',
  MenuImageAssetInternalDescription = 'menuImage___asset___internal___description',
  MenuImageAssetInternalFieldOwners = 'menuImage___asset___internal___fieldOwners',
  MenuImageAssetInternalIgnoreType = 'menuImage___asset___internal___ignoreType',
  MenuImageAssetInternalMediaType = 'menuImage___asset___internal___mediaType',
  MenuImageAssetInternalOwner = 'menuImage___asset___internal___owner',
  MenuImageAssetInternalType = 'menuImage___asset___internal___type',
  MenuImageHotspotKey = 'menuImage___hotspot____key',
  MenuImageHotspotType = 'menuImage___hotspot____type',
  MenuImageHotspotX = 'menuImage___hotspot___x',
  MenuImageHotspotY = 'menuImage___hotspot___y',
  MenuImageHotspotHeight = 'menuImage___hotspot___height',
  MenuImageHotspotWidth = 'menuImage___hotspot___width',
  MenuImageCropKey = 'menuImage___crop____key',
  MenuImageCropType = 'menuImage___crop____type',
  MenuImageCropTop = 'menuImage___crop___top',
  MenuImageCropBottom = 'menuImage___crop___bottom',
  MenuImageCropLeft = 'menuImage___crop___left',
  MenuImageCropRight = 'menuImage___crop___right',
  MetaKey = 'meta____key',
  MetaType = 'meta____type',
  MetaSeoTitleKey = 'meta___seoTitle____key',
  MetaSeoTitleType = 'meta___seoTitle____type',
  MetaSeoTitleEn = 'meta___seoTitle___en',
  MetaSeoTitleNl = 'meta___seoTitle___nl',
  MetaSeoDescriptionKey = 'meta___seoDescription____key',
  MetaSeoDescriptionType = 'meta___seoDescription____type',
  MetaSeoDescriptionEn = 'meta___seoDescription___en',
  MetaSeoDescriptionNl = 'meta___seoDescription___nl',
  MetaSeoImageKey = 'meta___seoImage____key',
  MetaSeoImageType = 'meta___seoImage____type',
  MetaSeoImageAssetId = 'meta___seoImage___asset____id',
  MetaSeoImageAssetType = 'meta___seoImage___asset____type',
  MetaSeoImageAssetCreatedAt = 'meta___seoImage___asset____createdAt',
  MetaSeoImageAssetUpdatedAt = 'meta___seoImage___asset____updatedAt',
  MetaSeoImageAssetRev = 'meta___seoImage___asset____rev',
  MetaSeoImageAssetKey = 'meta___seoImage___asset____key',
  MetaSeoImageAssetOriginalFilename = 'meta___seoImage___asset___originalFilename',
  MetaSeoImageAssetLabel = 'meta___seoImage___asset___label',
  MetaSeoImageAssetTitle = 'meta___seoImage___asset___title',
  MetaSeoImageAssetDescription = 'meta___seoImage___asset___description',
  MetaSeoImageAssetSha1hash = 'meta___seoImage___asset___sha1hash',
  MetaSeoImageAssetExtension = 'meta___seoImage___asset___extension',
  MetaSeoImageAssetMimeType = 'meta___seoImage___asset___mimeType',
  MetaSeoImageAssetSize = 'meta___seoImage___asset___size',
  MetaSeoImageAssetAssetId = 'meta___seoImage___asset___assetId',
  MetaSeoImageAssetPath = 'meta___seoImage___asset___path',
  MetaSeoImageAssetUrl = 'meta___seoImage___asset___url',
  MetaSeoImageAssetRawMetadata = 'meta___seoImage___asset____rawMetadata',
  MetaSeoImageAssetRawSource = 'meta___seoImage___asset____rawSource',
  MetaSeoImageAssetId = 'meta___seoImage___asset___id',
  MetaSeoImageAssetChildren = 'meta___seoImage___asset___children',
  MetaSeoImageHotspotKey = 'meta___seoImage___hotspot____key',
  MetaSeoImageHotspotType = 'meta___seoImage___hotspot____type',
  MetaSeoImageHotspotX = 'meta___seoImage___hotspot___x',
  MetaSeoImageHotspotY = 'meta___seoImage___hotspot___y',
  MetaSeoImageHotspotHeight = 'meta___seoImage___hotspot___height',
  MetaSeoImageHotspotWidth = 'meta___seoImage___hotspot___width',
  MetaSeoImageCropKey = 'meta___seoImage___crop____key',
  MetaSeoImageCropType = 'meta___seoImage___crop____type',
  MetaSeoImageCropTop = 'meta___seoImage___crop___top',
  MetaSeoImageCropBottom = 'meta___seoImage___crop___bottom',
  MetaSeoImageCropLeft = 'meta___seoImage___crop___left',
  MetaSeoImageCropRight = 'meta___seoImage___crop___right',
  MetaSitemap = 'meta___sitemap',
  MetaRobots = 'meta___robots',
  RawTemplate = '_rawTemplate',
  RawCity = '_rawCity',
  RawLayout = '_rawLayout',
  RawMenuImage = '_rawMenuImage',
  RawMeta = '_rawMeta',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type SanityLocationSubpageFilterInput = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  template?: Maybe<SanityTemplateFilterInput>,
  city?: Maybe<SanityCityFilterInput>,
  menuImage?: Maybe<SanityPictureFilterInput>,
  meta?: Maybe<SanityPageMetaFilterInput>,
  _rawTemplate?: Maybe<JsonQueryOperatorInput>,
  _rawCity?: Maybe<JsonQueryOperatorInput>,
  _rawLayout?: Maybe<JsonQueryOperatorInput>,
  _rawMenuImage?: Maybe<JsonQueryOperatorInput>,
  _rawMeta?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
};

export type SanityLocationSubpageFilterListInput = {
  elemMatch?: Maybe<SanityLocationSubpageFilterInput>,
};

export type SanityLocationSubpageGroupConnection = {
   __typename?: 'SanityLocationSubpageGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityLocationSubpageEdge>,
  nodes: Array<SanityLocationSubpage>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type SanityLocationSubpageSortInput = {
  fields?: Maybe<Array<Maybe<SanityLocationSubpageFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type SanityMainPage = SanityDocument & Node & {
   __typename?: 'SanityMainPage',
  _id?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _createdAt?: Maybe<Scalars['Date']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  _rev?: Maybe<Scalars['String']>,
  _key?: Maybe<Scalars['String']>,
  title?: Maybe<SanityLocaleString>,
  slug?: Maybe<SanitySlug>,
  layout?: Maybe<SanityGeneral>,
  meta?: Maybe<SanityPageMeta>,
  _rawTitle?: Maybe<Scalars['JSON']>,
  _rawSlug?: Maybe<Scalars['JSON']>,
  _rawLayout?: Maybe<Scalars['JSON']>,
  _rawMeta?: Maybe<Scalars['JSON']>,
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
};


export type SanityMainPage_CreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityMainPage_UpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityMainPage_RawTitleArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityMainPage_RawSlugArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityMainPage_RawLayoutArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityMainPage_RawMetaArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};

export type SanityMainPageConnection = {
   __typename?: 'SanityMainPageConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityMainPageEdge>,
  nodes: Array<SanityMainPage>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<SanityMainPageGroupConnection>,
};


export type SanityMainPageConnectionDistinctArgs = {
  field: SanityMainPageFieldsEnum
};


export type SanityMainPageConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: SanityMainPageFieldsEnum
};

export type SanityMainPageEdge = {
   __typename?: 'SanityMainPageEdge',
  next?: Maybe<SanityMainPage>,
  node: SanityMainPage,
  previous?: Maybe<SanityMainPage>,
};

export enum SanityMainPageFieldsEnum {
  Id = '_id',
  Type = '_type',
  CreatedAt = '_createdAt',
  UpdatedAt = '_updatedAt',
  Rev = '_rev',
  Key = '_key',
  TitleKey = 'title____key',
  TitleType = 'title____type',
  TitleEn = 'title___en',
  TitleNl = 'title___nl',
  SlugKey = 'slug____key',
  SlugType = 'slug____type',
  SlugCurrent = 'slug___current',
  LayoutId = 'layout____id',
  LayoutType = 'layout____type',
  LayoutCreatedAt = 'layout____createdAt',
  LayoutUpdatedAt = 'layout____updatedAt',
  LayoutRev = 'layout____rev',
  LayoutKey = 'layout____key',
  LayoutTitleKey = 'layout___title____key',
  LayoutTitleType = 'layout___title____type',
  LayoutTitleEn = 'layout___title___en',
  LayoutTitleNl = 'layout___title___nl',
  LayoutLeadKey = 'layout___lead____key',
  LayoutLeadType = 'layout___lead____type',
  LayoutLeadEn = 'layout___lead___en',
  LayoutLeadNl = 'layout___lead___nl',
  LayoutRawTitle = 'layout____rawTitle',
  LayoutRawLead = 'layout____rawLead',
  LayoutId = 'layout___id',
  LayoutParentId = 'layout___parent___id',
  LayoutParentParentId = 'layout___parent___parent___id',
  LayoutParentParentChildren = 'layout___parent___parent___children',
  LayoutParentChildren = 'layout___parent___children',
  LayoutParentChildrenId = 'layout___parent___children___id',
  LayoutParentChildrenChildren = 'layout___parent___children___children',
  LayoutParentInternalContent = 'layout___parent___internal___content',
  LayoutParentInternalContentDigest = 'layout___parent___internal___contentDigest',
  LayoutParentInternalDescription = 'layout___parent___internal___description',
  LayoutParentInternalFieldOwners = 'layout___parent___internal___fieldOwners',
  LayoutParentInternalIgnoreType = 'layout___parent___internal___ignoreType',
  LayoutParentInternalMediaType = 'layout___parent___internal___mediaType',
  LayoutParentInternalOwner = 'layout___parent___internal___owner',
  LayoutParentInternalType = 'layout___parent___internal___type',
  LayoutChildren = 'layout___children',
  LayoutChildrenId = 'layout___children___id',
  LayoutChildrenParentId = 'layout___children___parent___id',
  LayoutChildrenParentChildren = 'layout___children___parent___children',
  LayoutChildrenChildren = 'layout___children___children',
  LayoutChildrenChildrenId = 'layout___children___children___id',
  LayoutChildrenChildrenChildren = 'layout___children___children___children',
  LayoutChildrenInternalContent = 'layout___children___internal___content',
  LayoutChildrenInternalContentDigest = 'layout___children___internal___contentDigest',
  LayoutChildrenInternalDescription = 'layout___children___internal___description',
  LayoutChildrenInternalFieldOwners = 'layout___children___internal___fieldOwners',
  LayoutChildrenInternalIgnoreType = 'layout___children___internal___ignoreType',
  LayoutChildrenInternalMediaType = 'layout___children___internal___mediaType',
  LayoutChildrenInternalOwner = 'layout___children___internal___owner',
  LayoutChildrenInternalType = 'layout___children___internal___type',
  LayoutInternalContent = 'layout___internal___content',
  LayoutInternalContentDigest = 'layout___internal___contentDigest',
  LayoutInternalDescription = 'layout___internal___description',
  LayoutInternalFieldOwners = 'layout___internal___fieldOwners',
  LayoutInternalIgnoreType = 'layout___internal___ignoreType',
  LayoutInternalMediaType = 'layout___internal___mediaType',
  LayoutInternalOwner = 'layout___internal___owner',
  LayoutInternalType = 'layout___internal___type',
  MetaKey = 'meta____key',
  MetaType = 'meta____type',
  MetaSeoTitleKey = 'meta___seoTitle____key',
  MetaSeoTitleType = 'meta___seoTitle____type',
  MetaSeoTitleEn = 'meta___seoTitle___en',
  MetaSeoTitleNl = 'meta___seoTitle___nl',
  MetaSeoDescriptionKey = 'meta___seoDescription____key',
  MetaSeoDescriptionType = 'meta___seoDescription____type',
  MetaSeoDescriptionEn = 'meta___seoDescription___en',
  MetaSeoDescriptionNl = 'meta___seoDescription___nl',
  MetaSeoImageKey = 'meta___seoImage____key',
  MetaSeoImageType = 'meta___seoImage____type',
  MetaSeoImageAssetId = 'meta___seoImage___asset____id',
  MetaSeoImageAssetType = 'meta___seoImage___asset____type',
  MetaSeoImageAssetCreatedAt = 'meta___seoImage___asset____createdAt',
  MetaSeoImageAssetUpdatedAt = 'meta___seoImage___asset____updatedAt',
  MetaSeoImageAssetRev = 'meta___seoImage___asset____rev',
  MetaSeoImageAssetKey = 'meta___seoImage___asset____key',
  MetaSeoImageAssetOriginalFilename = 'meta___seoImage___asset___originalFilename',
  MetaSeoImageAssetLabel = 'meta___seoImage___asset___label',
  MetaSeoImageAssetTitle = 'meta___seoImage___asset___title',
  MetaSeoImageAssetDescription = 'meta___seoImage___asset___description',
  MetaSeoImageAssetSha1hash = 'meta___seoImage___asset___sha1hash',
  MetaSeoImageAssetExtension = 'meta___seoImage___asset___extension',
  MetaSeoImageAssetMimeType = 'meta___seoImage___asset___mimeType',
  MetaSeoImageAssetSize = 'meta___seoImage___asset___size',
  MetaSeoImageAssetAssetId = 'meta___seoImage___asset___assetId',
  MetaSeoImageAssetPath = 'meta___seoImage___asset___path',
  MetaSeoImageAssetUrl = 'meta___seoImage___asset___url',
  MetaSeoImageAssetRawMetadata = 'meta___seoImage___asset____rawMetadata',
  MetaSeoImageAssetRawSource = 'meta___seoImage___asset____rawSource',
  MetaSeoImageAssetId = 'meta___seoImage___asset___id',
  MetaSeoImageAssetChildren = 'meta___seoImage___asset___children',
  MetaSeoImageHotspotKey = 'meta___seoImage___hotspot____key',
  MetaSeoImageHotspotType = 'meta___seoImage___hotspot____type',
  MetaSeoImageHotspotX = 'meta___seoImage___hotspot___x',
  MetaSeoImageHotspotY = 'meta___seoImage___hotspot___y',
  MetaSeoImageHotspotHeight = 'meta___seoImage___hotspot___height',
  MetaSeoImageHotspotWidth = 'meta___seoImage___hotspot___width',
  MetaSeoImageCropKey = 'meta___seoImage___crop____key',
  MetaSeoImageCropType = 'meta___seoImage___crop____type',
  MetaSeoImageCropTop = 'meta___seoImage___crop___top',
  MetaSeoImageCropBottom = 'meta___seoImage___crop___bottom',
  MetaSeoImageCropLeft = 'meta___seoImage___crop___left',
  MetaSeoImageCropRight = 'meta___seoImage___crop___right',
  MetaSitemap = 'meta___sitemap',
  MetaRobots = 'meta___robots',
  RawTitle = '_rawTitle',
  RawSlug = '_rawSlug',
  RawLayout = '_rawLayout',
  RawMeta = '_rawMeta',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type SanityMainPageFilterInput = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  title?: Maybe<SanityLocaleStringFilterInput>,
  slug?: Maybe<SanitySlugFilterInput>,
  layout?: Maybe<SanityGeneralFilterInput>,
  meta?: Maybe<SanityPageMetaFilterInput>,
  _rawTitle?: Maybe<JsonQueryOperatorInput>,
  _rawSlug?: Maybe<JsonQueryOperatorInput>,
  _rawLayout?: Maybe<JsonQueryOperatorInput>,
  _rawMeta?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
};

export type SanityMainPageGroupConnection = {
   __typename?: 'SanityMainPageGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityMainPageEdge>,
  nodes: Array<SanityMainPage>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type SanityMainPageSortInput = {
  fields?: Maybe<Array<Maybe<SanityMainPageFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type SanityPageMeta = {
   __typename?: 'SanityPageMeta',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  seoTitle?: Maybe<SanityLocaleString>,
  seoDescription?: Maybe<SanityLocaleText>,
  seoImage?: Maybe<SanityImage>,
  sitemap?: Maybe<Scalars['Boolean']>,
  robots?: Maybe<Scalars['Boolean']>,
};

export type SanityPageMetaFilterInput = {
  _key?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  seoTitle?: Maybe<SanityLocaleStringFilterInput>,
  seoDescription?: Maybe<SanityLocaleTextFilterInput>,
  seoImage?: Maybe<SanityImageFilterInput>,
  sitemap?: Maybe<BooleanQueryOperatorInput>,
  robots?: Maybe<BooleanQueryOperatorInput>,
};

export type SanityPicture = {
   __typename?: 'SanityPicture',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  alt?: Maybe<SanityLocaleString>,
  asset?: Maybe<SanityImageAsset>,
  hotspot?: Maybe<SanityImageHotspot>,
  crop?: Maybe<SanityImageCrop>,
};

export type SanityPictureFilterInput = {
  _key?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  alt?: Maybe<SanityLocaleStringFilterInput>,
  asset?: Maybe<SanityImageAssetFilterInput>,
  hotspot?: Maybe<SanityImageHotspotFilterInput>,
  crop?: Maybe<SanityImageCropFilterInput>,
};

export type SanityResolveReferencesConfiguration = {
  maxDepth: Scalars['Int'],
};

export type SanitySlug = {
   __typename?: 'SanitySlug',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  current?: Maybe<Scalars['String']>,
};

export type SanitySlugFilterInput = {
  _key?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  current?: Maybe<StringQueryOperatorInput>,
};

export type SanitySocialImage = {
   __typename?: 'SanitySocialImage',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  alt?: Maybe<SanityAlt>,
  author?: Maybe<Scalars['String']>,
  caption?: Maybe<SanityLocaleText>,
  asset?: Maybe<SanityImageAsset>,
  hotspot?: Maybe<SanityImageHotspot>,
  crop?: Maybe<SanityImageCrop>,
};

export type SanitySpan = {
   __typename?: 'SanitySpan',
  _key?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  marks?: Maybe<Array<Maybe<Scalars['String']>>>,
  text?: Maybe<Scalars['String']>,
};

export type SanityTemplate = SanityDocument & Node & {
   __typename?: 'SanityTemplate',
  _id?: Maybe<Scalars['String']>,
  _type?: Maybe<Scalars['String']>,
  _createdAt?: Maybe<Scalars['Date']>,
  _updatedAt?: Maybe<Scalars['Date']>,
  _rev?: Maybe<Scalars['String']>,
  _key?: Maybe<Scalars['String']>,
  title?: Maybe<SanityLocaleString>,
  slug?: Maybe<SanitySlug>,
  _rawTitle?: Maybe<Scalars['JSON']>,
  _rawSlug?: Maybe<Scalars['JSON']>,
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
};


export type SanityTemplate_CreatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityTemplate_UpdatedAtArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};


export type SanityTemplate_RawTitleArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};


export type SanityTemplate_RawSlugArgs = {
  resolveReferences?: Maybe<SanityResolveReferencesConfiguration>
};

export type SanityTemplateConnection = {
   __typename?: 'SanityTemplateConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityTemplateEdge>,
  nodes: Array<SanityTemplate>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<SanityTemplateGroupConnection>,
};


export type SanityTemplateConnectionDistinctArgs = {
  field: SanityTemplateFieldsEnum
};


export type SanityTemplateConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: SanityTemplateFieldsEnum
};

export type SanityTemplateEdge = {
   __typename?: 'SanityTemplateEdge',
  next?: Maybe<SanityTemplate>,
  node: SanityTemplate,
  previous?: Maybe<SanityTemplate>,
};

export enum SanityTemplateFieldsEnum {
  Id = '_id',
  Type = '_type',
  CreatedAt = '_createdAt',
  UpdatedAt = '_updatedAt',
  Rev = '_rev',
  Key = '_key',
  TitleKey = 'title____key',
  TitleType = 'title____type',
  TitleEn = 'title___en',
  TitleNl = 'title___nl',
  SlugKey = 'slug____key',
  SlugType = 'slug____type',
  SlugCurrent = 'slug___current',
  RawTitle = '_rawTitle',
  RawSlug = '_rawSlug',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type SanityTemplateFilterInput = {
  _id?: Maybe<StringQueryOperatorInput>,
  _type?: Maybe<StringQueryOperatorInput>,
  _createdAt?: Maybe<DateQueryOperatorInput>,
  _updatedAt?: Maybe<DateQueryOperatorInput>,
  _rev?: Maybe<StringQueryOperatorInput>,
  _key?: Maybe<StringQueryOperatorInput>,
  title?: Maybe<SanityLocaleStringFilterInput>,
  slug?: Maybe<SanitySlugFilterInput>,
  _rawTitle?: Maybe<JsonQueryOperatorInput>,
  _rawSlug?: Maybe<JsonQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
};

export type SanityTemplateGroupConnection = {
   __typename?: 'SanityTemplateGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<SanityTemplateEdge>,
  nodes: Array<SanityTemplate>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type SanityTemplateSortInput = {
  fields?: Maybe<Array<Maybe<SanityTemplateFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type Site = Node & {
   __typename?: 'Site',
  buildTime?: Maybe<Scalars['Date']>,
  siteMetadata?: Maybe<SiteSiteMetadata>,
  port?: Maybe<Scalars['Int']>,
  host?: Maybe<Scalars['String']>,
  polyfill?: Maybe<Scalars['Boolean']>,
  pathPrefix?: Maybe<Scalars['String']>,
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
};


export type SiteBuildTimeArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};

export type SiteBuildMetadata = Node & {
   __typename?: 'SiteBuildMetadata',
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
  buildTime?: Maybe<Scalars['Date']>,
};


export type SiteBuildMetadataBuildTimeArgs = {
  formatString?: Maybe<Scalars['String']>,
  fromNow?: Maybe<Scalars['Boolean']>,
  difference?: Maybe<Scalars['String']>,
  locale?: Maybe<Scalars['String']>
};

export type SiteBuildMetadataConnection = {
   __typename?: 'SiteBuildMetadataConnection',
  totalCount: Scalars['Int'],
  edges: Array<SiteBuildMetadataEdge>,
  nodes: Array<SiteBuildMetadata>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<SiteBuildMetadataGroupConnection>,
};


export type SiteBuildMetadataConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum
};


export type SiteBuildMetadataConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: SiteBuildMetadataFieldsEnum
};

export type SiteBuildMetadataEdge = {
   __typename?: 'SiteBuildMetadataEdge',
  next?: Maybe<SiteBuildMetadata>,
  node: SiteBuildMetadata,
  previous?: Maybe<SiteBuildMetadata>,
};

export enum SiteBuildMetadataFieldsEnum {
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type',
  BuildTime = 'buildTime'
}

export type SiteBuildMetadataFilterInput = {
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
  buildTime?: Maybe<DateQueryOperatorInput>,
};

export type SiteBuildMetadataGroupConnection = {
   __typename?: 'SiteBuildMetadataGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<SiteBuildMetadataEdge>,
  nodes: Array<SiteBuildMetadata>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type SiteBuildMetadataSortInput = {
  fields?: Maybe<Array<Maybe<SiteBuildMetadataFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type SiteConnection = {
   __typename?: 'SiteConnection',
  totalCount: Scalars['Int'],
  edges: Array<SiteEdge>,
  nodes: Array<Site>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<SiteGroupConnection>,
};


export type SiteConnectionDistinctArgs = {
  field: SiteFieldsEnum
};


export type SiteConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: SiteFieldsEnum
};

export type SiteEdge = {
   __typename?: 'SiteEdge',
  next?: Maybe<Site>,
  node: Site,
  previous?: Maybe<Site>,
};

export enum SiteFieldsEnum {
  BuildTime = 'buildTime',
  SiteMetadataTitle = 'siteMetadata___title',
  SiteMetadataDescription = 'siteMetadata___description',
  SiteMetadataAuthor = 'siteMetadata___author',
  Port = 'port',
  Host = 'host',
  Polyfill = 'polyfill',
  PathPrefix = 'pathPrefix',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type'
}

export type SiteFilterInput = {
  buildTime?: Maybe<DateQueryOperatorInput>,
  siteMetadata?: Maybe<SiteSiteMetadataFilterInput>,
  port?: Maybe<IntQueryOperatorInput>,
  host?: Maybe<StringQueryOperatorInput>,
  polyfill?: Maybe<BooleanQueryOperatorInput>,
  pathPrefix?: Maybe<StringQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
};

export type SiteGroupConnection = {
   __typename?: 'SiteGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<SiteEdge>,
  nodes: Array<Site>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type SitePage = Node & {
   __typename?: 'SitePage',
  path: Scalars['String'],
  component: Scalars['String'],
  internalComponentName: Scalars['String'],
  componentChunkName: Scalars['String'],
  matchPath?: Maybe<Scalars['String']>,
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
  isCreatedByStatefulCreatePages?: Maybe<Scalars['Boolean']>,
  context?: Maybe<SitePageContext>,
  pluginCreator?: Maybe<SitePlugin>,
  pluginCreatorId?: Maybe<Scalars['String']>,
  componentPath?: Maybe<Scalars['String']>,
};

export type SitePageConnection = {
   __typename?: 'SitePageConnection',
  totalCount: Scalars['Int'],
  edges: Array<SitePageEdge>,
  nodes: Array<SitePage>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<SitePageGroupConnection>,
};


export type SitePageConnectionDistinctArgs = {
  field: SitePageFieldsEnum
};


export type SitePageConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: SitePageFieldsEnum
};

export type SitePageContext = {
   __typename?: 'SitePageContext',
  languages?: Maybe<Array<Maybe<SitePageContextLanguages>>>,
  locale?: Maybe<Scalars['String']>,
};

export type SitePageContextFilterInput = {
  languages?: Maybe<SitePageContextLanguagesFilterListInput>,
  locale?: Maybe<StringQueryOperatorInput>,
};

export type SitePageContextLanguages = {
   __typename?: 'SitePageContextLanguages',
  id?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  isDefault?: Maybe<Scalars['Boolean']>,
};

export type SitePageContextLanguagesFilterInput = {
  id?: Maybe<StringQueryOperatorInput>,
  title?: Maybe<StringQueryOperatorInput>,
  isDefault?: Maybe<BooleanQueryOperatorInput>,
};

export type SitePageContextLanguagesFilterListInput = {
  elemMatch?: Maybe<SitePageContextLanguagesFilterInput>,
};

export type SitePageEdge = {
   __typename?: 'SitePageEdge',
  next?: Maybe<SitePage>,
  node: SitePage,
  previous?: Maybe<SitePage>,
};

export enum SitePageFieldsEnum {
  Path = 'path',
  Component = 'component',
  InternalComponentName = 'internalComponentName',
  ComponentChunkName = 'componentChunkName',
  MatchPath = 'matchPath',
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type',
  IsCreatedByStatefulCreatePages = 'isCreatedByStatefulCreatePages',
  ContextLanguages = 'context___languages',
  ContextLanguagesId = 'context___languages___id',
  ContextLanguagesTitle = 'context___languages___title',
  ContextLanguagesIsDefault = 'context___languages___isDefault',
  ContextLocale = 'context___locale',
  PluginCreatorId = 'pluginCreator___id',
  PluginCreatorParentId = 'pluginCreator___parent___id',
  PluginCreatorParentParentId = 'pluginCreator___parent___parent___id',
  PluginCreatorParentParentChildren = 'pluginCreator___parent___parent___children',
  PluginCreatorParentChildren = 'pluginCreator___parent___children',
  PluginCreatorParentChildrenId = 'pluginCreator___parent___children___id',
  PluginCreatorParentChildrenChildren = 'pluginCreator___parent___children___children',
  PluginCreatorParentInternalContent = 'pluginCreator___parent___internal___content',
  PluginCreatorParentInternalContentDigest = 'pluginCreator___parent___internal___contentDigest',
  PluginCreatorParentInternalDescription = 'pluginCreator___parent___internal___description',
  PluginCreatorParentInternalFieldOwners = 'pluginCreator___parent___internal___fieldOwners',
  PluginCreatorParentInternalIgnoreType = 'pluginCreator___parent___internal___ignoreType',
  PluginCreatorParentInternalMediaType = 'pluginCreator___parent___internal___mediaType',
  PluginCreatorParentInternalOwner = 'pluginCreator___parent___internal___owner',
  PluginCreatorParentInternalType = 'pluginCreator___parent___internal___type',
  PluginCreatorChildren = 'pluginCreator___children',
  PluginCreatorChildrenId = 'pluginCreator___children___id',
  PluginCreatorChildrenParentId = 'pluginCreator___children___parent___id',
  PluginCreatorChildrenParentChildren = 'pluginCreator___children___parent___children',
  PluginCreatorChildrenChildren = 'pluginCreator___children___children',
  PluginCreatorChildrenChildrenId = 'pluginCreator___children___children___id',
  PluginCreatorChildrenChildrenChildren = 'pluginCreator___children___children___children',
  PluginCreatorChildrenInternalContent = 'pluginCreator___children___internal___content',
  PluginCreatorChildrenInternalContentDigest = 'pluginCreator___children___internal___contentDigest',
  PluginCreatorChildrenInternalDescription = 'pluginCreator___children___internal___description',
  PluginCreatorChildrenInternalFieldOwners = 'pluginCreator___children___internal___fieldOwners',
  PluginCreatorChildrenInternalIgnoreType = 'pluginCreator___children___internal___ignoreType',
  PluginCreatorChildrenInternalMediaType = 'pluginCreator___children___internal___mediaType',
  PluginCreatorChildrenInternalOwner = 'pluginCreator___children___internal___owner',
  PluginCreatorChildrenInternalType = 'pluginCreator___children___internal___type',
  PluginCreatorInternalContent = 'pluginCreator___internal___content',
  PluginCreatorInternalContentDigest = 'pluginCreator___internal___contentDigest',
  PluginCreatorInternalDescription = 'pluginCreator___internal___description',
  PluginCreatorInternalFieldOwners = 'pluginCreator___internal___fieldOwners',
  PluginCreatorInternalIgnoreType = 'pluginCreator___internal___ignoreType',
  PluginCreatorInternalMediaType = 'pluginCreator___internal___mediaType',
  PluginCreatorInternalOwner = 'pluginCreator___internal___owner',
  PluginCreatorInternalType = 'pluginCreator___internal___type',
  PluginCreatorResolve = 'pluginCreator___resolve',
  PluginCreatorName = 'pluginCreator___name',
  PluginCreatorVersion = 'pluginCreator___version',
  PluginCreatorPluginOptionsName = 'pluginCreator___pluginOptions___name',
  PluginCreatorPluginOptionsPath = 'pluginCreator___pluginOptions___path',
  PluginCreatorPluginOptionsProjectId = 'pluginCreator___pluginOptions___projectId',
  PluginCreatorPluginOptionsDataset = 'pluginCreator___pluginOptions___dataset',
  PluginCreatorPluginOptionsWatchMode = 'pluginCreator___pluginOptions___watchMode',
  PluginCreatorPluginOptionsOverlayDrafts = 'pluginCreator___pluginOptions___overlayDrafts',
  PluginCreatorPluginOptionsShortName = 'pluginCreator___pluginOptions___short_name',
  PluginCreatorPluginOptionsStartUrl = 'pluginCreator___pluginOptions___start_url',
  PluginCreatorPluginOptionsBackgroundColor = 'pluginCreator___pluginOptions___background_color',
  PluginCreatorPluginOptionsThemeColor = 'pluginCreator___pluginOptions___theme_color',
  PluginCreatorPluginOptionsDisplay = 'pluginCreator___pluginOptions___display',
  PluginCreatorPluginOptionsIcon = 'pluginCreator___pluginOptions___icon',
  PluginCreatorPluginOptionsPathCheck = 'pluginCreator___pluginOptions___pathCheck',
  PluginCreatorNodeApIs = 'pluginCreator___nodeAPIs',
  PluginCreatorBrowserApIs = 'pluginCreator___browserAPIs',
  PluginCreatorSsrApIs = 'pluginCreator___ssrAPIs',
  PluginCreatorPluginFilepath = 'pluginCreator___pluginFilepath',
  PluginCreatorPackageJsonName = 'pluginCreator___packageJson___name',
  PluginCreatorPackageJsonDescription = 'pluginCreator___packageJson___description',
  PluginCreatorPackageJsonVersion = 'pluginCreator___packageJson___version',
  PluginCreatorPackageJsonMain = 'pluginCreator___packageJson___main',
  PluginCreatorPackageJsonAuthor = 'pluginCreator___packageJson___author',
  PluginCreatorPackageJsonLicense = 'pluginCreator___packageJson___license',
  PluginCreatorPackageJsonDependencies = 'pluginCreator___packageJson___dependencies',
  PluginCreatorPackageJsonDependenciesName = 'pluginCreator___packageJson___dependencies___name',
  PluginCreatorPackageJsonDependenciesVersion = 'pluginCreator___packageJson___dependencies___version',
  PluginCreatorPackageJsonDevDependencies = 'pluginCreator___packageJson___devDependencies',
  PluginCreatorPackageJsonDevDependenciesName = 'pluginCreator___packageJson___devDependencies___name',
  PluginCreatorPackageJsonDevDependenciesVersion = 'pluginCreator___packageJson___devDependencies___version',
  PluginCreatorPackageJsonPeerDependencies = 'pluginCreator___packageJson___peerDependencies',
  PluginCreatorPackageJsonPeerDependenciesName = 'pluginCreator___packageJson___peerDependencies___name',
  PluginCreatorPackageJsonPeerDependenciesVersion = 'pluginCreator___packageJson___peerDependencies___version',
  PluginCreatorPackageJsonKeywords = 'pluginCreator___packageJson___keywords',
  PluginCreatorId = 'pluginCreatorId',
  ComponentPath = 'componentPath'
}

export type SitePageFilterInput = {
  path?: Maybe<StringQueryOperatorInput>,
  component?: Maybe<StringQueryOperatorInput>,
  internalComponentName?: Maybe<StringQueryOperatorInput>,
  componentChunkName?: Maybe<StringQueryOperatorInput>,
  matchPath?: Maybe<StringQueryOperatorInput>,
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
  isCreatedByStatefulCreatePages?: Maybe<BooleanQueryOperatorInput>,
  context?: Maybe<SitePageContextFilterInput>,
  pluginCreator?: Maybe<SitePluginFilterInput>,
  pluginCreatorId?: Maybe<StringQueryOperatorInput>,
  componentPath?: Maybe<StringQueryOperatorInput>,
};

export type SitePageGroupConnection = {
   __typename?: 'SitePageGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<SitePageEdge>,
  nodes: Array<SitePage>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type SitePageSortInput = {
  fields?: Maybe<Array<Maybe<SitePageFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type SitePlugin = Node & {
   __typename?: 'SitePlugin',
  id: Scalars['ID'],
  parent?: Maybe<Node>,
  children: Array<Node>,
  internal: Internal,
  resolve?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['String']>,
  pluginOptions?: Maybe<SitePluginPluginOptions>,
  nodeAPIs?: Maybe<Array<Maybe<Scalars['String']>>>,
  browserAPIs?: Maybe<Array<Maybe<Scalars['String']>>>,
  ssrAPIs?: Maybe<Array<Maybe<Scalars['String']>>>,
  pluginFilepath?: Maybe<Scalars['String']>,
  packageJson?: Maybe<SitePluginPackageJson>,
};

export type SitePluginConnection = {
   __typename?: 'SitePluginConnection',
  totalCount: Scalars['Int'],
  edges: Array<SitePluginEdge>,
  nodes: Array<SitePlugin>,
  pageInfo: PageInfo,
  distinct: Array<Scalars['String']>,
  group: Array<SitePluginGroupConnection>,
};


export type SitePluginConnectionDistinctArgs = {
  field: SitePluginFieldsEnum
};


export type SitePluginConnectionGroupArgs = {
  skip?: Maybe<Scalars['Int']>,
  limit?: Maybe<Scalars['Int']>,
  field: SitePluginFieldsEnum
};

export type SitePluginEdge = {
   __typename?: 'SitePluginEdge',
  next?: Maybe<SitePlugin>,
  node: SitePlugin,
  previous?: Maybe<SitePlugin>,
};

export enum SitePluginFieldsEnum {
  Id = 'id',
  ParentId = 'parent___id',
  ParentParentId = 'parent___parent___id',
  ParentParentParentId = 'parent___parent___parent___id',
  ParentParentParentChildren = 'parent___parent___parent___children',
  ParentParentChildren = 'parent___parent___children',
  ParentParentChildrenId = 'parent___parent___children___id',
  ParentParentChildrenChildren = 'parent___parent___children___children',
  ParentParentInternalContent = 'parent___parent___internal___content',
  ParentParentInternalContentDigest = 'parent___parent___internal___contentDigest',
  ParentParentInternalDescription = 'parent___parent___internal___description',
  ParentParentInternalFieldOwners = 'parent___parent___internal___fieldOwners',
  ParentParentInternalIgnoreType = 'parent___parent___internal___ignoreType',
  ParentParentInternalMediaType = 'parent___parent___internal___mediaType',
  ParentParentInternalOwner = 'parent___parent___internal___owner',
  ParentParentInternalType = 'parent___parent___internal___type',
  ParentChildren = 'parent___children',
  ParentChildrenId = 'parent___children___id',
  ParentChildrenParentId = 'parent___children___parent___id',
  ParentChildrenParentChildren = 'parent___children___parent___children',
  ParentChildrenChildren = 'parent___children___children',
  ParentChildrenChildrenId = 'parent___children___children___id',
  ParentChildrenChildrenChildren = 'parent___children___children___children',
  ParentChildrenInternalContent = 'parent___children___internal___content',
  ParentChildrenInternalContentDigest = 'parent___children___internal___contentDigest',
  ParentChildrenInternalDescription = 'parent___children___internal___description',
  ParentChildrenInternalFieldOwners = 'parent___children___internal___fieldOwners',
  ParentChildrenInternalIgnoreType = 'parent___children___internal___ignoreType',
  ParentChildrenInternalMediaType = 'parent___children___internal___mediaType',
  ParentChildrenInternalOwner = 'parent___children___internal___owner',
  ParentChildrenInternalType = 'parent___children___internal___type',
  ParentInternalContent = 'parent___internal___content',
  ParentInternalContentDigest = 'parent___internal___contentDigest',
  ParentInternalDescription = 'parent___internal___description',
  ParentInternalFieldOwners = 'parent___internal___fieldOwners',
  ParentInternalIgnoreType = 'parent___internal___ignoreType',
  ParentInternalMediaType = 'parent___internal___mediaType',
  ParentInternalOwner = 'parent___internal___owner',
  ParentInternalType = 'parent___internal___type',
  Children = 'children',
  ChildrenId = 'children___id',
  ChildrenParentId = 'children___parent___id',
  ChildrenParentParentId = 'children___parent___parent___id',
  ChildrenParentParentChildren = 'children___parent___parent___children',
  ChildrenParentChildren = 'children___parent___children',
  ChildrenParentChildrenId = 'children___parent___children___id',
  ChildrenParentChildrenChildren = 'children___parent___children___children',
  ChildrenParentInternalContent = 'children___parent___internal___content',
  ChildrenParentInternalContentDigest = 'children___parent___internal___contentDigest',
  ChildrenParentInternalDescription = 'children___parent___internal___description',
  ChildrenParentInternalFieldOwners = 'children___parent___internal___fieldOwners',
  ChildrenParentInternalIgnoreType = 'children___parent___internal___ignoreType',
  ChildrenParentInternalMediaType = 'children___parent___internal___mediaType',
  ChildrenParentInternalOwner = 'children___parent___internal___owner',
  ChildrenParentInternalType = 'children___parent___internal___type',
  ChildrenChildren = 'children___children',
  ChildrenChildrenId = 'children___children___id',
  ChildrenChildrenParentId = 'children___children___parent___id',
  ChildrenChildrenParentChildren = 'children___children___parent___children',
  ChildrenChildrenChildren = 'children___children___children',
  ChildrenChildrenChildrenId = 'children___children___children___id',
  ChildrenChildrenChildrenChildren = 'children___children___children___children',
  ChildrenChildrenInternalContent = 'children___children___internal___content',
  ChildrenChildrenInternalContentDigest = 'children___children___internal___contentDigest',
  ChildrenChildrenInternalDescription = 'children___children___internal___description',
  ChildrenChildrenInternalFieldOwners = 'children___children___internal___fieldOwners',
  ChildrenChildrenInternalIgnoreType = 'children___children___internal___ignoreType',
  ChildrenChildrenInternalMediaType = 'children___children___internal___mediaType',
  ChildrenChildrenInternalOwner = 'children___children___internal___owner',
  ChildrenChildrenInternalType = 'children___children___internal___type',
  ChildrenInternalContent = 'children___internal___content',
  ChildrenInternalContentDigest = 'children___internal___contentDigest',
  ChildrenInternalDescription = 'children___internal___description',
  ChildrenInternalFieldOwners = 'children___internal___fieldOwners',
  ChildrenInternalIgnoreType = 'children___internal___ignoreType',
  ChildrenInternalMediaType = 'children___internal___mediaType',
  ChildrenInternalOwner = 'children___internal___owner',
  ChildrenInternalType = 'children___internal___type',
  InternalContent = 'internal___content',
  InternalContentDigest = 'internal___contentDigest',
  InternalDescription = 'internal___description',
  InternalFieldOwners = 'internal___fieldOwners',
  InternalIgnoreType = 'internal___ignoreType',
  InternalMediaType = 'internal___mediaType',
  InternalOwner = 'internal___owner',
  InternalType = 'internal___type',
  Resolve = 'resolve',
  Name = 'name',
  Version = 'version',
  PluginOptionsName = 'pluginOptions___name',
  PluginOptionsPath = 'pluginOptions___path',
  PluginOptionsProjectId = 'pluginOptions___projectId',
  PluginOptionsDataset = 'pluginOptions___dataset',
  PluginOptionsWatchMode = 'pluginOptions___watchMode',
  PluginOptionsOverlayDrafts = 'pluginOptions___overlayDrafts',
  PluginOptionsShortName = 'pluginOptions___short_name',
  PluginOptionsStartUrl = 'pluginOptions___start_url',
  PluginOptionsBackgroundColor = 'pluginOptions___background_color',
  PluginOptionsThemeColor = 'pluginOptions___theme_color',
  PluginOptionsDisplay = 'pluginOptions___display',
  PluginOptionsIcon = 'pluginOptions___icon',
  PluginOptionsPathCheck = 'pluginOptions___pathCheck',
  NodeApIs = 'nodeAPIs',
  BrowserApIs = 'browserAPIs',
  SsrApIs = 'ssrAPIs',
  PluginFilepath = 'pluginFilepath',
  PackageJsonName = 'packageJson___name',
  PackageJsonDescription = 'packageJson___description',
  PackageJsonVersion = 'packageJson___version',
  PackageJsonMain = 'packageJson___main',
  PackageJsonAuthor = 'packageJson___author',
  PackageJsonLicense = 'packageJson___license',
  PackageJsonDependencies = 'packageJson___dependencies',
  PackageJsonDependenciesName = 'packageJson___dependencies___name',
  PackageJsonDependenciesVersion = 'packageJson___dependencies___version',
  PackageJsonDevDependencies = 'packageJson___devDependencies',
  PackageJsonDevDependenciesName = 'packageJson___devDependencies___name',
  PackageJsonDevDependenciesVersion = 'packageJson___devDependencies___version',
  PackageJsonPeerDependencies = 'packageJson___peerDependencies',
  PackageJsonPeerDependenciesName = 'packageJson___peerDependencies___name',
  PackageJsonPeerDependenciesVersion = 'packageJson___peerDependencies___version',
  PackageJsonKeywords = 'packageJson___keywords'
}

export type SitePluginFilterInput = {
  id?: Maybe<StringQueryOperatorInput>,
  parent?: Maybe<NodeFilterInput>,
  children?: Maybe<NodeFilterListInput>,
  internal?: Maybe<InternalFilterInput>,
  resolve?: Maybe<StringQueryOperatorInput>,
  name?: Maybe<StringQueryOperatorInput>,
  version?: Maybe<StringQueryOperatorInput>,
  pluginOptions?: Maybe<SitePluginPluginOptionsFilterInput>,
  nodeAPIs?: Maybe<StringQueryOperatorInput>,
  browserAPIs?: Maybe<StringQueryOperatorInput>,
  ssrAPIs?: Maybe<StringQueryOperatorInput>,
  pluginFilepath?: Maybe<StringQueryOperatorInput>,
  packageJson?: Maybe<SitePluginPackageJsonFilterInput>,
};

export type SitePluginGroupConnection = {
   __typename?: 'SitePluginGroupConnection',
  totalCount: Scalars['Int'],
  edges: Array<SitePluginEdge>,
  nodes: Array<SitePlugin>,
  pageInfo: PageInfo,
  field: Scalars['String'],
  fieldValue?: Maybe<Scalars['String']>,
};

export type SitePluginPackageJson = {
   __typename?: 'SitePluginPackageJson',
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['String']>,
  main?: Maybe<Scalars['String']>,
  author?: Maybe<Scalars['String']>,
  license?: Maybe<Scalars['String']>,
  dependencies?: Maybe<Array<Maybe<SitePluginPackageJsonDependencies>>>,
  devDependencies?: Maybe<Array<Maybe<SitePluginPackageJsonDevDependencies>>>,
  peerDependencies?: Maybe<Array<Maybe<SitePluginPackageJsonPeerDependencies>>>,
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>,
};

export type SitePluginPackageJsonDependencies = {
   __typename?: 'SitePluginPackageJsonDependencies',
  name?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['String']>,
};

export type SitePluginPackageJsonDependenciesFilterInput = {
  name?: Maybe<StringQueryOperatorInput>,
  version?: Maybe<StringQueryOperatorInput>,
};

export type SitePluginPackageJsonDependenciesFilterListInput = {
  elemMatch?: Maybe<SitePluginPackageJsonDependenciesFilterInput>,
};

export type SitePluginPackageJsonDevDependencies = {
   __typename?: 'SitePluginPackageJsonDevDependencies',
  name?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['String']>,
};

export type SitePluginPackageJsonDevDependenciesFilterInput = {
  name?: Maybe<StringQueryOperatorInput>,
  version?: Maybe<StringQueryOperatorInput>,
};

export type SitePluginPackageJsonDevDependenciesFilterListInput = {
  elemMatch?: Maybe<SitePluginPackageJsonDevDependenciesFilterInput>,
};

export type SitePluginPackageJsonFilterInput = {
  name?: Maybe<StringQueryOperatorInput>,
  description?: Maybe<StringQueryOperatorInput>,
  version?: Maybe<StringQueryOperatorInput>,
  main?: Maybe<StringQueryOperatorInput>,
  author?: Maybe<StringQueryOperatorInput>,
  license?: Maybe<StringQueryOperatorInput>,
  dependencies?: Maybe<SitePluginPackageJsonDependenciesFilterListInput>,
  devDependencies?: Maybe<SitePluginPackageJsonDevDependenciesFilterListInput>,
  peerDependencies?: Maybe<SitePluginPackageJsonPeerDependenciesFilterListInput>,
  keywords?: Maybe<StringQueryOperatorInput>,
};

export type SitePluginPackageJsonPeerDependencies = {
   __typename?: 'SitePluginPackageJsonPeerDependencies',
  name?: Maybe<Scalars['String']>,
  version?: Maybe<Scalars['String']>,
};

export type SitePluginPackageJsonPeerDependenciesFilterInput = {
  name?: Maybe<StringQueryOperatorInput>,
  version?: Maybe<StringQueryOperatorInput>,
};

export type SitePluginPackageJsonPeerDependenciesFilterListInput = {
  elemMatch?: Maybe<SitePluginPackageJsonPeerDependenciesFilterInput>,
};

export type SitePluginPluginOptions = {
   __typename?: 'SitePluginPluginOptions',
  name?: Maybe<Scalars['String']>,
  path?: Maybe<Scalars['String']>,
  projectId?: Maybe<Scalars['String']>,
  dataset?: Maybe<Scalars['String']>,
  watchMode?: Maybe<Scalars['Boolean']>,
  overlayDrafts?: Maybe<Scalars['Boolean']>,
  short_name?: Maybe<Scalars['String']>,
  start_url?: Maybe<Scalars['String']>,
  background_color?: Maybe<Scalars['String']>,
  theme_color?: Maybe<Scalars['String']>,
  display?: Maybe<Scalars['String']>,
  icon?: Maybe<Scalars['String']>,
  pathCheck?: Maybe<Scalars['Boolean']>,
};

export type SitePluginPluginOptionsFilterInput = {
  name?: Maybe<StringQueryOperatorInput>,
  path?: Maybe<StringQueryOperatorInput>,
  projectId?: Maybe<StringQueryOperatorInput>,
  dataset?: Maybe<StringQueryOperatorInput>,
  watchMode?: Maybe<BooleanQueryOperatorInput>,
  overlayDrafts?: Maybe<BooleanQueryOperatorInput>,
  short_name?: Maybe<StringQueryOperatorInput>,
  start_url?: Maybe<StringQueryOperatorInput>,
  background_color?: Maybe<StringQueryOperatorInput>,
  theme_color?: Maybe<StringQueryOperatorInput>,
  display?: Maybe<StringQueryOperatorInput>,
  icon?: Maybe<StringQueryOperatorInput>,
  pathCheck?: Maybe<BooleanQueryOperatorInput>,
};

export type SitePluginSortInput = {
  fields?: Maybe<Array<Maybe<SitePluginFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export type SiteSiteMetadata = {
   __typename?: 'SiteSiteMetadata',
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  author?: Maybe<Scalars['String']>,
};

export type SiteSiteMetadataFilterInput = {
  title?: Maybe<StringQueryOperatorInput>,
  description?: Maybe<StringQueryOperatorInput>,
  author?: Maybe<StringQueryOperatorInput>,
};

export type SiteSortInput = {
  fields?: Maybe<Array<Maybe<SiteFieldsEnum>>>,
  order?: Maybe<Array<Maybe<SortOrderEnum>>>,
};

export enum SortOrderEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringQueryOperatorInput = {
  eq?: Maybe<Scalars['String']>,
  ne?: Maybe<Scalars['String']>,
  in?: Maybe<Array<Maybe<Scalars['String']>>>,
  nin?: Maybe<Array<Maybe<Scalars['String']>>>,
  regex?: Maybe<Scalars['String']>,
  glob?: Maybe<Scalars['String']>,
};

export type GatsbySanityImageFixedFragment = (
  { __typename?: 'SanityImageFixed' }
  & Pick<SanityImageFixed, 'base64' | 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>
);

export type GatsbySanityImageFixed_NoBase64Fragment = (
  { __typename?: 'SanityImageFixed' }
  & Pick<SanityImageFixed, 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>
);

export type GatsbySanityImageFixed_WithWebpFragment = (
  { __typename?: 'SanityImageFixed' }
  & Pick<SanityImageFixed, 'base64' | 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>
);

export type GatsbySanityImageFixed_WithWebp_NoBase64Fragment = (
  { __typename?: 'SanityImageFixed' }
  & Pick<SanityImageFixed, 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>
);

export type GatsbySanityImageFluidFragment = (
  { __typename?: 'SanityImageFluid' }
  & Pick<SanityImageFluid, 'base64' | 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>
);

export type GatsbySanityImageFluid_NoBase64Fragment = (
  { __typename?: 'SanityImageFluid' }
  & Pick<SanityImageFluid, 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>
);

export type GatsbySanityImageFluid_WithWebpFragment = (
  { __typename?: 'SanityImageFluid' }
  & Pick<SanityImageFluid, 'base64' | 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>
);

export type GatsbySanityImageFluid_WithWebp_NoBase64Fragment = (
  { __typename?: 'SanityImageFluid' }
  & Pick<SanityImageFluid, 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>
);

export type GatsbyImageSharpFixedFragment = (
  { __typename?: 'ImageSharpFixed' }
  & Pick<ImageSharpFixed, 'base64' | 'width' | 'height' | 'src' | 'srcSet'>
);

export type GatsbyImageSharpFixed_TracedSvgFragment = (
  { __typename?: 'ImageSharpFixed' }
  & Pick<ImageSharpFixed, 'tracedSVG' | 'width' | 'height' | 'src' | 'srcSet'>
);

export type GatsbyImageSharpFixed_WithWebpFragment = (
  { __typename?: 'ImageSharpFixed' }
  & Pick<ImageSharpFixed, 'base64' | 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>
);

export type GatsbyImageSharpFixed_WithWebp_TracedSvgFragment = (
  { __typename?: 'ImageSharpFixed' }
  & Pick<ImageSharpFixed, 'tracedSVG' | 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>
);

export type GatsbyImageSharpFixed_NoBase64Fragment = (
  { __typename?: 'ImageSharpFixed' }
  & Pick<ImageSharpFixed, 'width' | 'height' | 'src' | 'srcSet'>
);

export type GatsbyImageSharpFixed_WithWebp_NoBase64Fragment = (
  { __typename?: 'ImageSharpFixed' }
  & Pick<ImageSharpFixed, 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>
);

export type GatsbyImageSharpFluidFragment = (
  { __typename?: 'ImageSharpFluid' }
  & Pick<ImageSharpFluid, 'base64' | 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>
);

export type GatsbyImageSharpFluid_TracedSvgFragment = (
  { __typename?: 'ImageSharpFluid' }
  & Pick<ImageSharpFluid, 'tracedSVG' | 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>
);

export type GatsbyImageSharpFluid_WithWebpFragment = (
  { __typename?: 'ImageSharpFluid' }
  & Pick<ImageSharpFluid, 'base64' | 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>
);

export type GatsbyImageSharpFluid_WithWebp_TracedSvgFragment = (
  { __typename?: 'ImageSharpFluid' }
  & Pick<ImageSharpFluid, 'tracedSVG' | 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>
);

export type GatsbyImageSharpFluid_NoBase64Fragment = (
  { __typename?: 'ImageSharpFluid' }
  & Pick<ImageSharpFluid, 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>
);

export type GatsbyImageSharpFluid_WithWebp_NoBase64Fragment = (
  { __typename?: 'ImageSharpFluid' }
  & Pick<ImageSharpFluid, 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>
);

export type GatsbyImageSharpResolutionsFragment = (
  { __typename?: 'ImageSharpResolutions' }
  & Pick<ImageSharpResolutions, 'base64' | 'width' | 'height' | 'src' | 'srcSet'>
);

export type GatsbyImageSharpResolutions_TracedSvgFragment = (
  { __typename?: 'ImageSharpResolutions' }
  & Pick<ImageSharpResolutions, 'tracedSVG' | 'width' | 'height' | 'src' | 'srcSet'>
);

export type GatsbyImageSharpResolutions_WithWebpFragment = (
  { __typename?: 'ImageSharpResolutions' }
  & Pick<ImageSharpResolutions, 'base64' | 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>
);

export type GatsbyImageSharpResolutions_WithWebp_TracedSvgFragment = (
  { __typename?: 'ImageSharpResolutions' }
  & Pick<ImageSharpResolutions, 'tracedSVG' | 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>
);

export type GatsbyImageSharpResolutions_NoBase64Fragment = (
  { __typename?: 'ImageSharpResolutions' }
  & Pick<ImageSharpResolutions, 'width' | 'height' | 'src' | 'srcSet'>
);

export type GatsbyImageSharpResolutions_WithWebp_NoBase64Fragment = (
  { __typename?: 'ImageSharpResolutions' }
  & Pick<ImageSharpResolutions, 'width' | 'height' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp'>
);

export type GatsbyImageSharpSizesFragment = (
  { __typename?: 'ImageSharpSizes' }
  & Pick<ImageSharpSizes, 'base64' | 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>
);

export type GatsbyImageSharpSizes_TracedSvgFragment = (
  { __typename?: 'ImageSharpSizes' }
  & Pick<ImageSharpSizes, 'tracedSVG' | 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>
);

export type GatsbyImageSharpSizes_WithWebpFragment = (
  { __typename?: 'ImageSharpSizes' }
  & Pick<ImageSharpSizes, 'base64' | 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>
);

export type GatsbyImageSharpSizes_WithWebp_TracedSvgFragment = (
  { __typename?: 'ImageSharpSizes' }
  & Pick<ImageSharpSizes, 'tracedSVG' | 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>
);

export type GatsbyImageSharpSizes_NoBase64Fragment = (
  { __typename?: 'ImageSharpSizes' }
  & Pick<ImageSharpSizes, 'aspectRatio' | 'src' | 'srcSet' | 'sizes'>
);

export type GatsbyImageSharpSizes_WithWebp_NoBase64Fragment = (
  { __typename?: 'ImageSharpSizes' }
  & Pick<ImageSharpSizes, 'aspectRatio' | 'src' | 'srcSet' | 'srcWebp' | 'srcSetWebp' | 'sizes'>
);

export type PagesQueryQueryVariables = {};


export type PagesQueryQuery = (
  { __typename?: 'Query' }
  & { allSitePage: (
    { __typename?: 'SitePageConnection' }
    & { nodes: Array<(
      { __typename?: 'SitePage' }
      & Pick<SitePage, 'path'>
    )> }
  ) }
);

export type Unnamed_1_QueryVariables = {};


export type Unnamed_1_Query = (
  { __typename?: 'Query' }
  & { allSanityMainPage: (
    { __typename?: 'SanityMainPageConnection' }
    & { nodes: Array<(
      { __typename?: 'SanityMainPage' }
      & Pick<SanityMainPage, 'id'>
      & { slug: Maybe<(
        { __typename?: 'SanitySlug' }
        & Pick<SanitySlug, 'current'>
      )>, title: Maybe<(
        { __typename?: 'SanityLocaleString' }
        & LocaleStringFragmentFragment
      )> }
    )> }
  ) }
);

export type Unnamed_2_QueryVariables = {};


export type Unnamed_2_Query = (
  { __typename?: 'Query' }
  & { placeholderImage: Maybe<(
    { __typename?: 'File' }
    & { childImageSharp: Maybe<(
      { __typename?: 'ImageSharp' }
      & { fluid: Maybe<(
        { __typename?: 'ImageSharpFluid' }
        & GatsbyImageSharpFluidFragment
      )> }
    )> }
  )> }
);

export type Unnamed_3_QueryVariables = {};


export type Unnamed_3_Query = (
  { __typename?: 'Query' }
  & { site: Maybe<(
    { __typename?: 'Site' }
    & { siteMetadata: Maybe<(
      { __typename?: 'SiteSiteMetadata' }
      & Pick<SiteSiteMetadata, 'title' | 'description' | 'author'>
    )> }
  )> }
);

export type Unnamed_4_QueryVariables = {};


export type Unnamed_4_Query = (
  { __typename?: 'Query' }
  & { allSanityCity: (
    { __typename?: 'SanityCityConnection' }
    & AllCitiesFragmentFragment
  ) }
);

export type LocaleStringFragmentFragment = (
  { __typename?: 'SanityLocaleString' }
  & Pick<SanityLocaleString, '_type' | 'en' | 'nl'>
);

export type AllCitiesFragmentFragment = (
  { __typename?: 'SanityCityConnection' }
  & { cities: Array<(
    { __typename?: 'SanityCity' }
    & { slug: Maybe<(
      { __typename?: 'SanitySlug' }
      & Pick<SanitySlug, 'current'>
    )>, name: Maybe<(
      { __typename?: 'SanityLocaleString' }
      & LocaleStringFragmentFragment
    )> }
  )> }
);

export type SubpagesFragmentFragment = (
  { __typename?: 'SanityCity' }
  & { subpages: Maybe<Array<Maybe<(
    { __typename?: 'SanityLocationSubpage' }
    & { template: Maybe<(
      { __typename?: 'SanityTemplate' }
      & { title: Maybe<(
        { __typename?: 'SanityLocaleString' }
        & LocaleStringFragmentFragment
      )>, slug: Maybe<(
        { __typename?: 'SanitySlug' }
        & Pick<SanitySlug, 'current'>
      )> }
    )>, layout: Maybe<{ __typename?: 'SanityGallery' } | (
      { __typename?: 'SanityHangout' }
      & Pick<SanityHangout, '_type' | '_id'>
      & { title: Maybe<(
        { __typename?: 'SanityLocaleString' }
        & LocaleStringFragmentFragment
      )> }
    ) | (
      { __typename?: 'SanityHub' }
      & Pick<SanityHub, '_type' | '_id'>
      & { title: Maybe<(
        { __typename?: 'SanityLocaleString' }
        & LocaleStringFragmentFragment
      )> }
    )> }
  )>>> }
);

export type IndexQueryQueryVariables = {};


export type IndexQueryQuery = (
  { __typename?: 'Query' }
  & { allSanityCity: (
    { __typename?: 'SanityCityConnection' }
    & AllCitiesFragmentFragment
  ) }
);

export type SingleCityQueryVariables = {
  id: Scalars['String']
};


export type SingleCityQuery = (
  { __typename?: 'Query' }
  & { sanityCity: Maybe<(
    { __typename?: 'SanityCity' }
    & { name: Maybe<(
      { __typename?: 'SanityLocaleString' }
      & LocaleStringFragmentFragment
    )>, slug: Maybe<(
      { __typename?: 'SanitySlug' }
      & Pick<SanitySlug, 'current'>
    )> }
    & SubpagesFragmentFragment
  )> }
);

export type GlobalPageQueryVariables = {
  id: Scalars['String']
};


export type GlobalPageQuery = (
  { __typename?: 'Query' }
  & { page: Maybe<(
    { __typename?: 'SanityMainPage' }
    & { slug: Maybe<(
      { __typename?: 'SanitySlug' }
      & Pick<SanitySlug, 'current'>
    )>, title: Maybe<(
      { __typename?: 'SanityLocaleString' }
      & LocaleStringFragmentFragment
    )>, layout: Maybe<(
      { __typename?: 'SanityGeneral' }
      & { title: Maybe<(
        { __typename?: 'SanityLocaleString' }
        & LocaleStringFragmentFragment
      )> }
    )> }
  )> }
);

export type HangoutQueryQueryVariables = {
  id: Scalars['String']
};


export type HangoutQueryQuery = (
  { __typename?: 'Query' }
  & { page: Maybe<(
    { __typename?: 'SanityLocationSubpage' }
    & { template: Maybe<(
      { __typename?: 'SanityTemplate' }
      & { title: Maybe<(
        { __typename?: 'SanityLocaleString' }
        & LocaleStringFragmentFragment
      )> }
    )> }
  )> }
);

export type HubQueryQueryVariables = {
  id: Scalars['String']
};


export type HubQueryQuery = (
  { __typename?: 'Query' }
  & { page: Maybe<(
    { __typename?: 'SanityLocationSubpage' }
    & { template: Maybe<(
      { __typename?: 'SanityTemplate' }
      & { title: Maybe<(
        { __typename?: 'SanityLocaleString' }
        & LocaleStringFragmentFragment
      )> }
    )> }
  )> }
);
