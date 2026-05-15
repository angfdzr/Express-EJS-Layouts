class Sidebar {
    static adminMenu(){
        return [
            {
                title: 'Dashboard',
                icon: 'bi bi-speedometer',
                url: '/dashboard',
                is_dropdown: false
            },
            {
                title: 'Pengguna',
                icon: 'bi bi-people',
                url: '#',
                is_dropdown: true,
                submenus: [
                    {
                        title: 'Tabel Pengguna',
                        url: '/users/tabel-pengguna'
                    }
                ]
            }
        ]
    }

    static clientMenu(){
        return [
            {
                title: 'Home',
                icon: 'bi bi-home',
                url: '/dashboard',
                is_dropdown: false
            },
            {
                title: 'Pages',
                icon: 'bi bi-info-circle',
                url: '#',
                is_dropdown: true,
                submenus: [
                    {
                        title: 'About Us',
                        url: '/pages/about-us'
                    }
                ]
            },
            {
                title: 'Login',
                icon: 'bi bi-box-arrow-in-right',
                url: '/login',
                is_dropdown: false
            }
        ]
    }
}

module.exports = Sidebar;