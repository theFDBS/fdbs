<template>
    <div class="wrapper" :class="{'selected': isSelected}">
        <div class="preview-area" v-tooltip="item.displayVisual.tooltip">
            <div class="image-preview" v-if="item.image" v-show="enablePreview">
                <img :src="item.image" />
            </div>
            <div class="icon" v-show="(!item.image || !enablePreview)" :style="`color: ${item.displayVisual.color};`">{{ item.displayVisual.icon }}</div>
        </div>

        <div class="title-area" v-tooltip="item.name">{{ item.name }}</div>

        <div class="info-area">
            <div class="file-info">
                <!-- <span class="extension" :style="`color: ${item.visual.color};`">{{ item.category.name }}</span> -->
            </div>
            <div class="spacer"></div>
            <VDropdown placement="bottom-end">
                <button @click.stop>more_vert</button>
                <template #popper>
                    <div class="dropdown">
                        <div class="group" v-for="(group, i) in item.displayActions" :key="i">
                            <mui-button
                                v-close-popper
                                class="dropdown-button"
                                variant="text"
                                v-for="action in group"
                                :key="action.id"
                                :label="action.tooltip"
                                :icon-left="action.icon"
                                :style="`--color: ${action.color};`"
                                @click="$emit(action.action, item)"
                            />
                        </div>
                    </div>
                </template>
            </VDropdown>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue'
    
    const props = defineProps({
        item: {
            type: Object,
            required: true,
        },
        enablePreview: {
            type: Boolean,
            default: false,
        },
        selection: {
            type: Array,
            default: () => [],
        },
    })

    const isSelected = computed(() => {
        return props.selection.includes(props.item.id)
    })
</script>

<style lang="sass" scoped>
    .wrapper
        display: flex
        flex-direction: column
        align-items: center
        background: var(--color-background)
        box-shadow: var(--shadow-elevation-low)
        border-radius: var(--radius-m)
        user-select: none
        cursor: pointer
        position: relative

        &::after
            content: ''
            box-sizing: border-box
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            border-radius: inherit
            border: 1px solid transparent
            pointer-events: none
            transition: border-width 200ms ease-in-out

        &:hover::after
            border-color: var(--color-info)

        &.selected::after
            border-width: 3px
            border-color: var(--color-info)

        .preview-area
            aspect-ratio: 1
            width: 100%
            display: flex
            align-items: center
            justify-content: center
            border-radius: var(--radius-m) var(--radius-m) 0 0
            overflow: hidden

            .image-preview
                width: calc(100% - 1rem)
                height: calc(100% - 1rem)
                margin: .5rem
                border-radius: var(--radius-s)
                overflow: hidden
                display: flex
                align-items: center
                justify-content: center
                position: relative
                --height: 10%
                background-image: linear-gradient(45deg, #b4b4b4 25%, transparent 25%), linear-gradient(-45deg, #b4b4b4 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #b4b4b4 75%), linear-gradient(-45deg, transparent 75%, #b4b4b4 75%)
                background-size: calc(var(--height) / 2) calc(var(--height) / 2)
                background-position: 0 0, 0 calc(var(--height) / 4), calc(var(--height) / 4) calc(var(--height) / 4 * -1), calc(var(--height) / 4 * -1) 0px

                img
                    width: 100%
                    height: 100%
                    object-fit: cover
                    position: absolute
                    top: 0
                    left: 0
            .icon
                font-family: var(--font-icon)
                font-size: 3rem
                color: var(--color-primary)
                aspect-ratio: 1
                width: 80px
                display: flex
                align-items: center
                justify-content: center
                position: relative
                border-radius: var(--radius-m)
                overflow: hidden

                &::after
                    content: ''
                    position: absolute
                    top: 0
                    left: 0
                    width: 100%
                    height: 100%
                    background: currentColor
                    opacity: .2
                    pointer-events: none
        
        .title-area
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            width: 100%
            padding: .5rem 1rem
            text-align: center
            font-size: .9rem
            font-family: var(--font-heading)
            color: var(--color-text)
            border-bottom: 1px solid var(--color-border)

        .info-area
            display: flex
            align-items: center
            width: 100%
            padding: .5rem .5rem .5rem 1rem

            .file-info
                display: flex
                align-items: center
                gap: .5rem

                .extension
                    position: relative
                    max-width: 8rem
                    height: 1.2rem
                    line-height: 1.2rem
                    padding: 0 .3rem
                    font-size: .7rem
                    font-family: var(--font-heading)
                    font-weight: 600
                    text-transform: uppercase
                    color: var(--color-text)
                    overflow: hidden
                    text-overflow: ellipsis
                    white-space: nowrap
                    border-radius: var(--radius-s)

                    &::after
                        content: ''
                        position: absolute
                        top: 0
                        left: 0
                        width: 100%
                        height: 100%
                        background: currentColor
                        opacity: .2
                        border-radius: inherit

                .filesize
                    font-size: .8rem

            button
                font-family: var(--font-icon)
                background: none
                border: none
                color: var(--color-text-soft)
                font-size: 1.3rem
                height: 2.2rem
                width: 2.2rem
                display: flex
                align-items: center
                justify-content: center
                cursor: pointer
                border-radius: 50%

                &:hover
                    background: #00000010
                    color: var(--color-text)

    .dropdown
        display: flex
        flex-direction: column
        gap: 0

        .group
            display: flex
            flex-direction: column
            padding-block: .5rem
            border-bottom: 1px solid var(--color-border)

            &::last-child
                border-bottom: none

            .dropdown-button
                height: 3rem !important
                border-radius: 0 !important
                justify-content: flex-start !important
                --primary: var(--color) !important
</style>