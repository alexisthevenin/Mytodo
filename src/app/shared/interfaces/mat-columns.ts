export interface MatColumns {
    /**
     * @var String title Titre de la colonne dans le tableau
     */
    title: String;

    /**
     * @var always Boolean Détermine si la colonne doit toujour être affichée
     */
    always: Boolean;

    /**
     * @var value String : valeur utilisée dans la liste des colonnes à afficher
     */
    value: String;

    /**
     * @var isDisplayed Boolean Vrai si la colonne est affichée
     */
    isDisplayed: Boolean;
}
