import axios from "axios";
import { Chat, Item, Member, LabeledHistory, History } from "types";

export class Backend {
  private static readonly BASE = "./backend/";

  public static async addItem(
    itemId: string,
    sellingPrice: number,
    costPrice: number,
    grouping: string
  ) {
    const endpoint = "item/add";
    const data = {
      name: itemId,
      sellingprice: sellingPrice,
      costprice: costPrice,
      grouping: grouping,
    };

    // TODO responseによる成否判定
    return await axios
      .post(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }

  public static async getItemList(): Promise<Item[] | null> {
    const endpoint = "item";

    return await axios
      .get(Backend.BASE + endpoint)
      .then((res) => res.data)
      .catch(() => null);
  }

  public static async setItemActivity(id: string, activity: boolean) {
    const endpoint = "item/setactivity";
    const data = {
      id,
      activity,
    };

    // TODO 成否判定
    return await axios
      .post(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }

  public static async deleteItem(id: string) {
    const endpoint = "item/delete";
    const data = {
      name: id,
    };

    // TODO 成否判定
    return await axios
      .post(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }

  public static async getMemberList(): Promise<Member[] | null> {
    const endpoint = "member";

    return await axios
      .get(Backend.BASE + endpoint)
      .then((res) => res.data)
      .catch(() => null);
  }

  public static async addMember(
    userId: string,
    displayName: string,
    attribute: string
  ) {
    const endpoint = "member/add";
    const data = {
      name: userId,
      displayName,
      attribute,
    };

    // TODO 成否判定
    return await axios
      .post(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }

  public static async setMemberActivity(name: string, activity: boolean) {
    const endpoint = "member/setactivity";
    const data = {
      name,
      activity,
    };

    // TODO 成否判定
    return await axios
      .post(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }

  public static async deleteMember(id: string) {
    const endpoint = "member/delete";
    const data = {
      name: id,
    };

    // TODO 成否判定
    return await axios
      .post(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }

  public static async deleteChat(id: number) {
    const endpoint = "chat/delete";
    const data = {
      params: {
        id,
      },
    };

    // TODO 成否判定
    return await axios
      .get(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }

  public static async getMessageList(): Promise<Chat[] | null> {
    const endpoint = "chat";

    return await axios
      .get(Backend.BASE + endpoint)
      .then((res) => res.data)
      .catch(() => null);
  }

  public static async addMessage(message: string) {
    const endpoint = "chat/add";
    const data = {
      params: {
        message,
      },
    };

    return await axios
      .get(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }

  public static async getHistoryEachMonth(): Promise<LabeledHistory | null> {
    const endpoint = "history/eachmonth";

    return await axios
      .get(Backend.BASE + endpoint)
      .then((res) => res.data)
      .catch(() => null);
  }

  public static async getUserHistory(id: string): Promise<History[] | null> {
    const endpoint = "history";
    const data = {
      params: {
        name: id,
      },
    };

    return await axios
      .get(Backend.BASE + endpoint, data)
      .then((res) => res.data)
      .catch(null);
  }

  public static async recall(history: History) {
    const endpoint = "recall";
    const data = {
      params: {
        name: history.name,
        item: history.item,
        id: history.id,
        price: history.price,
      },
    };

    return await axios
      .get(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }

  public static async purchase(userId: string, itemName: string) {
    const endpoint = "purchase";
    const data = {
      name: userId,
      item: itemName,
    };

    return await axios
      .post(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }

  public static async setMemberImage(userId: string, image: File) {
    const endpoint = "member/image";
    const data = new FormData();
    data.append("userId", userId);
    data.append("image", image);

    return await axios
      .put(Backend.BASE + endpoint, data)
      .then(() => true)
      .catch(() => false);
  }
}
