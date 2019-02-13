<template>
    <!-- toolbar vuetify dengan warna primary -->
    <v-toolbar color="primary" dark="">
        <!-- header bagian kiri -->
        <v-toolbar-side-icon v-if="isHome" @click="setSideBar(!sideBar)"></v-toolbar-side-icon>
        <v-btn v-if="!isHome" icon @click="$router.go(-1)">
            <v-icon>arrow_back</v-icon>
        </v-btn>
        <!-- header bagian tengah -->
        <v-toolbar-title class="white--text">{{ appName }}</v-toolbar-title>
        <!-- separator supaya header bagaian kanan posisinya rata kanan -->
        <v-spacer>
        </v-spacer>
        <!-- header bagian kanan -->
        <v-btn icon="">
            <v-badge color="orange" left="" overlap="">
                <span slot="badge">
                    1
                </span>
                <v-icon>
                    shopping_cart
                </v-icon>
            </v-badge>
        </v-btn>
        <!-- kolom pencarian di bawah header -->
        <v-text-field v-if="isHome" append-icon="mic" flat="" hide-details="" label="Search" prepend-inner-icon="search" slot="extension" solo-inverted="">
        </v-text-field>
    </v-toolbar>
</template>

<script>
    import {
        mapGetters,
        mapActions
    } from 'vuex'
export default {
    name: 'c-header',
    methods: { ...mapActions({
            setSideBar: 'setSideBar',
        }),
    },
    computed: 
    { 
        ...mapGetters({
            sideBar: 'sideBar',
        }),
        isHome () {
            return (this.$route.path==='/')
        },
    }
}
</script>