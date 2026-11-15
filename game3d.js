import * as THREE from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
import { clone as cloneSkinned } from "three/addons/utils/SkeletonUtils.js";

const ASSET = (path) => `./Assets/${path}`;

const textureAliases = new Map([
  ["hnjdb4yp.jpg", "MainCharacterModel/hnjdb4yp.jpg"],
  ["Asian_Woman_Base_Shape_Clean_Low_poly_v2_1000_0007.jpg", "MainCharacterModel/Asian_Woman_Base_Shape_Clean_Low_poly_v2_1000_0007.jpg"],
  ["20231205_Ucs1K6DbF5.jpeg", "Clothes Model/Clothes Material/20231205_Ucs1K6DbF5.jpeg"],
  ["vn-11134207-7qukw-lk8aghei0xbo2b.jpg", "Clothes Model/Clothes Material/vn-11134207-7qukw-lk8aghei0xbo2b.jpg"],
  ["vn-11134207-7ras8-mceizbf5jef0a7.png", "Clothes Model/Clothes Material/vn-11134207-7ras8-mceizbf5jef0a7.png"],
  ["6640f7c3679b6e584f7ee914-yezmo-toe-shoe-charms-3d-big-toe-shoe.jpg", "Clothes Model/Clothes Material/6640f7c3679b6e584f7ee914-yezmo-toe-shoe-charms-3d-big-toe-shoe.jpg"],
  ["pngtree-pair-of-vintage-brown-cowboy-boots-with-a-worn-look-png-image_14813052.png", "Clothes Model/Clothes Material/pngtree-pair-of-vintage-brown-cowboy-boots-with-a-worn-look-png-image_14813052.png"],
  ["shopee-2000-x-2500-px-33.jpg", "Clothes Model/Clothes Material/shopee-2000-x-2500-px-33.jpg"],
  ["O1CN014NIiF02Bx5MgFBylZ_134348404-2.jpg", "Clothes Model/Clothes Material/O1CN014NIiF02Bx5MgFBylZ_134348404-2.jpg"],
  ["Pfhytec-LU-Bowknot-Ballet-Flats-Womens-Pointy-Toe-Flat-Shoes-Suede-Dress-Shoes-Wear-to-Work-Slip-On-.png", "Clothes Model/Clothes Material/Pfhytec-LU-Bowknot-Ballet-Flats-Womens-Pointy-Toe-Flat-Shoes-Suede-Dress-Shoes-Wear-to-Work-Slip-On-.png"],
  ["1249be91-9756-4a0d-97b4-cf65a115ad19.png", "Clothes Model/Clothes Material/1249be91-9756-4a0d-97b4-cf65a115ad19.png"],
  ["c52edfc33f24d6d372b5fd592f0a9abb.jpg", "Clothes Model/Clothes Material/c52edfc33f24d6d372b5fd592f0a9abb.jpg"],
  ["8936053054290.jpg.png", "Clothes Model/Clothes Material/8936053054290.jpg.png"],
  ["3841870d22afd83f3fb340055e9b96e4_6d2f6c844033421b9402d184dbde4432_master.jpg", "Clothes Model/Clothes Material/3841870d22afd83f3fb340055e9b96e4_6d2f6c844033421b9402d184dbde4432_master.jpg"],
  ["6148O7PbJWL._UY1100_.jpg", "Clothes Model/Clothes Material/6148O7PbJWL._UY1100_.jpg"],
  ["https-__www.luxity.vn_products_dep-nam-burberry-vintage-camel-80569422_17d85d51e6e44a858b39afa57dd89346_master.jpeg", "Clothes Model/Clothes Material/https-__www.luxity.vn_products_dep-nam-burberry-vintage-camel-80569422_17d85d51e6e44a858b39afa57dd89346_master.jpeg"],
  ["S3d97033a71a24d61b30794a62239b266d.png", "Clothes Model/Clothes Material/S3d97033a71a24d61b30794a62239b266d.png"],
  ["IMG_1150-scaled.jpg", "Clothes Model/Clothes Material/IMG_1150-scaled.jpg"],
  ["ao-bodysuit-khong-tay-co-lo-hong-u2l76_3df2aabedada4268a7330f7a7465df84_master.png", "Clothes Model/Clothes Material/ao-bodysuit-khong-tay-co-lo-hong-u2l76_3df2aabedada4268a7330f7a7465df84_master.png"],
  ["p-Galaxy-1.jpg", "Clothes Model/Clothes Material/Thiết-kế-và-in-áo-lớp-Galaxy-1.jpg"],
  ["c.png", "Clothes Model/Clothes Material/Thiết-kế-và-in-áo-lớp-Galaxy-1.jpg"],
  ["Thiết-kế-và-in-áo-lớp-Galaxy-1.jpg", "Clothes Model/Clothes Material/Thiết-kế-và-in-áo-lớp-Galaxy-1.jpg"],
  ["Bơ Bơ Rỳ - Trước.png", "Clothes Model/Bơ Bơ Rỳ - Trước.png"],
  ["Sau.png", "MainCharacterModel/Bơ Bơ Rỳ - Sau.png"],
  ["Quần Chuối - Sau.png", "MainCharacterModel/Quần Chuối - Sau.png"],
  ["chan_vay_nhung_2_18c352c1d5284bde91f8cc79769a76dd_7c583d18761b44c39198f5af65774c7e.jpg", "Clothes Model/Clothes Material/chan_vay_nhung_2_18c352c1d5284bde91f8cc79769a76dd_7c583d18761b44c39198f5af65774c7e.jpg"],
  ["chan-vay-xoe-dang-midi-mau-trang-cv07-31.png", "Clothes Model/Clothes Material/chan-vay-xoe-dang-midi-mau-trang-cv07-31.png"],
  ["top-down-view-of-a-pair-of-meindl-lace-up-fabric-and-leather-walking-shoes-isolated-on-a-white-background-from-above-german-manufacturer-2C8FH43.jpg", "Clothes Model/Clothes Material/top-down-view-of-a-pair-of-meindl-lace-up-fabric-and-leather-walking-shoes-isolated-on-a-white-background-from-above-german-manufacturer-2C8FH43.jpg"],
  ["images.jpg", "Clothes Model/Clothes Material/images.jpg"],
  ["bat-xanh-3.jpg", "Furniture/Materials/bat-xanh-3.jpg"],
  ["batsoc_e3bd3b8b8c0b403193882fe8429070e0.jpg", "Furniture/Materials/batsoc_e3bd3b8b8c0b403193882fe8429070e0.jpg"],
  ["quan-ao-trung-quoc-1.jpg", "Furniture/Materials/quan-ao-trung-quoc-1.jpg"],
  ["ban-phim-cu511_.jpg", "Furniture/Materials/ban-phim-cu511_.jpg"],
  ["d0af6dcf-94b4-443b-85cd-0f488cdde188.jpg", "Furniture/Materials/d0af6dcf-94b4-443b-85cd-0f488cdde188.jpg"],
  ["thanh-ly-ban-ghe-i9.png", "Furniture/Materials/thanh-ly-ban-ghe-i9.png"],
  ["man-hinh-may-tinh-aoc-2.jpg", "Furniture/Materials/man-hinh-may-tinh-aoc-2.jpg"],
  ["kinh-nghiem-chon-mua-case-may-tinh-cu-gia-re-cua-dan-chuyen.jpg", "Furniture/Materials/kinh-nghiem-chon-mua-case-may-tinh-cu-gia-re-cua-dan-chuyen.jpg"],
  ["s-l1200.jpg", "Furniture/Materials/s-l1200.jpg"],
  ["case-may-tinh-cu-main-h510-2.jpg", "Furniture/Materials/case-may-tinh-cu-main-h510-2.jpg"],
  ["2408_0501_leDSC09316.jpg", "Furniture/Materials/2408_0501_leDSC09316.jpg"],
  ["aab73d1b-2bd4-4fe9-872c-179fe2df1d16.jpg", "Furniture/Materials/aab73d1b-2bd4-4fe9-872c-179fe2df1d16.jpg"],
  ["f4bfdaecec8f2f6180c1f57f9f164caa.jpg", "Furniture/Materials/f4bfdaecec8f2f6180c1f57f9f164caa.jpg"],
  ["n1.jpg", "Furniture/Materials/n1.jpg"],
  ["S2c7ca1c52850400cb56189cd9da4f126a.jpg", "Furniture/Materials/S2c7ca1c52850400cb56189cd9da4f126a.jpg"],
  ["f5d42dc6fac2419c18d3-1731496705549475403216.webp", "Furniture/Materials/f5d42dc6fac2419c18d3-1731496705549475403216.webp"],
  ["cho-hoang-hoa-tham-16963100982071651165664.png", "Furniture/Materials/cho-hoang-hoa-tham-16963100982071651165664.png"],
]);

