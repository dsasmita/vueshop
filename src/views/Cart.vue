<template>
    <v-card>
        <v-toolbar color="primary" dark="">
            <v-btn @click="close" dark="" icon="">
                <v-icon>
                    close
                </v-icon>
            </v-btn>
            <v-toolbar-title>
                Your Shopping Cart
            </v-toolbar-title>
            <v-spacer>
            </v-spacer>
        </v-toolbar>
        <v-divider>
        </v-divider>
        <div v-if="countCart===0">
            <v-alert color="success" icon="new_releases" value="true">
                Keranjang belanja kosong!
            </v-alert>
        </div>
        <div v-else="">
            <v-list two-line="">
                <template v-for="item in carts">
                    <v-list-tile :key="item.id" avatar="">
                        <v-list-tile-avatar>
                            <img :src="getImage('/books/'+item.cover)">
                            </img>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title v-html="item.title">
                            </v-list-tile-title>
                            <v-list-tile-sub-title>
                                Rp. {{ item.price.toLocaleString('id-ID') }}
                                <span style="float:right">
                                    <v-btn @click.stop="removeCart(item)" depressed="" icon="" rounded="" small="">
                                        <v-icon color="error" dark="">
                                            remove_circle
                                        </v-icon>
                                    </v-btn>
                                    {{ item.quantity }}
                                    <v-btn @click.stop="addCart(item)" depressed="" icon="" rounded="" small="">
                                        <v-icon color="success" dark="">
                                            add_circle
                                        </v-icon>
                                    </v-btn>
                                </span>
                            </v-list-tile-sub-title>
                            <v-list-tile-sub-title>
                                <v-divider>
                                </v-divider>
                            </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-list-tile-action-text>
                                {{ item.weight }} kg
                            </v-list-tile-action-text>
                        </v-list-tile-action>
                    </v-list-tile>
                </template>
            </v-list>
            <v-card>
                <v-layout row="" wrap="">
                    <v-flex text-xs-center="" xs6="">
                        Total Price ({{ totalQuantity }} items)
                        <div class="title">
                            {{ totalPrice.toLocaleString('id-ID') }}
                        </div>
                    </v-flex>
                    <v-flex text-xs-center="" xs6="">
                        <v-btn @click="checkout" color="orange" dark="">
                            <v-icon>
                                check_circle
                            </v-icon>
                            Checkout
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-card>
        </div>
    </v-card>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    name: 'cart',
    computed: { 
    	...mapGetters({
            carts: 'cart/carts',
            countCart: 'cart/count',
            totalPrice: 'cart/totalPrice',
            totalQuantity: 'cart/totalQuantity',
            totalWeight: 'cart/totalWeight',
        }),
    },
    methods: { 
    	...mapActions({
            setStatusDialog: 'dialog/setStatus',
            setAlert: 'alert/set',
            addCart: 'cart/add',
            removeCart: 'cart/remove',
            setCart: 'cart/set',
        }),
        close() {
            this.setStatusDialog(false)
        },
        checkout() {
            this.close()
            this.$router.push({
                path: "/checkout"
            })
        }
    },
}
</script>