<template>
    <div>
        <v-subheader>
            Shipping Address
        </v-subheader>
        <div>
            <v-card flat="">
                <v-container>
                    <v-form lazy-validation="" ref="form">
                        <v-text-field append-icon="person" label="Name" required="" v-model="name">
                        </v-text-field>
                        <v-textarea auto-grow="" label="Address" required="" rows="3" v-model="address">
                        </v-textarea>
                        <v-text-field append-icon="phone" label="Phone" required="" v-model="phone">
                        </v-text-field>
                        <v-select :items="provinces" item-text="province" item-value="id" label="Province" persistent-hint="" single-line="" v-model="province_id">
                        </v-select>
                        <v-select :items="citiesByProvince" item-text="city" item-value="id" label="City" persistent-hint="" single-line="" v-if="province_id>0" v-model="city_id">
                        </v-select>
                    </v-form>
                    <v-card-actions>
                        <v-btn @click="saveShipping" color="success" dark="">
                            <v-icon>
                                save
                            </v-icon>
                            Save
                        </v-btn>
                    </v-card-actions>
                    <v-subheader>
                        Your Shopping Cart
                    </v-subheader>
                    <div v-if="countCart>0">
                        <v-card flat="">
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
                                                    ({{ item.quantity }} item)
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
                        </v-card>
                    </div>
                    <v-container>
                        <v-card-actions>
                            Subtotal
                            <v-spacer>
                            </v-spacer>
                            Rp. {{ totalPrice.toLocaleString('id-ID') }}
                        </v-card-actions>
                    </v-container>
                    <v-subheader>
                        Courier
                    </v-subheader>
                    <div>
                        <v-card flat="">
                            <v-container>
                                <v-select :items="couriers" @change="getServices" item-text="text" item-value="id" label="Courier" persistent-hint="" single-line="" v-model="courier">
                                </v-select>
                                <v-select :items="services" @change="calculateBill" item-text="resume" item-value="service" label="Courier Service" persistent-hint="" single-line="" v-if="courier" v-model="service">
                                </v-select>
                                <v-card-actions>
                                    Subtotal
                                    <v-spacer>
                                    </v-spacer>
                                    Rp. {{ shippingCost.toLocaleString('id-ID') }}
                                </v-card-actions>
                            </v-container>
                        </v-card>
                    </div>
                    <v-subheader>
                        Total
                    </v-subheader>
                    <v-card>
                        <v-container>
                            <v-layout row="" wrap="">
                                <v-flex text-xs-center="" xs6="">
                                    Total Bill ({{ totalQuantity }} items)
                                    <div class="title">
                                        {{ totalBill.toLocaleString('id-ID') }}
                                    </div>
                                </v-flex>
                                <v-flex text-xs-center="" xs6="">
                                    <v-btn color="orange">
                                        <v-icon light="">
                                            attach_money
                                        </v-icon>
                                        Pay
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-container>
            </v-card>
        </div>
    </div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    data() {
        return {
            name: '',
            address: '',
            phone: '',
            province_id: 0,
            city_id: 0,
            courier: '',
            couriers: [],
            service: '',
            services: [],
            shippingCost: 0,
            totalBill: 0,
        }
    },
    computed: { 
        ...mapGetters({
            user: 'auth/user',
            provinces: 'region/provinces',
            cities: 'region/cities',
            carts: 'cart/carts',
            countCart: 'cart/count',
            totalPrice: 'cart/totalPrice',
            totalQuantity : 'cart/totalQuantity',
            totalWeight: 'cart/totalWeight',
        }),
        citiesByProvince() {
            let province_id = this.province_id
            return this.cities.filter(function(city) {
                if (city.province_id == province_id){
                	return city
                }
            })
        },
    },
    methods: { 
        ...mapActions({
            setAlert: 'alert/set',
            setAuth: 'auth/set',
            setProvinces: 'region/setProvinces',
            setCities: 'region/setCities',
            setCart: 'cart/set'
        }),
        saveShipping() {
            let formData = new FormData()
            formData.set('name', this.name)
            formData.set('address', this.address)
            formData.set('phone', this.phone)
            formData.set('province_id', this.province_id)
            formData.set('city_id', this.city_id)
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + this.user.api_token,
                },
            }
            this.axios.post('/shipping', formData, config).then((response) => {
                this.setAuth(response.data.data)
                this.setAlert({
                    status: true,
                    text: response.data.message,
                    type: 'success',
                })
            }).catch((error) => {
                let responses = error.response
                this.setAlert({
                    status: true,
                    text: responses.data.message,
                    type: 'error',
                })
            })
        },
        getServices() {
            let courier = this.courier
            let encodedCart = JSON.stringify(this.carts)
            console.log(encodedCart)
            let formData = new FormData()
            formData.set('courier', this.courier)
            formData.set('carts', encodedCart);
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + this.user.api_token,
                },
            }
            this.axios.post('/services', formData, config).then((response) => {
                let response_data = response.data
                // jika tidak error maka data service dan cart akan diupdate.
                if (response_data.status != 'error') {
                    this.services = response_data.data.services
                    this.setCart(response_data.data.safe_carts)
                }
                this.setAlert({
                    status: true,
                    text: response_data.message,
                    type: response_data.status,
                })
            }).catch((error) => {
                //console.log(error)
                let responses = error.response
                this.setAlert({
                    status: true,
                    text: responses.data.message,
                    type: 'error',
                })
            })
        },
        calculateBill() {
            let selectedService = this.services.find((service) => {
                return (service.service == this.service)
            })
            this.shippingCost = selectedService.cost
            this.totalBill = parseInt(this.totalPrice) + parseInt(this.shippingCost)
        },
    },
    created() {
        this.name = this.user.name
        this.address = this.user.address
        this.phone = this.user.phone
        this.city_id = this.user.city_id
        this.province_id = this.user.province_id
        if (this.provinces && this.provinces.length == 0) {
            this.axios.get('/provinces').then((response) => {
                this.setProvinces(response.data.data)
            })
            this.axios.get('/cities').then((response) => {
                this.setCities(response.data.data)
            })
        }

        if(this.couriers.length==0){
            this.axios.get('/couriers')
                .then((response) => {
                    this.couriers = response.data.data
            })
        }
    }
}
</script>