const characterModels = {
  male: "Clothes Model/male.fbx",
  female: "Clothes Model/ClothesNewFemale/Female.fbx",
};

const itemModels = {
  top: {
    "top-check": ["Top1.fbx", "m-top1.fbx"],
    "top-racing": ["Top3.fbx", "m-top2.fbx"],
    "top-plaid": ["Top7.fbx", "m-top3.fbx"],
    "top-black": ["Top6.fbx", "m-top6.fbx"],
    // The Top 7 card is the pink sleeveless piece; use the matching female mesh.
    "top-print": ["Top9.fbx", "m-top7.fbx"],
    "top-cobalt": ["Top4.fbx", "m-top8.fbx"],
    "top-ivory": ["Top2.fbx", "m-top5.fbx"],
  },
  bottom: {
    // Female meshes are matched by their embedded material image, not by
    // the numeric FBX suffix.  The rack cards use the same source images.
    "bottom-banana": ["Bottom3.fbx", "m-bottom1.fbx"],
    "bottom-banana-2": ["Bottom1.fbx", "m-bottom2.fbx"],
    "bottom-cargo": ["Bottom4.fbx", "m-bottom3.fbx"],
    "bottom-floral": ["Bottom8.fbx", "m-bottom4.fbx"],
    "bottom-pants": ["Bottom7.fbx", "m-bottom5.fbx"],
    "bottom-mix": ["Bottom5.fbx", "m-bottom6.fbx"],
    "bottom-army": ["Bottom2.fbx", "m-bottom7.fbx"],
    "bottom-cream": ["Bottom6.fbx", "m-bottom8.fbx"],
  },
  shoes: {
    "shoe-camel": ["Shoes8.fbx", "m-shoes1.fbx"],
    "shoe-mix": ["Shoes6.fbx", "m-shoes2.fbx"],
    "shoe-flats": ["Shoes7.fbx", "m-shoes3.fbx"],
    "shoe-boots": ["Shoes5.fbx", "m-shoes4.fbx"],
    "shoe-color": ["Shoes4.fbx", "m-shoes5.fbx"],
    "shoe-vintage": ["Shoes2.fbx", "m-shoes6.fbx"],
    "shoe-high": ["Shoes3.fbx", "m-shoes8.fbx"],
  },
};

const clothingFolders = {
  female: {
    top: "Clothes Model/ClothesNewFemale/Top/",
    bottom: "Clothes Model/ClothesNewFemale/Bottom/",
    shoes: "Clothes Model/ClothesNewFemale/Shoe/",
  },
  male: {
    top: "Clothes Model/ClothesNewMale/Top/",
    bottom: "Clothes Model/ClothesNewMale/Bottom/",
    shoes: "Clothes Model/ClothesNewMale/Shoe/",
  },
};

