<template>
    <Head>
        <title>{{title || 'CMS'}} – Helium CMS</title>
    </Head>

    <div class="layout">
        <div class="menu" :class="{'open': isOpen}">
            <div class="top-bar">
                <a :href="route('admin')" class="logo">
                    <img src="/images/app/branding/cms_icon_white.svg" alt="Helium CMS Logo">
                </a>
                <div class="info-wrapper">
                    <a class="info website" target="_blank" :href="`http://${globalSettings['site.domain']}`">
                        <Icon icon="language" />
                        {{ globalSettings['site.name'] }}
                    </a>
                    <a class="info profile" target="_blank" :href="route('dashboard.profile')">
                        <Icon icon="account_circle" />
                        {{ user.name }}
                    </a>
                </div>
            </div>

            <div class="scroll-container">
                <div class="group">
                    <div class="app-wrapper"
                        v-for="item in menu[0].filter(e => canAny(e.permission))"
                        :key="item.route"
                        :class="{'active': is(item.activeWhen)}"
                        >
                        <Link class="app-button" :href="item.route" :style="`color: ${item.color};`">
                            <Icon :icon="item.icon" />
                            <div class="text">{{item.label}}</div>
                        </Link>
    
                        <div class="app-sub-menu">
                            <Link class="app-button"
                                v-for="subitem in item.submenu.filter(e => canAny(e.permission))"
                                :key="subitem.route"
                                :href="subitem.route"
                                :class="{ 'active': is(subitem.activeWhen) }">
                                <div class="icon-placeholder"></div>
                                <div class="text">{{ subitem.label }}</div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="group">
                    <div class="app-wrapper"
                        v-for="item in menu[1].filter(e => canAny(e.permission))"
                        :key="item.route"
                        :class="{'active': is(item.activeWhen)}"
                        :style="`color: ${item.color};`"
                        >
                        <Link class="app-button" :href="item.route">
                            <Icon :icon="item.icon" />
                            <div class="text">{{item.label}}</div>
                        </Link>
    
                        <div class="app-sub-menu">
                            <Link class="app-button"
                                v-for="subitem in item.submenu.filter(e => canAny(e.permission))"
                                :key="subitem.route"
                                :href="subitem.route"
                                :class="{ 'active': is(subitem.activeWhen) }">
                                <div class="icon-placeholder"></div>
                                <div class="text">{{ subitem.label }}</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <main class="content" :class="{ 'no-header': noHeader }">
            <section id="hero-section" :class="{ 'scrolled': isScrolled, 'sticky': sticky }">
                <div class="limiter">
                    <div class="hero-card">
                        <div class="sides start">
                            <Link class="back-button" v-if="backlink" :href="backlink" v-tooltip="backlinkText">arrow_back</Link>
                            <slot name="header-left" />
                        </div>
                        <h1>{{ title }}</h1>
                        <div class="sides end">
                            <slot name="header-right" />
                        </div>
    
                        <button class="toggle-open" :class="{'open': isOpen}" :title="isOpen ? 'Menü ausklappen' : 'Menü einklappen'" @click="isOpen = !isOpen">
                            <svg class="svg-wrapper" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                                <path class="hamburger-path" d="M5 9C5 9 17.5 9 19 9C20.5 9 22.5 7.5 21.5 6C20.5 4.5 18 6 17 7C16 8 7 17 7 17"/>
                                <path class="hamburger-path" d="M5 15.0054C5 15.0054 17.5 15.0054 19 15.0054C20.5 15.0054 22.5 16.5054 21.5 18.0054C20.5 19.5054 18 18.0054 17 17.0054C16 16.0054 7 7.00542 7 7.00542"/>
                            </svg>
                        </button>
    
                        <Loader class="loader" v-show="loading" />
                    </div>
                </div>
            </section>
            
            <section id="content-section">
                <div class="limiter">
                    <slot />
        
                    <div class="fab" v-if="$slots.fab">
                        <slot name="fab" />
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup>
    import { Head, Link, usePage } from '@inertiajs/inertia-vue3'
    import { ref, computed, onBeforeUnmount, onMounted } from 'vue'
    import { can, canAny } from '@/Utils/Permissions'

    import Loader from '@/Components/Form/Loader.vue'
    import Icon from '@/Components/Icon.vue'



    defineProps({
        title: String,
        backlink: [String, Object, Function],
        backlinkText: String,
        noHeader: {
            type: Boolean,
            default: false,
        },
        sticky: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        }
    })



    // START: Scroll detection
    const isScrolled = ref(false)

    function handleScroll()
    {
        isScrolled.value = window.scrollY > 0
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScroll)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll)
    })

    handleScroll()
    // END: Scroll detection
    


    const globalSettings = computed(() => {
        return usePage().props.value.settings ?? {}
    })

    const user = computed(() =>{
        return usePage().props.value.auth?.user
    })

    const isOpen = ref(false)

    const menu = ref([
        [
            { label: 'Dashboard', color: 'var(--color-background)', icon: 'speed', route: route('admin'), permission: [], activeWhen: ['admin', 'admin.profile'], submenu: [
                { label: 'Übersicht', icon: '', route: route('admin'), permission: [], activeWhen: ['admin'] },
                { label: 'Profil', icon: '', route: route('admin'), permission: [], activeWhen: ['admin.profile'] },
            ]},
            { label: 'Accounts', color: 'var(--color-background)', icon: 'person', route: route('admin.users'), permission: ['system.view.users'], activeWhen: ['admin.users', 'admin.users.editor', 'admin.companies', 'admin.companies.editor', 'admin.roles', 'admin.roles.editor'], submenu: [
                {label: 'Accounts', icon: '', route: route('admin.users'), permission: ['system.view.users'], activeWhen: ['admin.users', 'admin.users.editor']},
                {label: 'Unternehmen', icon: '', route: route('admin.companies'), permission: ['system.view.companies'], activeWhen: ['admin.companies', 'admin.companies.editor']},
                {label: 'Berechtigungen', icon: '', route: route('admin.roles'), permission: ['system.view.roles'], activeWhen: ['admin.roles', 'admin.roles.editor']},
            ]},
            { label: 'Medien', color: 'var(--color-background)', icon: 'upload', route: route('admin.media', ['public']), permission: ['system.view.media'], activeWhen: ['admin.media', 'admin.docs'], submenu: [
                {label: 'Öffentliche Ablage', icon: '', route: route('admin.media', ['public']), permission: ['system.view.media'], activeWhen: ['admin.media:driveAlias=public']},
                {label: 'Private Ablage', icon: '', route: route('admin.media', ['private']), permission: ['system.view.media'], activeWhen: ['admin.media:driveAlias=private']},
            ]},
            { label: 'Einstellungen', color: 'var(--color-background)', icon: 'settings', route: route('admin.settings.index', 'general'), permission: ['system.view.settings'], activeWhen: ['admin.settings.index'], submenu: [
                {label: 'Allgemein', icon: '', route: route('admin.settings.index', 'general'), permission: [], activeWhen: ['admin.settings.index:page=general']},
                {label: 'Design', icon: '', route: route('admin.settings.index', 'design'), permission: [], activeWhen: ['admin.settings.index:page=design']},
                {label: 'Medien', icon: '', route: route('admin.settings.index', 'media'), permission: [], activeWhen: ['admin.settings.index:page=media']},
                {label: 'Rechtliches', icon: '', route: route('admin.settings.index', 'legal'), permission: [], activeWhen: ['admin.settings.index:page=legal']},
                {label: 'Seite', icon: '', route: route('admin.settings.index', 'pages'), permission: [], activeWhen: ['admin.settings.index:page=pages']},
            ]},
            { label: 'Events', color: 'var(--color-background)', icon: 'local_activity', route: route('admin.fairs'), permission: ['system.view.users'], activeWhen: ['admin.fairs'], submenu: [
                {label: 'Anmeldungen', icon: '', route: route('admin.fairs'), permission: ['app.fairs.export'], activeWhen: ['admin.fairs']},
            ]},
        ],
        [
            {label: 'Pages', color: 'var(--color-app-pages-on-dark)', icon: 'web', route: route('admin.pages.pages'), permission: ['app.pages.access.admin.panel'], activeWhen: ['admin.pages.pages', 'admin.pages.pages.editor', 'admin.pages.menus', 'admin.pages.menus.editor', 'admin.pages.planner', 'admin.pages.planner.editor'], submenu: [
                {label: 'Seiten', icon: '', route: route('admin.pages.pages'), permission: ['app.pages.view.pages'], activeWhen: ['admin.pages.pages']},
                {label: 'Menüs', icon: '', route: route('admin.pages.menus'), permission: ['app.pages.view.menus'], activeWhen: ['admin.pages.menus', 'admin.pages.menus.editor']},
                {label: 'Planner', icon: '', route: route('admin.pages.planner'), permission: ['app.pages.view.pages'], activeWhen: ['admin.pages.planner', 'admin.pages.planner.editor']},
            ]},
            {label: 'Blog', color: 'var(--color-app-blog-on-dark)', icon: 'newspaper', route: route('admin.blog.posts'), permission: ['app.blog.access.admin.panel'], activeWhen: ['admin.blog.posts', 'admin.blog.categories', 'admin.blog.posts.editor', 'admin.blog.categories.editor'], submenu: [
                {label: 'Beiträge', icon: '', route: route('admin.blog.posts'), permission: ['app.blog.view.posts'], activeWhen: ['admin.blog.posts', 'admin.blog.posts.editor']},
                {label: 'Kategorien', icon: '', route: route('admin.blog.categories'), permission: ['app.blog.view.categories'], activeWhen: ['admin.blog.categories', 'admin.blog.categories.editor']},
            ]},
            {label: 'Forms', color: 'var(--color-app-forms-on-dark)', icon: 'edit_square', route: route('admin.forms.forms.overview'), permission: ['app.forms.access.admin.panel'], activeWhen: ['admin.forms.forms.overview'], submenu: [
                {label: 'Übersicht', icon: '', route: route('admin.forms.forms.overview'), permission: ['app.forms.view.overview'], activeWhen: ['admin.forms.forms.overview']},
                {label: 'Formulare', icon: '', route: route('admin.forms.forms.overview'), permission: ['app.forms.view.forms'], activeWhen: ['admin.forms.forms.index', 'admin.forms.forms.editor']},
                {label: 'Einsendungen', icon: '', route: route('admin.forms.forms.overview'), permission: ['app.forms.view.entries'], activeWhen: ['admin.forms.entries', 'admin.forms.entries.editor']},
            ]},
            {label: 'Ecommerce', color: 'var(--color-app-ecommerce-on-dark)', icon: 'shopping_cart', route: route('admin.blog.posts'), permission: ['app.ecommerce.access.admin.panel'], activeWhen: ['admin.ecommerce.overview'], submenu: []},
            {label: 'Jobs', color: 'var(--color-app-jobs-on-dark)', icon: 'work', route: route('admin.jobs.posts'), permission: ['app.jobs.access.admin.panel'], activeWhen: ['admin.jobs.posts', 'admin.jobs.categories', 'admin.jobs.posts.editor', 'admin.jobs.categories.editor'], submenu: [
                {label: 'Stellenangebote', icon: '', route: route('admin.jobs.posts'), permission: ['app.jobs.view.offers'], activeWhen: ['admin.jobs.posts', 'admin.jobs.posts.editor']},
                {label: 'Anstellungs Arten', icon: '', route: route('admin.jobs.categories'), permission: ['app.jobs.view.categories'], activeWhen: ['admin.jobs.categories', 'admin.jobs.categories.editor']},
            ]},
            {label: 'Intranet', color: 'var(--color-app-intranet-on-dark)', icon: 'domain', route: route('admin.intranet.posts'), permission: ['app.intranet.access.admin.panel'], activeWhen: ['admin.intranet.posts', 'admin.intranet.categories', 'admin.intranet.posts.editor', 'admin.intranet.categories.editor'], submenu: [
                {label: 'Posts', icon: '', route: route('admin.intranet.posts'), permission: ['app.intranet.view.posts'], activeWhen: ['admin.intranet.posts', 'admin.intranet.posts.editor']},
                {label: 'Kategorien', icon: '', route: route('admin.intranet.categories'), permission: ['app.intranet.view.categories'], activeWhen: ['admin.intranet.categories', 'admin.intranet.categories.editor']},
            ]},
            {label: 'Wiki', color: 'var(--color-app-wiki-on-dark)', icon: 'local_library', route: route('admin.wiki.posts'), permission: ['app.wiki.access.admin.panel'], activeWhen: ['admin.wiki.posts', 'admin.wiki.categories', 'admin.wiki.posts.editor', 'admin.wiki.categories.editor'], submenu: [
                {label: 'Einträge', icon: '', route: route('admin.wiki.posts'), permission: ['app.wiki.view.pages'], activeWhen: ['admin.wiki.posts', 'admin.wiki.posts.editor']},
                {label: 'Workspaces', icon: '', route: route('admin.wiki.categories'), permission: ['app.wiki.view.categories'], activeWhen: ['admin.wiki.categories', 'admin.wiki.categories.editor']},
            ]},
            // {label: 'Marketing', color: 'var(--color-app-marketing-on-dark)', icon: 'cell_tower', route: route('admin.blog.posts'), permission: ['app.marketing.access.admin.panel'], activeWhen: ['admin.marketing.overview'], submenu: []},
        ],
    ])



    const is = (routenames) => {
        if (typeof routenames === 'string') routenames = [routenames]
        
        return routenames.some(routename => {
            // routename example:
            // admin.page:param1=value1:param2=value2
            let name = routename.split(':')[0]
            let params = routename.split(':').slice(1)
            let paramsMatch = true

            params.forEach(param => {
                let key = param.split('=')[0]
                let value = param.split('=')[1]

                if (route()?.params?.[key] !== value) paramsMatch = false
            })

            return route().current() === name && paramsMatch
        })
    }
