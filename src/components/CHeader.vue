<template>
    <!-- toolbar vuetify dengan warna primary -->
    <v-toolbar color="primary" dark="">
        <!-- header bagian kiri -->
        <v-toolbar-side-icon @click="setSideBar(!sideBar)">
        </v-toolbar-side-icon>
        <!-- header bagian tengah -->
        <v-toolbar-title class="white--text">
            Vueshop
        </v-toolbar-title>
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
        <v-text-field append-icon="mic" flat="" hide-details="" label="Search" prepend-inner-icon="search" slot="extension" solo-inverted="">
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
    computed: { ...mapGetters({
            sideBar: 'sideBar',
        }),
    }
}
</script>