const clothingFit = {
  "top-check": { height: 1.34, y: 0.46, z: 0, x: 0 },
  "top-racing": { height: 1.34, y: 0.46, z: 0, x: 0 },
  "top-plaid": { height: 1.12, y: 0.46, z: 0, x: 0 },
  "top-black": { height: 1.28, y: 0.46, z: 0, x: 0 },
  "top-print": { height: 1.30, y: 0.46, z: 0, x: 0 },
  "top-cobalt": { height: 1.42, y: 0.46, z: 0, x: 0 },
  "top-ivory": { height: 1.34, y: 0.46, z: 0, x: 0 },
};

class ThreeShop {
  constructor() {
    this.mount = document.querySelector("#threeViewport");
    this.canvas = document.querySelector("#gameCanvas");
    this.loading = document.querySelector("#threeLoading");
    const manager = new THREE.LoadingManager();
    manager.setURLModifier((url) => {
      const fileName = decodeURIComponent(url).split(/[\\/]/).pop();
      const alias = textureAliases.get(fileName);
      return alias ? encodeURI(ASSET(alias)) : url;
    });
    this.loader = new FBXLoader(manager);
    this.cache = new Map();
    this.wardrobePromises = new Map();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: false });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.clock = new THREE.Clock();
    this.character = null;
    this.characterKind = "male";
    this.outfitGroup = new THREE.Group();
    this.outfitBuildId = 0;
    this.outfitItems = [];
    this.clothingObjects = new Map();
    this.clothingBases = new Map();
    this.aura = null;
    this.auraKey = null;
    this.characterPreviewRenderer = null;
    this.characterPreviewViews = [];
    this.characterPreviewSize = { width: 0, height: 0 };
    this.calibrationPresets = this.readCalibrationPresets();
    this.rotatePointer = null;
    this.preparationPromises = new Map();
    this.mode = "shop";
    this.yaw = 0;
    this.viewYaw = 0;
    this.tryOnFocus = false;
    this.radius = 8.5;
    this.target = new THREE.Vector3(0, 1.25, 0);
    this.actorZ = 2.2;
    this.ready = false;
    this.setupLights();
    this.resize();
    this.mount.addEventListener("pointerdown", (event) => {
      if (![0, 2].includes(event.button) || !this.character) return;
      this.rotatePointer = { pointerId: event.pointerId, lastX: event.clientX };
      this.mount.classList.add("is-orbiting");
      this.mount.setPointerCapture?.(event.pointerId);
      event.preventDefault();
    });
    this.mount.addEventListener("pointermove", (event) => {
      if (!this.rotatePointer || event.pointerId !== this.rotatePointer.pointerId) return;
      const deltaX = event.clientX - this.rotatePointer.lastX;
      this.rotatePointer.lastX = event.clientX;
      this.yaw -= deltaX * 0.014;
      event.preventDefault();
    });
    const stopRotate = (event) => {
      if (!this.rotatePointer || event.pointerId !== this.rotatePointer.pointerId) return;
      this.mount.releasePointerCapture?.(event.pointerId);
      this.rotatePointer = null;
      this.mount.classList.remove("is-orbiting");
    };
    this.mount.addEventListener("pointerup", stopRotate);
    this.mount.addEventListener("pointercancel", stopRotate);
    this.mount.addEventListener("contextmenu", (event) => event.preventDefault());
    window.addEventListener("resize", () => this.resize());
    if (window.ResizeObserver) new ResizeObserver(() => this.resize()).observe(this.mount);
    this.animate();
  }

  setupLights() {
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x242424, 1.8));
    const key = new THREE.DirectionalLight(0xffffff, 3.2);
    key.position.set(5, 9, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    this.scene.add(key);
    this.auraLight = new THREE.PointLight(0xffffff, 0, 7, 2);
    this.auraLight.position.set(0, 1.7, 0.4);
    this.scene.add(this.auraLight);
  }

  async preloadAllModels(paths, phase = "critical") {
    const uniquePaths = [...new Set(paths)];
    let loaded = 0;
    let failed = 0;
    const report = () => window.dispatchEvent(new CustomEvent("three-preload-progress", {
      detail: { loaded, total: uniquePaths.length, failed, phase },
    }));
    report();
    await Promise.all(uniquePaths.map(async (path) => {
      try {
        await this.loadTemplate(path);
      } catch (error) {
        failed += 1;
        console.warn(`3D preload failed: ${path}`, error);
      } finally {
        loaded += 1;
        report();
      }
    }));
  }

  wardrobePathsFor(kind) {
    const folders = clothingFolders[kind];
    if (!folders) return [];
    return Object.entries(itemModels).flatMap(([slot, entries]) =>
      Object.values(entries).map((entry) => `${folders[slot]}${kind === "male" ? entry[1] : entry[0]}`)
    );
  }

  preloadWardrobe(kind) {
    if (this.wardrobePromises.has(kind)) return this.wardrobePromises.get(kind);
    const promise = this.preloadAllModels(this.wardrobePathsFor(kind), "wardrobe").then(() => true);
    this.wardrobePromises.set(kind, promise);
    return promise;
  }

  prepareForGame(kind) {
    kind = "male";
    if (this.preparationPromises.has(kind)) return this.preparationPromises.get(kind);
    const promise = this.loadBundledCalibrationPresets().then(() => Promise.all([
      this.preloadAllModels([
        characterModels[kind],
      ], "game"),
      this.preloadWardrobe(kind),
    ])).then(async () => {
      await this.setCharacter(kind);
      this.ready = true;
      this.loading?.classList.add("is-ready");
      window.dispatchEvent(new CustomEvent("three-ready", { detail: { kind } }));
      return true;
    });
    this.preparationPromises.set(kind, promise);
    return promise;
  }

  async loadBundledCalibrationPresets() {
    if (this.bundledPresetsLoaded) return;
    if (this.calibrationPresetVersion === 7 && Object.keys(this.calibrationPresets).length) {
      this.bundledPresetsLoaded = true;
      return;
    }
    try {
      const response = await fetch("./fit-presets.json", { cache: "no-cache" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (data.version === 7 && data.items && typeof data.items === "object") {
        this.calibrationPresets = { ...this.calibrationPresets, ...data.items };
        localStorage.setItem("thrifting101-fit-presets", JSON.stringify({ version: 7, items: this.calibrationPresets }));
        this.calibrationPresetVersion = 7;
      }
    } catch (error) {
      console.warn("Bundled clothing preset failed to load", error);
    }
    this.bundledPresetsLoaded = true;
  }

  async init() {
    this.loading?.classList.add("is-ready");
    window.dispatchEvent(new CustomEvent("three-ui-ready"));
    void this.loadCharacterPreviews();
    setTimeout(() => {
      void this.preloadAllModels([
        characterModels.male,
      ], "background");
    }, 180);
  }

  async loadCharacterPreviews() {
    const grid = document.querySelector("#characterPreviewGrid");
    const canvas = document.querySelector("#characterPreviewCanvas");
    if (!grid || !canvas) return;
    try {
      const results = await Promise.allSettled([
        this.loadTemplate(characterModels.male),
        this.loadTemplate(characterModels.female),
      ]);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      this.characterPreviewRenderer = renderer;

      for (const [index, gender] of ["male", "female"].entries()) {
        const result = results[index];
        const slot = grid.querySelector(`[data-preview-slot="${gender}"]`);
        if (result.status !== "fulfilled") {
          if (slot) slot.querySelector(".preview-loading").textContent = "MODEL KHÔNG TẢI ĐƯỢC";
          console.warn(`3D character preview failed: ${gender}`, result.reason);
          continue;
        }
        const scene = new THREE.Scene();
        scene.add(new THREE.HemisphereLight(0xffffff, 0x333333, 2));
        const key = new THREE.DirectionalLight(0xffffff, 3.2);
        key.position.set(4, 7, 6);
        scene.add(key);
        const model = this.clone(result.value);
        this.fitHeight(model, 3.55);
        model.position.y -= 1.775;
        if (gender === "female") {
          model.traverse((child) => {
            if (!child.isMesh) return;
            const existing = Array.isArray(child.material) ? child.material : [child.material];
            existing.forEach((material) => material?.dispose());
            const silhouette = () => new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
            child.material = Array.isArray(child.material)
              ? child.material.map(() => silhouette())
              : silhouette();
          });
        }
        scene.add(model);
        const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 100);
        camera.position.set(0, 0, 7.4);
        camera.lookAt(0, 0, 0);
        this.characterPreviewViews.push({ gender, slot, scene, camera, model });
        if (slot) {
          const loadingLabel = slot.querySelector(".preview-loading");
          if (loadingLabel) loadingLabel.hidden = true;
        }
      }
      this.renderCharacterPreviews();
    } catch (error) {
      console.warn("Character selection previews could not be initialized", error);
    }
  }

  renderCharacterPreviews() {
    const renderer = this.characterPreviewRenderer;
    const grid = document.querySelector("#characterPreviewGrid");
    if (!renderer || !grid || !this.characterPreviewViews.length) return;
    const gridRect = grid.getBoundingClientRect();
    if (!gridRect.width || !gridRect.height) return;
    if (this.characterPreviewSize.width !== gridRect.width || this.characterPreviewSize.height !== gridRect.height) {
      renderer.setSize(gridRect.width, gridRect.height, false);
      this.characterPreviewSize = { width: gridRect.width, height: gridRect.height };
    }
    renderer.setScissorTest(true);
    const time = this.clock.elapsedTime;
    for (const view of this.characterPreviewViews) {
      if (!view.slot) continue;
      const rect = view.slot.getBoundingClientRect();
      const left = rect.left - gridRect.left;
      const bottom = gridRect.bottom - rect.bottom;
      const width = rect.width;
      const height = rect.height;
      view.camera.aspect = rect.width / Math.max(1, rect.height);
      view.camera.updateProjectionMatrix();
      view.model.rotation.y = Math.sin(time * 0.45) * (view.gender === "male" ? 0.13 : 0.08);
      renderer.setViewport(left, bottom, width, height);
      renderer.setScissor(left, bottom, width, height);
      renderer.clear(true, true, true);
      renderer.render(view.scene, view.camera);
    }
    renderer.setScissorTest(false);
  }

  loadTemplate(path) {
    const url = ASSET(path);
    if (this.cache.has(url)) return this.cache.get(url);
    const promise = new Promise((resolve, reject) => {
      this.loader.load(encodeURI(url), resolve, undefined, reject);
    });
    this.cache.set(url, promise);
    return promise;
  }

  clone(object) {
    const copy = cloneSkinned(object);
    copy.traverse((child) => {
      if (!child.isMesh) return;
      child.visible = true;
      child.frustumCulled = false;
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) {
        const materialIsArray = Array.isArray(child.material);
        const materials = materialIsArray ? child.material : [child.material];
        const copiedMaterials = materials.map((material) => {
          const copy = material?.clone ? material.clone() : material;
          if (copy) copy.side = THREE.DoubleSide;
          if (copy?.transparent && copy.opacity < 0.05) {
            copy.transparent = false;
            copy.opacity = 1;
          }
          if (copy?.map) copy.map.colorSpace = THREE.SRGBColorSpace;
          return copy;
        });
        child.material = materialIsArray ? copiedMaterials : copiedMaterials[0];
      }
    });
    return copy;
  }

  fitHeight(object, height) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    if (!size.y || !Number.isFinite(size.y)) return object;
    object.scale.multiplyScalar(height / size.y);
    const fitted = new THREE.Box3().setFromObject(object);
    object.position.x -= (fitted.min.x + fitted.max.x) / 2;
    object.position.y -= fitted.min.y;
    object.position.z -= (fitted.min.z + fitted.max.z) / 2;
    return object;
  }

  centerClothingPivot(object) {
    object.updateMatrixWorld(true);
    const parent = object.parent;
    if (!parent) return object;
    parent.updateMatrixWorld(true);
    const worldMatrix = object.matrixWorld.clone();
    const worldCenter = new THREE.Box3().setFromObject(object).getCenter(new THREE.Vector3());
    const pivot = new THREE.Group();
    pivot.name = `${object.name || "Clothing"}_CenteredPivot`;
    pivot.position.copy(parent.worldToLocal(worldCenter));
    parent.remove(object);
    parent.add(pivot);
    pivot.updateMatrixWorld(true);
    pivot.add(object);
    const centeredLocalMatrix = pivot.matrixWorld.clone().invert().multiply(worldMatrix);
    centeredLocalMatrix.decompose(object.position, object.quaternion, object.scale);
    object.matrixAutoUpdate = true;
    object.updateMatrix();
    pivot.updateMatrixWorld(true);
    return pivot;
  }

  bodyRegionBounds(slot, characterBox, characterSize, characterCenter) {
    const ranges = {
      top: [0.37, 0.72],
      bottom: [0.13, 0.47],
      shoes: [0, 0.18],
    };
    const [minRatio, maxRatio] = ranges[slot] || ranges.top;
    const minY = characterBox.min.y + characterSize.y * minRatio;
    const maxY = characterBox.min.y + characterSize.y * maxRatio;
    const centerTolerance = slot === "shoes"
      ? characterSize.x * 0.7
      : slot === "bottom"
        ? characterSize.x * 0.42
        : characterSize.x * 0.28;
    const bounds = new THREE.Box3();
    let sampleCount = 0;

    this.character.traverse((child) => {
      if (!child.isMesh || !child.visible) return;
      const position = child.geometry?.attributes?.position;
      if (!position?.count) return;
      child.updateMatrixWorld(true);
      const stride = Math.max(1, Math.floor(position.count / 2500));
      const vertex = new THREE.Vector3();
      for (let index = 0; index < position.count; index += stride) {
        if (typeof child.getVertexPosition === "function") child.getVertexPosition(index, vertex);
        else vertex.fromBufferAttribute(position, index);
        vertex.applyMatrix4(child.matrixWorld);
        if (vertex.y < minY || vertex.y > maxY) continue;
        if (slot !== "shoes" && Math.abs(vertex.x - characterCenter.x) > centerTolerance) continue;
        bounds.expandByPoint(vertex);
        sampleCount += 1;
      }
    });

    const minimumWidth = characterSize.x * (slot === "top" ? 0.34 : slot === "bottom" ? 0.30 : 0.18);
    const minimumDepth = characterSize.z * (slot === "shoes" ? 0.28 : 0.22);
    if (!sampleCount || bounds.isEmpty()) {
      bounds.min.set(
        characterCenter.x - minimumWidth / 2,
        minY,
        characterCenter.z - minimumDepth / 2,
      );
      bounds.max.set(
        characterCenter.x + minimumWidth / 2,
        maxY,
        characterCenter.z + minimumDepth / 2,
      );
      return bounds;
    }

    const size = bounds.getSize(new THREE.Vector3());
    // Keep the clothing centred on the actual body meshes in this vertical
    // band.  Cvrix's raised arm makes the full-character bounding-box centre
    // a poor anchor for tops and bottoms.
    const bodyCenter = bounds.getCenter(new THREE.Vector3());
    const centerX = bodyCenter.x;
    const centerZ = bodyCenter.z;
    const width = Math.max(size.x, minimumWidth);
    const depth = Math.max(size.z, minimumDepth);
    bounds.min.x = centerX - width / 2;
    bounds.max.x = centerX + width / 2;
    bounds.min.z = centerZ - depth / 2;
    bounds.max.z = centerZ + depth / 2;
    return bounds;
  }

  moveObjectWorld(object, delta) {
    if (!object.parent) return;
    const worldPosition = object.getWorldPosition(new THREE.Vector3()).add(delta);
    object.position.copy(object.parent.worldToLocal(worldPosition));
  }

  autoFitClothing(object, slot, fit, characterBox, characterSize, characterCenter, region) {
    const female = this.characterKind === "female";
    const clearance = slot === "top" ? 0.055 : slot === "bottom" ? 0.045 : 0.025;
    const minScale = female
      ? slot === "top" ? 0.36 : slot === "bottom" ? 0.42 : 0.28
      : slot === "top" ? 0.42 : slot === "bottom" ? 0.42 : 0.42;
    const maxScale = female
      ? slot === "top" ? 0.96 : slot === "bottom" ? 1.02 : 0.80
      : slot === "top" ? 1.8 : slot === "bottom" ? 1.8 : 1.45;
    const targetSize = region.getSize(new THREE.Vector3());
    if (female) {
      // Cvrix is authored in a bent pose; the full body bounds include the
      // raised arm and make tops/ bottoms grow too wide. Fit to the torso and
      // hips instead of the silhouette of the whole pose.
      targetSize.x *= slot === "top" ? 0.44 : slot === "bottom" ? 0.94 : 0.35;
      targetSize.y *= slot === "top" ? 0.90 : slot === "bottom" ? 0.86 : 0.35;
      targetSize.z *= slot === "top" ? 0.64 : slot === "bottom" ? 0.70 : 0.28;
    }

    object.updateMatrixWorld(true);
    let clothingBox = new THREE.Box3().setFromObject(object);
    const clothingSize = clothingBox.getSize(new THREE.Vector3());
    const widthScale = clothingSize.x > 0
      ? (targetSize.x + clearance * 2) / clothingSize.x
      : 1;
    const depthScale = clothingSize.z > 0
      ? (targetSize.z + clearance * 2) / clothingSize.z
      : 1;
    // Fit width and depth independently. This prevents bulky FBX meshes
    // from swallowing the model while still leaving a small anti-clipping gap.
    object.scale.x *= Math.min(maxScale, Math.max(minScale, widthScale));
    object.scale.z *= Math.min(maxScale, Math.max(minScale, depthScale));
    if (female) {
      const verticalMin = slot === "shoes" ? 0.30 : 0.48;
      const verticalMax = slot === "shoes" ? 0.82 : 1.05;
      const heightScale = clothingSize.y > 0 ? targetSize.y / clothingSize.y : 1;
      object.scale.y *= Math.min(verticalMax, Math.max(verticalMin, heightScale));
      if (slot === "shoes") object.scale.multiplyScalar(0.55);
    } else if (slot === "bottom") {
      const heightScale = clothingSize.y > 0 ? targetSize.y / clothingSize.y : 1;
      object.scale.y *= Math.min(1.35, Math.max(0.72, heightScale));
    }

    object.updateMatrixWorld(true);
    clothingBox = new THREE.Box3().setFromObject(object);
    const clothingCenter = clothingBox.getCenter(new THREE.Vector3());
    const regionCenter = region.getCenter(new THREE.Vector3());
    const targetCenter = new THREE.Vector3(
      regionCenter.x + (fit.x || 0),
      0,
      regionCenter.z + (fit.z || 0),
    );
    this.moveObjectWorld(object, new THREE.Vector3(
      targetCenter.x - clothingCenter.x,
      0,
      targetCenter.z - clothingCenter.z,
    ));

    object.updateMatrixWorld(true);
    clothingBox = new THREE.Box3().setFromObject(object);
    const targetBottom = characterBox.min.y + characterSize.y * fit.y;
    this.moveObjectWorld(object, new THREE.Vector3(0, targetBottom - clothingBox.min.y, 0));

    object.updateMatrixWorld(true);
    clothingBox = new THREE.Box3().setFromObject(object);
    const frontGap = region.max.z + clearance - clothingBox.max.z;
    if (frontGap > 0) this.moveObjectWorld(object, new THREE.Vector3(0, 0, frontGap));
  }

  async setCharacter(kind) {
    kind = "male";
    if (!this.ready && this.characterKind === kind && this.character) return;
    if (this.character && this.characterKind === kind) return;
    this.characterKind = kind;
    try {
      const template = await this.loadTemplate(characterModels[kind]);
      if (this.character) this.scene.remove(this.character);
      this.character = this.clone(template);
      this.character.rotation.x = 0;
      this.character.rotation.y = 0;
      this.fitHeight(this.character, 3.65);
      this.character.position.y += -1.36;
      this.character.position.z += this.actorZ;
      this.scene.add(this.character);
      this.character.add(this.auraLight);
      this.auraLight.position.set(0, 1.7, 0.45);
      this.character.add(this.outfitGroup);
      this.outfitGroup.position.set(0, 0, 0);
      this.clearAura();
      this.auraKey = null;
      this.setAuraForTop(this.outfitItems.find((item) => item.id.startsWith("top-")));
      await this.rebuildOutfit();
    } catch (error) {
      console.warn("3D character asset failed", error);
    }
  }

  setStage(stageIndex) {
    this.mode = "shop";
    const female = this.characterKind === "female";
    this.target.set(0, female ? 0.22 : 0.55, this.actorZ);
    this.radius = (female ? 8.6 : 7.8) - stageIndex * 0.2;
  }

  setPhotoMode(enabled) {
    this.mode = enabled ? "photo" : "shop";
    const female = this.characterKind === "female";
    this.target.set(0, female ? 0.22 : 0.55, this.actorZ);
    this.radius = enabled ? (female ? 6.9 : 6.3) : (female ? 8.6 : 7.8);
  }

  setOutfit(items = []) {
    this.outfitItems = items;
    this.previewingItem = null;
    this.setAuraForTop(items.find((item) => item.id.startsWith("top-")));
    return this.rebuildOutfit();
  }

  previewOutfitItem(item) {
    if (!item || this.previewingItem?.id === item.id) return;
    this.previewingItem = item;
    const slot = this.itemSlot(item.id);
    const previewItems = [...this.outfitItems.filter((current) => this.itemSlot(current.id) !== slot), item];
    this.setAuraForTop(previewItems.find((current) => current.id.startsWith("top-")));
    return this.rebuildOutfit(previewItems);
  }

  clearOutfitPreview() {
    if (!this.previewingItem) return;
    this.previewingItem = null;
    this.setAuraForTop(this.outfitItems.find((item) => item.id.startsWith("top-")));
    return this.rebuildOutfit(this.outfitItems);
  }

  setTryOnFocus(active) {
    this.tryOnFocus = Boolean(active);
  }

  setAuraForTop(item) {
    const auraStyles = {
      "top-check": { name: "FIRE AURA", color: 0xff542e, light: 0xff3b16, motion: "rise" },
      "top-racing": { name: "LIGHTNING AURA", color: 0x57caff, light: 0x168cff, motion: "flicker" },
      "top-plaid": { name: "TOXIC AURA", color: 0x8cff38, light: 0x56ff00, motion: "drift" },
      "top-black": { name: "SHADOW AURA", color: 0xa875ff, light: 0x793bff, motion: "drift" },
      "top-print": { name: "PLASMA AURA", color: 0xff59dc, light: 0xf518c0, motion: "flicker" },
      "top-cobalt": { name: "FROST AURA", color: 0x4dfff4, light: 0x10cfff, motion: "drift" },
      "top-ivory": { name: "GOLD AURA", color: 0xffd85a, light: 0xffab16, motion: "rise" },
    };
    const style = item ? auraStyles[item.id] : null;
    const nextKey = style ? item.id : null;
    if (nextKey === this.auraKey && (this.aura || !this.character)) return;
    this.clearAura();
    this.auraKey = nextKey;
    if (!style || !this.character) {
      this.auraLight.color.setHex(style?.light || 0xffffff);
      this.auraLight.intensity = style ? 2.4 : 0;
      const badge = document.querySelector("#threeBadge");
      if (badge) badge.textContent = style?.name || "TRY-ON MODEL";
      return;
    }
    const particles = Array.from({ length: 112 }, (_, index) => ({
      angle: index * 2.399963,
      height: 0.12 + (index % 37) / 37 * 3.25,
      radius: 0.48 + (index % 7) * 0.095,
      speed: 0.5 + (index % 5) * 0.16,
      phase: index * 0.71,
    }));
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(particles.length * 3), 3));
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = 64;
    glowCanvas.height = 64;
    const glowContext = glowCanvas.getContext("2d");
    const glow = glowContext.createRadialGradient(32, 32, 2, 32, 32, 32);
    glow.addColorStop(0, "rgba(255,255,255,1)");
    glow.addColorStop(0.3, "rgba(255,255,255,.8)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    glowContext.fillStyle = glow;
    glowContext.fillRect(0, 0, 64, 64);
    const glowTexture = new THREE.CanvasTexture(glowCanvas);
    const material = new THREE.PointsMaterial({
      color: style.color,
      map: glowTexture,
      size: 0.105,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.78,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const aura = new THREE.Points(geometry, material);
    aura.name = `${style.name.replaceAll(" ", "_")}_Particles`;
    aura.frustumCulled = false;
    aura.userData = { style, particles, glowTexture };
    this.character.add(aura);
    this.aura = aura;
    this.auraLight.color.setHex(style.light);
    this.auraLight.intensity = 2.4;
    const badge = document.querySelector("#threeBadge");
    if (badge) badge.textContent = style.name;
  }

  clearAura() {
    if (!this.aura) return;
    this.aura.parent?.remove(this.aura);
    this.aura.geometry.dispose();
    this.aura.material.dispose();
    this.aura.userData.glowTexture?.dispose();
    this.aura = null;
  }

  animateAura(time) {
    if (!this.aura) return;
    const { style, particles } = this.aura.userData;
    const positions = this.aura.geometry.attributes.position;
    for (let index = 0; index < particles.length; index += 1) {
      const particle = particles[index];
      const rise = style.motion === "rise" ? time * particle.speed * 0.34 : 0;
      const height = (particle.height + rise + Math.sin(time * particle.speed + particle.phase) * 0.11) % 3.5;
      const angle = particle.angle + time * particle.speed * (style.motion === "drift" ? 0.42 : 0.8);
      const radius = particle.radius + Math.sin(time * 2.1 + particle.phase) * 0.08;
      positions.setXYZ(index, Math.cos(angle) * radius, height, Math.sin(angle) * radius);
    }
    positions.needsUpdate = true;
    this.aura.material.opacity = style.motion === "flicker"
      ? 0.42 + Math.abs(Math.sin(time * 16)) * 0.5
      : 0.58 + Math.sin(time * 3.2) * 0.16;
    this.auraLight.intensity = style.motion === "flicker"
      ? 1.2 + Math.abs(Math.sin(time * 16)) * 3.2
      : 1.9 + Math.sin(time * 2.4) * 0.45;
  }

  readCalibrationPresets() {
    try {
      const parsed = JSON.parse(localStorage.getItem("thrifting101-fit-presets") || "{}");
      this.calibrationPresetVersion = parsed?.version;
      return parsed && [4, 5, 6, 7].includes(parsed.version) && parsed.items ? parsed.items : {};
    } catch { return {}; }
  }

  clothingIds() {
    return Object.values(itemModels).flatMap((group) => Object.keys(group));
  }

  setCalibrationItem(id) {
    const slot = this.itemSlot(id);
    return this.setOutfit([{ id, name: id, tag: slot.toUpperCase() }]);
  }

  calibrationKey(id, kind = this.characterKind) { return `${kind}:${id}`; }

  calibrationTransform(id) {
    const object = this.clothingObjects.get(id);
    const base = this.clothingBases.get(id);
    if (!object || !base) return this.calibrationPresets[this.calibrationKey(id)] || null;
    return {
      position: { x: object.position.x - base.position.x, y: object.position.y - base.position.y, z: object.position.z - base.position.z },
      scale: { x: object.scale.x / base.scale.x, y: object.scale.y / base.scale.y, z: object.scale.z / base.scale.z },
      rotation: { x: THREE.MathUtils.radToDeg(object.rotation.x - THREE.MathUtils.degToRad(base.rotation.x)), y: THREE.MathUtils.radToDeg(object.rotation.y - THREE.MathUtils.degToRad(base.rotation.y)), z: THREE.MathUtils.radToDeg(object.rotation.z - THREE.MathUtils.degToRad(base.rotation.z)) },
    };
  }

  serializeTransform(object) {
    return {
      position: { x: object.position.x, y: object.position.y, z: object.position.z },
      scale: { x: object.scale.x, y: object.scale.y, z: object.scale.z },
      rotation: { x: THREE.MathUtils.radToDeg(object.rotation.x), y: THREE.MathUtils.radToDeg(object.rotation.y), z: THREE.MathUtils.radToDeg(object.rotation.z) },
    };
  }

  updateCalibrationTransform(id, transform) {
    const object = this.clothingObjects.get(id);
    const base = this.clothingBases.get(id);
    if (!object || !base) return false;
    for (const axis of ["x", "y", "z"]) {
      if (Number.isFinite(transform.position?.[axis])) object.position[axis] = base.position[axis] + transform.position[axis];
      if (Number.isFinite(transform.scale?.[axis])) object.scale[axis] = Math.max(0.01, base.scale[axis] * transform.scale[axis]);
      if (Number.isFinite(transform.rotation?.[axis])) object.rotation[axis] = THREE.MathUtils.degToRad(base.rotation[axis] + transform.rotation[axis]);
    }
    return true;
  }

  applyCalibration(id) {
    const transform = this.calibrationTransform(id);
    if (!transform) return false;
    this.calibrationPresets[this.calibrationKey(id)] = transform;
    localStorage.setItem("thrifting101-fit-presets", JSON.stringify({ version: 7, items: this.calibrationPresets }));
    this.calibrationPresetVersion = 7;
    return true;
  }

  importCalibrationPresets(data) {
    if (!data || ![2, 3, 4, 5, 6, 7].includes(data.version) || !data.items || typeof data.items !== "object") throw new Error("File preset không đúng phiên bản workspace.");
    const allowed = new Set(this.clothingIds());
    for (const [key, value] of Object.entries(data.items)) {
      const [kind, id] = key.split(":");
      if (kind !== "male" || !allowed.has(id)) continue;
      if (!["position", "scale", "rotation"].every((part) => ["x", "y", "z"].every((axis) => Number.isFinite(value?.[part]?.[axis])))) continue;
      this.calibrationPresets[key] = value;
    }
    localStorage.setItem("thrifting101-fit-presets", JSON.stringify({ version: 7, items: this.calibrationPresets }));
    this.calibrationPresetVersion = 7;
  }

  calibrationPresetFile() {
    return { version: 7, app: "Thrifting 101 Fit Workspace", exportedAt: new Date().toISOString(), items: this.calibrationPresets };
  }

  itemSlot(id) {
    if (id.startsWith("top")) return "top";
    if (id.startsWith("bottom")) return "bottom";
    return "shoes";
  }

  modelPathFor(item) {
    const slot = this.itemSlot(item.id);
    const entry = itemModels[slot][item.id];
    if (!entry) return null;
    const fileName = this.characterKind === "male" ? entry[1] : entry[0];
    return `${clothingFolders[this.characterKind][slot]}${fileName}`;
  }

  async rebuildOutfit(items = this.outfitItems) {
    const buildId = ++this.outfitBuildId;
    while (this.outfitGroup.children.length) this.outfitGroup.remove(this.outfitGroup.children[0]);
    this.clothingObjects.clear();
    this.clothingBases.clear();
    if (!this.character) return;

    this.character.updateMatrixWorld(true);
    const characterBox = new THREE.Box3().setFromObject(this.character);
    const characterSize = characterBox.getSize(new THREE.Vector3());
    const characterCenter = characterBox.getCenter(new THREE.Vector3());
    const characterScale = this.character.getWorldScale(new THREE.Vector3()).y || 1;
    const bodyRegions = {
      top: this.bodyRegionBounds("top", characterBox, characterSize, characterCenter),
      bottom: this.bodyRegionBounds("bottom", characterBox, characterSize, characterCenter),
      shoes: this.bodyRegionBounds("shoes", characterBox, characterSize, characterCenter),
    };
    const offsets = {
      top: { height: 1.25, y: 0.46, z: 0, x: 0 },
      bottom: { height: 1.05, y: 0.12, z: 0, x: 0 },
      shoes: { height: 0.32, y: 0.015, z: 0, x: 0 },
    };
    const currentItems = [...items];
    await Promise.all(currentItems.map(async (item) => {
      const path = this.modelPathFor(item);
      if (!path) return;
      try {
        const template = await this.loadTemplate(path);
        const object = this.clone(template);
        object.visible = true;
        const slot = this.itemSlot(item.id);
        object.rotation.x = 0;
        object.rotation.y = 0;
        const baseFit = clothingFit[item.id] || offsets[slot];
        const fit = baseFit;
        this.fitHeight(object, fit.height / characterScale);
        if (buildId !== this.outfitBuildId || !this.character) return;
        const worldAnchor = new THREE.Vector3(
          characterCenter.x + (fit.x || 0),
          characterBox.min.y + characterSize.y * fit.y,
          characterCenter.z + fit.z,
        );
        const localAnchor = this.character.worldToLocal(worldAnchor);
        object.position.add(localAnchor);
        this.outfitGroup.add(object);
        this.autoFitClothing(
          object,
          slot,
          fit,
          characterBox,
          characterSize,
          characterCenter,
          bodyRegions[slot],
        );
        const centeredPivot = this.centerClothingPivot(object);
        this.clothingObjects.set(item.id, centeredPivot);
        this.clothingBases.set(item.id, this.serializeTransform(centeredPivot));
        const savedTransform = this.calibrationPresets[this.calibrationKey(item.id)];
        if (savedTransform) this.updateCalibrationTransform(item.id, savedTransform);
      } catch (error) {
        console.warn(`3D clothing asset failed: ${path}`, error);
      }
    }));
  }

  resize() {
    if (!this.mount) return;
    const width = Math.max(1, this.mount.clientWidth);
    const height = Math.max(1, this.mount.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    const delta = this.clock.getDelta();
    if (!this.tryOnFocus) this.yaw += delta * (this.mode === "photo" ? 0.02 : 0.012);
    this.viewYaw = THREE.MathUtils.damp(this.viewYaw, this.tryOnFocus ? 0 : this.yaw, 8, delta);
    const pitch = this.mode === "photo" ? 0.12 : 0.2;
    const x = Math.sin(this.viewYaw) * this.radius;
    const z = Math.cos(this.viewYaw) * this.radius;
    this.camera.position.set(x, this.target.y + this.radius * pitch, z);
    this.camera.lookAt(this.target);
    if (this.character) {
      const characterYaw = this.tryOnFocus ? 0 : Math.sin(this.clock.elapsedTime * 0.75) * 0.045;
      this.character.rotation.y = THREE.MathUtils.damp(this.character.rotation.y, characterYaw, 8, delta);
    }
    this.animateAura(this.clock.elapsedTime);
    this.renderer.render(this.scene, this.camera);
    this.renderCharacterPreviews();
  }
}

function applyGameState(detail = {}) {
  const kind = "male";
  threeShop.setCharacter(kind);
  threeShop.setStage(Number.isFinite(detail.stage) ? detail.stage : 0);
  threeShop.setOutfit(Array.isArray(detail.outfit) ? detail.outfit : []);
  threeShop.setPhotoMode(Boolean(detail.photo));
}

const threeShop = new ThreeShop();
window.threeShop = threeShop;
window.addEventListener("three-game-state", (event) => applyGameState(event.detail));
threeShop.init();
