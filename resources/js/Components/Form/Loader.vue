<template>
    <div class="progress-bar">
        <div class="indeterminate"></div>
    </div>
</template>

<style lang="sass" scoped>
.progress-bar
    position: relative
    height: 3px
    display: block
    width: 100%
    color: var(--color-primary)
    background: var(--color-background)
    overflow: hidden

    &:before
        content: ''
        position: absolute
        background-color: currentColor
        top: 0
        left: 0
        bottom: 0
        right: 0
        opacity: .2

    .indeterminate
        background-color: currentColor

        &:before
            content: ''
            position: absolute
            background-color: inherit
            top: 0
            left: 0
            bottom: 0
            will-change: left, right
            animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite
        
        &:after
            content: ''
            position: absolute
            background-color: inherit
            top: 0
            left: 0
            bottom: 0
            will-change: left, right
            animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite
            animation-delay: 1.15s

    @keyframes indeterminate
        0%
            left: -35%
            right: 100%
        60%
            left: 100%
            right: -90%
        100%
            left: 100%
            right: -90%

    @keyframes indeterminate-short
        0%
            left: -200%
            right: 100%
        60%
            left: 107%
            right: -8%
        100% 
            left: 107%
            right: -8%
</style>