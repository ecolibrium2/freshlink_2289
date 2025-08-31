import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProductManagement from './pages/product-management';
import VendorRegistration from './pages/vendor-registration';
import VendorLogin from './pages/vendor-login';
import VendorDashboard from './pages/vendor-dashboard';
import ConsumerHomeSearch from './pages/consumer-home-search';
import VendorProfileProducts from './pages/vendor-profile-products';
import VendorProfile from './pages/vendor-profile';
import Auth from './pages/auth';
import ClientProfile from './pages/client-profile';
import ProductDetails from './pages/product-details';
import VendorsMap from './pages/vendors-map';
import RecipePage from './pages/recipes';
import ProductBenefitsPage from './pages/product-benefits';
import ProductsPage from './pages/products';
import VendorsPage from './pages/vendors';

const Routes = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <ScrollToTop />
                <RouterRoutes>
                    {/* Redirect root to consumer home */}
                    <Route path="/" element={<Navigate to="/consumer-home-search" replace />} />

                    {/* Main consumer routes */}
                    <Route path="/consumer-home-search" element={<ConsumerHomeSearch />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/product-details/:productId" element={<ProductDetails />} />
                    <Route path="/vendors" element={<VendorsPage />} />
                    <Route path="/vendors-map" element={<VendorsMap />} />

                    {/* Content routes */}
                    <Route path="/recipes/:recipeId" element={<RecipePage />} />
                    <Route path="/benefits/:productType" element={<ProductBenefitsPage />} />

                    {/* Authentication routes */}
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/client-auth" element={<Auth />} />

                    {/* Profile routes */}
                    <Route path="/client-profile" element={<ClientProfile />} />
                    <Route path="/vendor-profile" element={<VendorProfile />} />

                    {/* Vendor specific routes */}
                    <Route path="/vendor-registration" element={<VendorRegistration />} />
                    <Route path="/vendor-login" element={<VendorLogin />} />
                    <Route path="/vendor-dashboard" element={<VendorDashboard />} />
                    <Route path="/vendor-profile-products" element={<VendorProfileProducts />} />
                    <Route path="/product-management" element={<ProductManagement />} />

                    {/* 404 route */}
                    <Route path="*" element={<NotFound />} />
                </RouterRoutes>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default Routes;