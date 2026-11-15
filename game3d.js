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
    "top-print": ["Top9.fbx", "m-top7.fbx"],
    "top-cobalt": ["Top8.fbx", "m-top8.fbx"],
    "top-ivory": ["Top2.fbx", "m-top5.fbx"],
  },
  bottom: {
    "bottom-banana": ["Bottom1.fbx", "m-bottom1.fbx"],
    "bottom-banana-2": ["Bottom2.fbx", "m-bottom2.fbx"],
    "bottom-cargo": ["Bottom3.fbx", "m-bottom3.fbx"],
    "bottom-floral": ["Bottom4.fbx", "m-bottom4.fbx"],
    "bottom-pants": ["Bottom5.fbx", "m-bottom5.fbx"],
    "bottom-mix": ["Bottom6.fbx", "m-bottom6.fbx"],
    "bottom-army": ["Bottom7.fbx", "m-bottom7.fbx"],
    "bottom-cream": ["Bottom8.fbx", "m-bottom8.fbx"],
  },
  shoes: {
    "shoe-camel": ["Shoes1.fbx", "m-shoes1.fbx"],
    "shoe-mix": ["Shoes2.fbx", "m-shoes2.fbx"],
    "shoe-flats": ["Shoes3.fbx", "m-shoes3.fbx"],
    "shoe-boots": ["Shoes4.fbx", "m-shoes4.fbx"],
    "shoe-color": ["Shoes5.fbx", "m-shoes5.fbx"],
    "shoe-vintage": ["Shoes6.fbx", "m-shoes6.fbx"],
    "shoe-high": ["Shoes8.fbx", "m-shoes8.fbx"],
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
  "top-check": { height: 1.34, y: 0.48, z: 0.18, x: 0.12 },
  "top-racing": { height: 1.34, y: 0.48, z: 0.18, x: 0.12 },
  "top-plaid": { height: 1.12, y: 0.52, z: 0.20, x: 0.12 },
  "top-black": { height: 1.28, y: 0.48, z: 0.18, x: 0.12 },
  // The pink Top 7 mesh sits behind the male torso at the default depth.
  // Bring it slightly forward while keeping its centre on the chest.
  "top-print": { height: 1.30, y: 0.52, z: 0.34, x: 0.12 },
  "top-cobalt": { height: 1.42, y: 0.50, z: 0.20, x: 0.24 },
  "top-ivory": { height: 1.34, y: 0.48, z: 0.18, x: 0.12 },
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
    this.scene.fog = new THREE.Fog(0x142a51, 8, 28);
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
    this.rotatePointer = null;
    this.environmentFiles = [
      ["cashier", "Furniture/cashier.fbx", 2.5, [4.2, -1.38, -3.4], Math.PI],
      ["curtain", "Furniture/curtain.fbx", 3.8, [0, -1.38, -5], 0],
      ["sign", "Furniture/banghieu.fbx", 2.6, [0, 2.9, -5], 0],
    ];
    this.environmentPromise = null;
    this.preparationPromises = new Map();
    this.mode = "shop";
    this.yaw = 0;
    this.radius = 8.5;
    this.target = new THREE.Vector3(0, 1.25, 0);
    this.actorZ = 2.2;
    this.environment = new THREE.Group();
    this.scene.add(this.environment);
    this.ready = false;
    this.setupLights();
    this.setupFloor();
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
    this.scene.add(new THREE.HemisphereLight(0xbad2ff, 0x1c2540, 2.2));
    const key = new THREE.DirectionalLight(0xffe1b2, 3.4);
    key.position.set(5, 9, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    this.scene.add(key);
    const rim = new THREE.PointLight(0x5c86ff, 35, 13, 2);
    rim.position.set(-5, 3, -2);
    this.scene.add(rim);
  }

  setupFloor() {
    const texture = new THREE.TextureLoader().load(ASSET("cho-do-si-hoang-hoa-tham.jpg"));
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 20),
      new THREE.MeshStandardMaterial({ map: texture, roughness: 1, metalness: 0 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.42;
    floor.receiveShadow = true;
    this.scene.add(floor);

    const back = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 12),
      new THREE.MeshStandardMaterial({ color: 0x13294c, roughness: 1 })
    );
    back.position.set(0, 4, -5.5);
    this.scene.add(back);
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

  loadEnvironment() {
    if (this.environmentPromise) return this.environmentPromise;
    this.environmentPromise = Promise.allSettled(this.environmentFiles.map(async ([key, path, height, position, rotation]) => {
      try {
        const model = await this.loadTemplate(path);
        const object = this.clone(model);
        this.fitHeight(object, height);
        object.position.set(...position);
        object.rotation.y = rotation;
        this.environment.add(object);
      } catch (error) {
        console.warn(`3D environment asset failed: ${path}`, error);
      }
    }));
    return this.environmentPromise;
  }

  prepareForGame(kind) {
    if (this.preparationPromises.has(kind)) return this.preparationPromises.get(kind);
    const promise = Promise.all([
      this.preloadAllModels([
        ...this.environmentFiles.map(([, path]) => path),
        characterModels[kind],
      ], "game"),
      this.preloadWardrobe(kind),
    ]).then(async () => {
      await this.loadEnvironment();
      await this.setCharacter(kind);
      this.ready = true;
      this.loading?.classList.add("is-ready");
      window.dispatchEvent(new CustomEvent("three-ready", { detail: { kind } }));
      return true;
    });
    this.preparationPromises.set(kind, promise);
    return promise;
  }

  async init() {
    this.loading?.classList.add("is-ready");
    window.dispatchEvent(new CustomEvent("three-ui-ready"));
    setTimeout(() => {
      void this.preloadAllModels([
        ...this.environmentFiles.map(([, path]) => path),
        ...Object.values(characterModels),
      ], "background");
    }, 180);
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
    let meshCount = 0;

    this.character.traverse((child) => {
      if (!child.isMesh || !child.visible) return;
      const meshBox = new THREE.Box3().setFromObject(child);
      if (meshBox.isEmpty()) return;
      const meshCenter = meshBox.getCenter(new THREE.Vector3());
      if (meshCenter.y < minY || meshCenter.y > maxY) return;
      if (slot !== "shoes" && Math.abs(meshCenter.x - characterCenter.x) > centerTolerance) return;
      bounds.union(meshBox);
      meshCount += 1;
    });

    const minimumWidth = characterSize.x * (slot === "top" ? 0.34 : slot === "bottom" ? 0.30 : 0.18);
    const minimumDepth = characterSize.z * (slot === "shoes" ? 0.28 : 0.22);
    if (!meshCount || bounds.isEmpty()) {
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
    const centerX = characterCenter.x;
    const centerZ = bounds.getCenter(new THREE.Vector3()).z;
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
    const clearance = slot === "top" ? 0.055 : slot === "bottom" ? 0.045 : 0.025;
    const minScale = slot === "top" ? 0.72 : slot === "bottom" ? 0.74 : 0.78;
    const maxScale = slot === "top" ? 1.16 : slot === "bottom" ? 1.14 : 1.10;
    const targetSize = region.getSize(new THREE.Vector3());

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

    object.updateMatrixWorld(true);
    clothingBox = new THREE.Box3().setFromObject(object);
    const clothingCenter = clothingBox.getCenter(new THREE.Vector3());
    const targetCenter = new THREE.Vector3(
      characterCenter.x + (fit.x || 0),
      0,
      characterCenter.z + (fit.z || 0),
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
      this.character.add(this.outfitGroup);
      this.outfitGroup.position.set(0, 0, 0);
      await this.rebuildOutfit();
    } catch (error) {
      console.warn("3D character asset failed", error);
    }
  }

  setStage(stageIndex) {
    this.mode = "shop";
    this.target.set(0, 0.55, this.actorZ);
    this.radius = 7.8 - stageIndex * 0.2;
  }

  setPhotoMode(enabled) {
    this.mode = enabled ? "photo" : "shop";
    this.target.set(0, 0.55, this.actorZ);
    this.radius = enabled ? 6.3 : 7.8;
  }

  setOutfit(items = []) {
    this.outfitItems = items;
    this.rebuildOutfit();
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

  async rebuildOutfit() {
    const buildId = ++this.outfitBuildId;
    while (this.outfitGroup.children.length) this.outfitGroup.remove(this.outfitGroup.children[0]);
    if (!this.character) return;

    this.character.rotation.y = 0;
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
      top: { height: 1.25, y: 0.48, z: 0.18 },
      bottom: { height: 1.05, y: 0.30, z: 0.06 },
      shoes: { height: 0.38, y: 0.025, z: 0.04 },
    };
    const currentItems = [...this.outfitItems];
    await Promise.all(currentItems.map(async (item) => {
      const path = this.modelPathFor(item);
      if (!path) return;
      try {
        const template = await this.loadTemplate(path);
        const object = this.clone(template);
        const slot = this.itemSlot(item.id);
        object.rotation.x = 0;
        object.rotation.y = 0;
        const fit = clothingFit[item.id] || offsets[slot];
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
    this.yaw += delta * (this.mode === "photo" ? 0.02 : 0.012);
    const pitch = this.mode === "photo" ? 0.12 : 0.2;
    const x = Math.sin(this.yaw) * this.radius;
    const z = Math.cos(this.yaw) * this.radius;
    this.camera.position.set(x, this.target.y + this.radius * pitch, z);
    this.camera.lookAt(this.target);
    if (this.character) this.character.rotation.y = Math.sin(this.clock.elapsedTime * 0.75) * 0.045;
    this.renderer.render(this.scene, this.camera);
  }
}

function applyGameState(detail = {}) {
  const kind = detail.kind === "female" ? "female" : "male";
  threeShop.setCharacter(kind);
  threeShop.setStage(Number.isFinite(detail.stage) ? detail.stage : 0);
  threeShop.setOutfit(Array.isArray(detail.outfit) ? detail.outfit : []);
  threeShop.setPhotoMode(Boolean(detail.photo));
}

const threeShop = new ThreeShop();
window.threeShop = threeShop;
window.addEventListener("three-game-state", (event) => applyGameState(event.detail));
threeShop.init();
