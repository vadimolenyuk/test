<template>
    <div id="order-list" class="orders">
        <nav class="level is-mobile">
            <div class="level-left">
                <div class="level-item">
                    <h5 class="subtitle is-5">
                        {{ $t("Interface.Order.List.Title") }}
                    </h5>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <b-select v-model="ItemsPerPage">
                        <option value="10">
                            {{ $tc('Interface.Order.List.PerPage', 10, { items: 10 }) }}
                        </option>
                        <option value="25">
                            {{ $tc('Interface.Order.List.PerPage', 25, { items: 25 }) }}
                        </option>
                        <option value="50">
                            {{ $tc('Interface.Order.List.PerPage', 50, { items: 50 }) }}
                        </option>
                    </b-select>
                </div>
            </div>
        </nav>
        <b-table
            :data="Orders"
            :striped="true"
            :hoverable="true"
            :mobile-cards="true"
            :paginated="true"
            :backend-pagination="true"
            :per-page="ItemsPerPage"
            :current-page.sync="PageNumber"
            :total="TotalItems"
            :loading="IsLoading"
            detailed
        >
            <template slot-scope="props">
                <b-table-column field="ProcessingOrderId" :label="$t('Interface.Order.List.Table.ID')" sortable>
                    {{ props.row.ProcessingOrderId }}
                </b-table-column>

                <b-table-column field="Created" :label="$t('Interface.Order.List.Table.Date')">
                    {{ props.row.Created ? new Date(props.row.Created).toLocaleDateString() + " " + new Date(props.row.Created).toLocaleTimeString() : '' }}
                </b-table-column>

                <b-table-column field="Price" :label="$t('Interface.Order.List.Table.Send')" numeric>
                    {{ props.row.Price }} {{ props.row.From }}
                </b-table-column>

                <b-table-column field="PaymentAddress" :label="$t('Interface.Order.List.Table.PaymentAddress')" class="is-hidden-mobile">
                    {{ props.row.PaymentAddress | truncate(10) }}
                </b-table-column>

                <b-table-column field="Amount" :label="$t('Interface.Order.List.Table.Get')" numeric>
                    {{ props.row.Amount | truncate(10) }} {{ props.row.To }}
                </b-table-column>

                <b-table-column field="ReceiverAddress" :label="$t('Interface.Order.List.Table.ReceiverAddress')" class="is-hidden-mobile">
                    {{ props.row.ReceiverAddress | truncate(10) }}
                </b-table-column>

                <b-table-column field="OrderStatus" :label="$t('Interface.Order.List.Table.Status')" sortable>
                    <template v-if="props.row.OrderStatus === 'Waiting'">
                        <b-tag type="is-theme">
                            {{ props.row.OrderStatus }}
                        </b-tag>
                    </template>
                    <template v-else-if="props.row.OrderStatus === 'Paid'">
                        <b-tag type="is-info">
                            {{ props.row.OrderStatus }}
                        </b-tag>
                    </template>
                    <template v-else-if="props.row.OrderStatus === 'Delivering'">
                        <b-tag type="is-warning">
                            {{ props.row.OrderStatus }}
                        </b-tag>
                    </template>
                    <template v-else-if="props.row.OrderStatus === 'Completed'">
                        <b-tag type="is-success">
                            {{ props.row.OrderStatus }}
                        </b-tag>
                    </template>
                </b-table-column>
            </template>

            <template slot="detail" slot-scope="props">
                <order-details :order="props.row" />
            </template>

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="table-search"
                                size="is-large"
                            />
                        </p>
                        <p>{{ $t("Interface.Order.List.NoData") }}</p>
                    </div>
                </section>
            </template>
        </b-table>
    </div>
</template>

<script>
import LoadingState from "@/mixins/LoadingState"
import DetailsOrder from "@/components/Order/Details"
import { ORDER_LIST_REQUEST } from "@/store/actions/order"

export default {
    name: "OrderList",
    components: {
        "order-details": DetailsOrder
    },
    filters: {
        // Filter to truncate string, accepts a length parameter
        truncate(value, length) {
            return (value && value.length > length)
                ? value.substr(0, length) + "..."
                : value
        }
    },
    mixins: [LoadingState],
    data() {
        return {
            IsEmpty: true,
            PageNumber: 1,
            ItemsPerPage: 10,
            TotalItems: 0,
            Orders: []
        }
    },
    watch: {
        PageNumber() {
            if (this.PageNumber)
                this.getOrders()
        },
        ItemsPerPage() {
            if (this.ItemsPerPage)
                if (this.PageNumber === 1) this.getOrders()
                else this.PageNumber = 1
        }
    },
    mounted() {
        this.getOrders()
    },
    methods: {
        getOrders() {
            this.switchLoading()
            this.$store.dispatch(ORDER_LIST_REQUEST, {
                PageNumber: this.PageNumber - 1,
                ItemsPerPage: this.ItemsPerPage
            })
                .then(response => {
                    if (response.data) {
                        this.Orders = response.data.Items
                        this.TotalItems = response.data.TotalItems
                    }
                })
                .catch(() => {

                })
                .finally(() => {
                    this.switchLoading()
                })
        }
    }
}
</script>
