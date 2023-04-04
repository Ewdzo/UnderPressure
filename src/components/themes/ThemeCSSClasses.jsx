class ThemeCSSClasses {
    constructor(themeName) {
        this.profileContainer = themeName + "-theme-profile-container";
        this.profileContainerImages = themeName + "-theme-profile-container-image";
        this.profilePicture = themeName + "-theme-profile-container-image";
        this.swallButton = "swal-button-" + themeName;
        this.promptButton = "prompt-button-" + themeName;
        this.difficultySelector = "difficulty-selector-" + themeName;
        this.difficultySelected = "difficulty-selected-" + themeName;
    }
}

export const blueThemeClasses = new ThemeCSSClasses("blue");

export const purpleThemeClasses = new ThemeCSSClasses("purple");