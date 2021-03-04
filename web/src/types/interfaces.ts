export interface Project {
  title: string
}

export interface ProjectPreview {
  title: string
}

export interface tProject {
  node: {
    _id: string;
    _type: 'project';
    location: {
      lat: number;
      lng: number;
    }
    video: {
      asset: {
        url: string;
      }
    }
  }
}
export interface tThreeObject {
  object: {
    uuid: string;
  }
  position: any;
}
