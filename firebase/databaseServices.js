import { ref, set, push, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "./firebaseConfig";
import { uploadImages } from "../components/MenuItem";
import { uploadRestImages } from "../components/steps/Branding";

let restaurantId;

export const checkAuth = async () => {
  return new Promise((resolve) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated
        resolve(true);
      } else {
        // User is not authenticated
        resolve(false);
      }
    });
  });
};

export const createNewUser = (userId, firstName, lastName, birthDate) => {
  const userRef = ref(db, `users/${userId}`);
  set(userRef, {
    PersonalDetails: {
      DOB: birthDate,
      FirstName: firstName,
      LastName: lastName,
    },
  });
};

export const addDetails = (restaurantData) => {
  const restRef = ref(db, "restaurants/");
  const restaurantRef = push(restRef, {
    Details: {
      name: restaurantData.name,
      type: restaurantData.type,
      description: restaurantData.description,
      workHours: restaurantData.workingHours,
      Address: {
        City: restaurantData.city,
        "Street Address": restaurantData.street,
        Zipcode: restaurantData.zipCode,
      },
      Allergies: {
        Dairy: restaurantData.dairy,
        Gluten: restaurantData.gluten,
        Nut: restaurantData.nut,
        Vegan: restaurantData.vegan,
        Vegetarian: restaurantData.vegetarian,
      },
      PaymentSettings: {
        dillPay: restaurantData.dillPay,
        earnPercentage: restaurantData.earningPercentage,
      },
      priceRange: restaurantData.priceRange,
      serviceTime: restaurantData.serviceTime,
      GPS: {
        lat: restaurantData.lat,
        long: restaurantData.long,
      },
    },
  });

  restaurantId = restaurantRef.key;
  addRestIdToUser(restaurantId);
};

const addRestIdToUser = (restId) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const userId = user.uid;
    const userRef = ref(db, `users/${userId}/PersonalDetails`);
    update(userRef, { restaurantId: restId });
  }
};

export const addTables = (Tables) => {
  const tableRef = ref(db, `restaurants/${restaurantId}`);
  update(tableRef, {
    Tables,
  });
};
export const addStations = (Stations) => {
  const stationRef = ref(db, `restaurants/${restaurantId}`);
  update(stationRef, {
    Stations,
  });
};

export const uploadRestaurantImages = async (images) => {
  const imageUrls = await uploadRestImages(images);
  const restImagesRef = ref(db, `restaurants/${restaurantId}`);
  update(restImagesRef, {
    restaurantImages: {
      Images: imageUrls,
    },
  });
};

export const addMenuItem = async (menuData, selectedMenuItemType) => {
  const menuRef = ref(
    db,
    `restaurants/${restaurantId}/menu/${selectedMenuItemType}`
  );
  const imageUrls = await uploadImages(menuData.menuImages);
  const updatedMenuData = {
    name: menuData.itemName,
    price: menuData.itemPrice,
    description: menuData.description,
    cookTime: menuData.cookTime,
    allergies: {
      dairy: menuData.dairy,
      vegan: menuData.vegan,
      vegetarian: menuData.vegetarian,
      gluten: menuData.gluten,
      nut: menuData.nut,
    },
    showInMenu: true,
    sideItems: menuData.sideItems,
    selectedCategoryId: menuData.selectedCategoryId,
    AllCategories: menuData.categoryInfoList,
    Questions: menuData.addedQuestions,
    SelectedQuestionId: menuData.selectedQId,
    Answers: menuData.answers,
    stations: menuData.stations,
    images: imageUrls,
  };

  update(menuRef, updatedMenuData);
};

export const addStaff = (staff) => {
  const staffRef = ref(db, `restaurants/${restaurantId}`);
  const Staff = {
    FoHRate: staff.FoHRate,
    BoHRate: staff.BoHRate,
    InviteFoH: staff.FoHEmail,
    InviteBoH: staff.BoHEmail,
  };
  update(staffRef, Staff);
};

export const addBillSplitting = (billSplitting) => {
  const billSplittingRef = ref(db, `restaurants/${restaurantId}`);
  const formattedBillSplitting = {
    splittingBills: {
      restaurantAndStaff: formatPercentage(billSplitting.restaurantAndStaff),
      BoHAndFoH: formatPercentage(billSplitting.BoHAndFoH),
      waitersAndTableWaiters: formatPercentage(
        billSplitting.waitersAndTableWaiters
      ),
      chefsAndTableChaefs: formatPercentage(billSplitting.chefsAndTableChaefs),
    },
  };
  update(billSplittingRef, formattedBillSplitting);
};

const formatPercentage = (value) => {
  const percentage = parseFloat(value) * 10;
  return `${percentage}/${100 - percentage}`;
};
