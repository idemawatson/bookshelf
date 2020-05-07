import Component from "@/App.vue";
import Header from "@/components/header";
import { mountFunction, mountFunctionWithRouter } from "../utils/mountFunction";

let wrapper;

afterEach(() => {
  wrapper.destroy();
});

describe("HeaderとDrawerの表示", () => {
  it("headerとdrawerが表示される", () => {
    const $route = { path: "/" };
    wrapper = mountFunction(Component, {
      mocks: {
        $route
      },
      stubs: ["router-link", "router-view"]
    }, false);
    expect(wrapper.vm.$route.path).toBe($route.path);
    expect(wrapper.contains(Header)).toBe(true);
    expect(wrapper.contains(".v-navigation-drawer")).toBe(true);
    const listItems = wrapper.findAll(".v-navigation-drawer router-link-stub");
    expect(listItems.length).toEqual(4);
    expect(listItems.wrappers[0].html()).toMatch(/本棚/);
    expect(listItems.wrappers[1].html()).toMatch(/書籍検索/);
    expect(listItems.wrappers[2].html()).toMatch(/プロフィール/);
    expect(listItems.wrappers[3].html()).toMatch(/フレンド/);
  });

  it("指定されたpathの場合headerとdrawerが表示されない", () => {
    const $route = { path: "/login" };
    wrapper = mountFunction(Component, {
      mocks: {
        $route
      },
      stubs: ["router-link", "router-view"]
    });
    expect(wrapper.vm.$route.path).toBe($route.path);
    expect(wrapper.contains(Header)).toBe(false);
    expect(wrapper.contains("v-navigation-drawer-stub")).toBe(false);
  });
});

describe("Drawerのイベント", () => {
  it("chevronクリック時メニューが閉じる", () => {
    wrapper = mountFunctionWithRouter(Component, {}, false);
    wrapper.setData({ drawer: true });
    expect(wrapper.vm.drawer).toBe(true);
    expect(wrapper.contains(".v-navigation-drawer")).toBe(true);
    const button = wrapper.find("button[name='chevron']");
    button.trigger("click");
    expect(wrapper.vm.drawer).toBe(false);
  });
  it("アイテムクリック時メニューが閉じページが遷移する", () => {
    wrapper = mountFunctionWithRouter(Component, {}, false);
    wrapper.setData({ drawer: true });
    expect(wrapper.vm.drawer).toBe(true);
    wrapper.find("a[name='mdi-home']").trigger("click");
    expect(wrapper.vm.drawer).toBe(false);
    expect(wrapper.vm.$route.path).toEqual("/home");

    wrapper.setData({ drawer: true });
    expect(wrapper.vm.drawer).toBe(true);
    wrapper.find("a[name='mdi-magnify']").trigger("click");
    expect(wrapper.vm.drawer).toBe(false);
    expect(wrapper.vm.$route.path).toEqual("/search");

    wrapper.setData({ drawer: true });
    expect(wrapper.vm.drawer).toBe(true);
    wrapper.find("a[name='mdi-account']").trigger("click");
    expect(wrapper.vm.drawer).toBe(false);
    expect(wrapper.vm.$route.path).toEqual("/user");
  });
});
