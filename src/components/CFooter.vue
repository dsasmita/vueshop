<template>
    <v-footer dark="" height="auto">
        <v-flex xs12="">
            <v-card class="secondary darken-1 white--text text-xs-center" flat="" tile="">
                <!-- menu icon media sosial media -->
                <v-card-text>
                    <v-btn :key="icon" class="mx-3 white--text" icon="" v-for="icon in icons">
                        <v-icon size="24px">
                            {{ icon }}
                        </v-icon>
                    </v-btn>
                </v-card-text>
                <!-- deskripsi aplikasi -->
                <v-card-text class="white--text pt-0" v-if="isHome">
                    Lorem ipsum sit dolor amet ...
                </v-card-text>
                <v-layout justify-center="" row="" wrap="" v-if="isHome">
                    <!-- link menu halaman aplikasi -->
                    <v-btn :key="link" color="white" flat="" round="" v-for="link in links">
                        {{ link }}
                    </v-btn>
                    <!-- teks copyright -->
                    <v-flex darken-2="" py-3="" secondary="" text-xs-center="" white--text="" xs12="">
                        ©2018 — Vueshop powered by
                        <strong>
                            Vuetify
                        </strong>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
    </v-footer>
</template>
<script>
    export default {
data: () => ({
		// variabel icon sosial media yang ingin ditampilkan
		icons: [
			'fab fa-facebook',
			'fab fa-twitter',
			'fab fa-google-plus',
			'fab fa-linkedin',
			'fab fa-instagram'
		],
		// variabel link halaman yang ingin ditampilkan
		links: [
			'Home',
			'About Us',
			'Team',
			'Services',
			'Blog',
			'Contact Us'
		]
	}),
    computed: 
    { 
        isHome () {
            return (this.$route.path==='/')
        },
    }
}
</script>