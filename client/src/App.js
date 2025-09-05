import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import OTPLogin from "./pages/OTPLogin";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import IdealWeight from "./pages/IdealWeight";
import DailyIntake from "./pages/DailyIntake";
import CalorieBurn from "./pages/CalorieBurn";
import UserInfo from "./pages/UserInfo";
import SearchResults from "./pages/SearchResults"; 
import CategoryPage from './pages/CategoryPage';
import VegPage from './pages/VegPage';
import NonVegPage from './pages/NonVegPage';
import DrinksPage from './pages/DrinksPage';
import SaladPage from './pages/SaladPage';
import ProVersionPage from "./pages/ProVersionPage";
import MealSuggestion from './pages/MealSuggestion';
import FoodTracker from './pages/FoodTracker';

import NutrientTracking from './pages/NutrientTracking';
import HealthReports from './pages/HealthReports';
import DeviceIntegration from './pages/DeviceIntegration';
import WellnessTracker from './pages/WellnessTracker';
import AdFreeExperience from './pages/AdFreeExperience';


import RoadmapPage from "./pages/Roadmap";
import CheckoutPage from "./pages/CheckoutPage";
import NutritionFinder from "./pages/NonVegPage";


import Scan from "./pages/Scan";

import PrivacyPolicy  from "./components/PrivacyPolicy";
import TermsOfUse from "./components/Term";
import AboutUs from "./components/About";





import CaseStudy from './pages/CaseStudy';
import InDepthArticle from './pages/InDepthArticle';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/non-veg" element={<NutritionFinder />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp-login" element={<OTPLogin />} />
      <Route path="/user" element={<UserInfo />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/ideal-weight" element={<IdealWeight />} />
      <Route path="/daily-intake" element={<DailyIntake />} />
      <Route path="/calorie-burn" element={<CalorieBurn />} />
      <Route path="/search" element={<SearchResults />} /> 
      <Route path="/category/:type" element={<CategoryPage />} />
      <Route path="/category/nonveg" element={<NonVegPage />} />
      <Route path="/category/drinks" element={<DrinksPage />} /> 
      <Route path="/category/salad" element={<SaladPage />} />
      <Route path="/category/veg" element={<VegPage />} />
      <Route path="/pro-version" element={<ProVersionPage />} />
      <Route path="/suggestions" element={<MealSuggestion />} />
      <Route path="/FoodTracker" element={<FoodTracker />} />
        <Route path="/scan" element={<Scan />} />


      <Route path="/roadmap" element={<RoadmapPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path ="/privacy-policy" element={<PrivacyPolicy></PrivacyPolicy>}></Route>
      <Route path = '/term' element={<TermsOfUse></TermsOfUse>}></Route>
      <Route path ='/about' element={<AboutUs></AboutUs>}></Route>
      



       <Route path="/case-study" element={<CaseStudy />} />
        <Route path="/in-depth-article" element={<InDepthArticle />} />

      <Route path="/nutrient-tracking" element={
        <NutrientTracking />
      } />
      <Route path="/health-reports" element={
        <HealthReports />
      } />
      <Route path="/device-integration" element={
        <DeviceIntegration />
      } />
      <Route path="/wellness-tracker" element={
        <WellnessTracker />
      } />
      <Route path="/ad-free" element={
        <AdFreeExperience />
      } />
      
    </Routes>
  );
}

export default App;
