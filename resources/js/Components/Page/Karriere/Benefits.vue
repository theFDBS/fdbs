<template>
    <h2 class="benefits-headline"></h2>
    
    <div class="grid">
        <IconCard icon="spa" title="30 Tage Urlaub" text="30 Tage Jahresurlaub. Zeit für Familie, Freunde, Reisen und Freizeit."/>
        <IconCard icon="shopping_bag" title="Corporate Benefits" text="Geld sparen bei jedem Einkauf bei über 800 Partnern mit Corporate Shopping."/>
        <IconCard icon="favorite" title="Gesundheit" text="Einen ergonomischen Arbeitsplatz und freiwillige Gesundheitsmaßnahmen."/>
        <IconCard icon="local_bar" title="Teamevents" text="Gemeinsame Events stärken den Zusammenhalt."/>
        <IconCard icon="school" title="Weiterbildung" text="Seminare, Coachings und Online Trainings."/>
        <IconCard icon="percent" title="Mitarbeiterrabatt" text="Du bekommst unser gesamtes Sortiment zu günstigen Mitarbeiterpreisen."/>
        <IconCard icon="airport_shuttle" title="Verkehrsanbindung" text="Für deine entspannte Anreise: Exzellente Anbindung an die A2 sowie öffentliche Verkehrsmittel."/>
        <IconCard icon="groups" title="Flache Hierarchien" text="Mehr Spaß bei der Arbeit: eine kollegiale Arbeitsatmosphäre."/>
        <IconCard icon="reviews" title="Direkter Ansprechpartner" text="Einen festen Ansprechpartner und regelmäßige Feedbackgespräche."/>
        <IconCard icon="pedal_bike" title="Jobfahrrad" text="Ein umweltfreundlicher und gesunder Weg zur Arbeit."/>
        <IconCard icon="styler" title="Firmenkleidung" text="Hochwertige Kleidung für alle Mitarbeitenden."/>
        <IconCard icon="savings" title="Betriebliche Altersvorsorge" text="Im Alter abgesichert."/>
    </div>
</template>

<script setup>
    import IconCard from '@/Components/Page/IconCard.vue'
</script>

<style lang="sass" scoped>
    .grid
        display: grid
        gap: 3rem
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
</style>