</script>

<style lang="sass">
    body
        font-family: var(--font-interface)
        background: var(--color-background-soft)

        --color-primary: #3742fa !important
        --color-primary-soft: #4c5bfa !important

        --mui-primary: #3742fa !important
        --primary: #3742fa !important
</style>

<style lang="sass" scoped>
    .toggle-open
        display: none
        width: 3rem
        height: 2.5rem
        color: inherit
        background: transparent
        border: none
        padding: 0
        position: relative
        z-index: 2000
        cursor: pointer
        color: var(--color-text)
        background: var(--color-background)

        &.open
            .svg-wrapper .hamburger-path
                stroke-dashoffset: -23.8

        .svg-wrapper
            height: 70%
            aspect-ratio: 1
            color: inherit
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
            
            .hamburger-path
                stroke-dasharray: 14 100
                transition: all 300ms, color 100ms
                stroke: currentColor

    .layout
        display: flex
        align-items: flex-start
        position: relative

        .menu
            width: 20rem
            height: 100vh
            position: sticky
            z-index: 1000
            top: 0
            left: 0
            display: flex
            flex-direction: column
            background: var(--color-text)
            box-shadow: var(--shadow-elevation-low)
            color: white

            .top-bar
                display: flex
                aspect-ratio: 1.586
                background-color: var(--color-primary)
                background-image: url('/images/app/versions/sunrise_2023.webp')
                background-size: cover
                background-position: center
                background-repeat: no-repeat
                background-blend-mode: luminosity
                position: relative
                user-select: none

                &::before
                    content: ''
                    position: absolute
                    top: 0
                    left: 0
                    width: 100%
                    height: 100%
                    pointer-events: none
                    border-radius: inherit
                    background: var(--color-primary)
                    opacity: .8
                    border-bottom: 1px solid #ffffff33

                .logo
                    height: 2.5rem
                    width: 2.5rem
                    padding: .25rem
                    display: flex
                    align-items: center
                    justify-content: center
                    position: absolute
                    top: .75rem
                    left: .75rem
                    z-index: 1000
                    border-radius: var(--radius-s)
                    
                    &:hover
                        background: #ffffff22

                    img
                        height: 100%
                        width: 100%
                        object-fit: contain


                .info-wrapper
                    display: flex
                    flex-direction: column
                    align-items: flex-start
                    justify-content: flex-end
                    color: var(--color-on-primary)
                    position: relative
                    z-index: 1
                    padding: .9rem .5rem
                    gap: .25rem
                    width: 100%

                    .info
                        color: inherit
                        margin: 0
                        line-height: 1.3
                        display: flex
                        align-items: center
                        gap: .5rem
                        border-radius: var(--radius-s)
                        padding: .1rem .5rem
                        font-size: .9rem
                        font-weight: 400
                        opacity: .8

                        &.website
                            font-size: 1.25rem
                            font-weight: 600
                            font-family: var(--font-heading)
                            opacity: 1
                            margin-bottom: .25rem

                        .icon
                            width: 1.5rem

                    a.info:hover
                        background: #ffffff22

            .scroll-container
                overflow: hidden
                overflow-y: auto
                flex: 1
                display: flex
                flex-direction: column

                &::-webkit-scrollbar
                    width: 5px
                    height: 5px

                &::-webkit-scrollbar-track
                    background: #00000000

                &::-webkit-scrollbar-thumb
                    background: #ffffff33
                    border-radius: 0
                    background-clip: content-box
                    border: 2px solid var(--color-text)

                    &:hover
                        background: var(--color-background)
                        border-radius: 0

            .divider
                flex: none
                width: 100%
                border: none
                margin: 0
                border-bottom: 1px solid #ffffff33

            .group
                flex: none
                display: flex
                flex-direction: column
                padding-block: .5rem

            .app-wrapper
                display: flex
                flex-direction: column
                gap: .5rem

                &.active
                    padding-block: .5rem 1rem
                    background: #00000055

                    &:not(:first-child)
                        margin-top: .5rem

                    &:not(:last-child)
                        margin-bottom: .5rem

                    > .app-button
                        font-weight: 600 !important

                    .app-sub-menu
                        display: flex

                .app-button
                    justify-self: stretch
                    display: flex
                    align-items: center
                    padding: 0
                    min-height: 3rem
                    color: inherit
                    position: relative
                    user-select: none
                    cursor: pointer
                    font-weight: 400
                    font-size: .9rem

                    &::after
                        content: ''
                        position: absolute
                        left: 0
                        bottom: 0
                        width: 100%
                        height: 100%
                        background: currentColor
                        opacity: 0
                        pointer-events: none

                    .icon,
                    .icon-placeholder
                        font-size: 1.4rem
                        font-weight: 300 !important
                        width: 3.5rem
                        display: flex
                        align-items: center
                        justify-content: center

                    &:hover
                        &::after
                            opacity: .05 !important

                    &.active
                        font-weight: 600 !important

                        .text
                            opacity: 1 !important
                            
                        &::after
                            opacity: .05 !important

                .app-sub-menu
                    justify-self: stretch
                    display: none
                    flex-direction: column

                    .app-button
                        font-weight: 400
                        font-size: .8rem
                        min-height: 2.5rem

                        .text
                            opacity: .7
                            letter-spacing: .01rem

        .content
            flex: 1
            font-family: var(--font-interface)

            &.no-header
                #hero-section
                    display: none

                #content-section
                    margin-top: 0

            #hero-section
                user-select: none
                top: 0
                z-index: 100
                transition: all 200ms ease

                &.sticky
                    position: sticky

                &.scrolled.sticky
                    .hero-card
                        background: var(--color-background)
                        box-shadow: var(--shadow-elevation-medium)
                        border-radius: 0 0 var(--radius-l) var(--radius-l)
                        border: none
                
                .hero-card
                    text-align: center
                    min-height: 4rem
                    padding-inline: 1rem
                    border-bottom: 1px solid var(--color-border)
                    display: grid
                    grid-template-columns: 1fr auto 1fr
                    align-items: center
                    gap: 1rem
                    position: relative
                    transition: all 200ms ease

                    .sides
                        display: flex
                        align-items: center

                        &.start
                            justify-content: flex-start

                        &.end
                            justify-content: flex-end

                    .back-button
                        display: flex
                        align-items: center
                        justify-content: center
                        width: 3rem
                        height: 2.5rem
                        border-radius: 0
                        cursor: pointer
                        transition: all 100ms ease
                        border: none
                        outline: none
                        background-color: transparent
                        font-family: var(--font-icon)
                        font-size: 1.3rem
                        color: var(--color-text-soft)
                        padding: 0

                        &:hover
                            color: var(--color-text)

                    h1
                        font-size: 1.25rem
                        position: relative
                        margin: 0

                    .loader
                        position: absolute
                        bottom: 0
                        left: 0
                        right: 0
                        height: 2px

            #content-section
                margin: 2rem 0

                .limiter
                    display: flex
                    flex-direction: column

                .fab
                    position: fixed
                    bottom: 3rem
                    right: 3rem
                    z-index: 1000



    @media only screen and (max-width: 900px)
        .toggle-open
            display: flex

        .layout
            .menu
                width: 100%
                position: fixed
                z-index: 1000
                top: 0
                left: 0
                height: 100%
                overflow-y: auto
                transform: translateX(-100%)
                transition: transform 200ms cubic-bezier(0.22, 0.61, 0.36, 1)

                &.open
                    transform: translateX(0)
</style>