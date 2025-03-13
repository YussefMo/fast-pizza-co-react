import { getMenu } from "../services/apiRestaurant";

export async function useGetMenu() {
    const menu = await getMenu()
    return menu;
}