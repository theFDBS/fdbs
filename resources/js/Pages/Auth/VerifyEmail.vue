<template>
    <FormSubLayout title="Email bestätigen" @submit="submit">
        <Head>
            <title>Email Bestätigung – FDBS Loginbereich</title>
        </Head>

        <Alert type="info" v-if="verificationLinkSent">
            Ein neuer Bestätigungslink wurde an die von Ihnen angegebene Emailadresse gesendet.
        </Alert>

        <p>
            <b>Vielen Dank für Ihre Registrierung!</b><br><br>
            Bevor Sie Zugriff auf den Loginbereich bekommen, bestätigen Sie bitte Ihre Email-Adresse, indem Sie auf den Link in der Email klicken.<br><br>
            Sobald Sie Ihre Email-Adresse bestätigt haben, können wir Sie freischalten.<br><br>
            Wenn Sie keine Email erhalten haben, können wir Ihnen die Email erneut senden.<br>
            <small>(Gucken Sie evtl. auch im Spam Ordner nach)</small>
        </p>

        <div class="flex gap v-center">
            <Link class="simple-button" :href="route('logout')">Abmelden</Link>
            <div class="spacer"></div>
            <mui-button label="Email erneut senden" :loading="form.processing"/>
        </div>
    </FormSubLayout>
</template>

<script setup>
    import { computed } from 'vue'
    import FormSubLayout from '@/Layouts/SubLayouts/Form.vue'
    import { Head, Link, useForm } from '@inertiajs/inertia-vue3'
    import Alert from '@/Components/Alert.vue'

    const props = defineProps({
        status: String,
    })

    const form = useForm()

    const submit = () => {
        form.post(route('verification.send'))
    }

    const verificationLinkSent = computed(() => props.status === 'verification-link-sent')
</script>
