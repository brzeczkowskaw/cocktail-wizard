import { Unsubscribe, UserMetadata } from "firebase/auth";

export interface AuthorisationState {
  user: User | null;
  loginMessageError: string | null;
}

export interface User {
  auth: any;
  displayName: string | null;
  email: string;
  emailVerified?: Boolean;
  isAnonymous: Boolean;
  metadata: UserMetadata;
  phoneNumber: number | null;
  photoURL: string | null;
  providerData: {
    displayName: string | null;
    email: string;
    proneNumber: number | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
  };
  providerId: string;
  refreshToken: string;
  tenantId: string | null;
  uid: string;
}

export interface CocktailsState {
  cocktails: Cocktail[];
  isLoadingCocktails: boolean;
  cocktail: Cocktail | null;
  tagsInfo: TagsInfo;
}

export interface Cocktail {
  dateModified?: string;
  idDrink: string;
  strAlcoholic?: string;
  strCategory?: string;
  strCreativeCommonsConfirmed?: string;
  strDrink?: string;
  strDrinkAlternate?: string | null;
  strDrinkThumb?: string | null;
  strGlass?: string;
  strIBA?: string | null;
  strImageAttribution?: string | null;
  strImageSource?: string | null;
  strIngredient1?: string | null;
  strIngredient2?: string | null;
  strIngredient3?: string | null;
  strIngredient4?: string | null;
  strIngredient5?: string | null;
  strIngredient6?: string | null;
  strIngredient7?: string | null;
  strIngredient8?: string | null;
  strIngredient9?: string | null;
  strIngredient10?: string | null;
  strIngredient11?: string | null;
  strIngredient12?: string | null;
  strIngredient13?: string | null;
  strIngredient14?: string | null;
  strIngredient15?: string | null;
  strInstructions: string | null;
  strMeasure1?: string | null;
  strMeasure2?: string | null;
  strMeasure3?: string | null;
  strMeasure4?: string | null;
  strMeasure5?: string | null;
  strMeasure6?: string | null;
  strMeasure7?: string | null;
  strMeasure8?: string | null;
  strMeasure9?: string | null;
  strMeasure10?: string | null;
  strMeasure11?: string | null;
  strMeasure12?: string | null;
  strMeasure13?: string | null;
  strMeasure14?: string | null;
  strMeasure15?: string | null;
  strTags?: string | null;
  strVideo?: string | null;
}

export interface TagsInfo {
  categories: any;
  glasses: any;
  ingredients: any;
  alcoholicFilters: any;
}

export interface BarState {
  favourites: Cocktail[] | null;
  alcoholes: string[] | null;
  unsubscribeMethod: Unsubscribe | null;
}
