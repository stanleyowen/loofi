export interface Properties {
    action: number;
    activeTab: string;
    history: [string];
}

export interface Song {
    playing: boolean;
    title: string;
    author: string;
    image: string;
    audio: HTMLAudioElement;
}

export interface AppInterface {
    properties: Properties;
    handleChange: any;
}

export interface BaseLayout {
    song: Song;
}
