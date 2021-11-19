<template>
  <b-container class="bv-example-row mt-5 text-center">
    <b-table :fields="fields" :items="items">
      <template #cell(name)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        {{ data.value }}
      </template>
    </b-table>
  </b-container>
</template>

<script>
/* eslint-disable */
export default {
    name: "FooterBar",
    data() {
        return {
            fields: [
                {
                    // A column that needs custom formatting,
                    // calling formatter 'fullName' in this app
                    key: "name",
                    label: "Full Name",
                    formatter: "fullName",
                },
                // A regular column
                "age",
                {
                    // A regular column with custom formatter
                    key: "sex",
                    formatter: (value) => {
                        return value.charAt(0).toUpperCase();
                    },
                },
                {
                    // A virtual column with custom formatter
                    key: "birthYear",
                    label: "Calculated Birth Year",
                    formatter: (value, key, item) => {
                        return new Date().getFullYear() - item.age;
                    },
                },
            ],
            items: [
                { name: { first: "John", last: "Doe" }, sex: "Male", age: 42 },
                {
                    name: { first: "Jane", last: "Doe" },
                    sex: "Female",
                    age: 36,
                },
                {
                    name: { first: "Rubin", last: "Kincade" },
                    sex: "male",
                    age: 73,
                },
                {
                    name: { first: "Shirley", last: "Partridge" },
                    sex: "female",
                    age: 62,
                },
            ],
        };
    },
    methods: {
        fullName(value) {
            return `${value.first} ${value.last}`;
        },
    },
};
</script>

<style>
</style>