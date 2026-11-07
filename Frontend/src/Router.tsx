import { Route, Routes } from "react-router-dom";
import { LoginPage, LoginSuccessPage, LogoutPage, MainPage, RegisterPage } from "./pages";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import RoomPage from "./pages/app/RoomPage/RoomPage";
import PrivateRoute from "./PrivateRoute";
import PlaylistsPage from "./pages/app/playlists/PlaylistsPage/PlaylistsPage";
import LibraryPage from "./pages/app/LibraryPage/LibraryPage";
import PlaylistPage from "./pages/app/playlists/PlaylistPage/PlaylistPage";
import ProfilePage from "./pages/app/account/ProfilePage/ProfilePage";
import HomePage from "./pages/HomePage/HomePage";
import AppLayout from "./components/layout/AppLayout/AppLayout";
import RootLayout from "./components/layout/RootLayout/RootLayout";

const AppRouter = () => {
    return (
        <>
            <Routes>
                
                <Route element={<RootLayout/>}>
                    <Route element={<MainLayout/>}>
                        <Route index element={<HomePage />} />

                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="login/success" element={<LoginSuccessPage />} />
                        <Route path="logout" element={<LogoutPage />} />
                    </Route>

                    <Route element={<PrivateRoute/> }>
                        <Route path="app" element={<AppLayout />}>

                            <Route index element={<MainPage />} />
                        
                            <Route path="room" element={<RoomPage />} />

                            <Route path="library" element={<LibraryPage />}/>

                            <Route path="playlists" >
                                <Route index element={<PlaylistsPage />}/>
                                <Route path=":id" element={<PlaylistPage/>} />
                            </Route>

                            <Route path="profile" element={<ProfilePage />}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </>
    );
};

export default AppRouter;