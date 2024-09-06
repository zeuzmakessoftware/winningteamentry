<script lang="ts">
    export let companyName: string;
    export let industry = "Real Estate";
    export let hasUsers: boolean = true;
    export let hasRevenue: boolean = false;
    export let hasProduct: boolean = false;
    export let raiseAmount: number = 100000;
    export let committedCapital: number = 20000; 
</script>

<div class="container mx-auto p-4 md:p-3 border border-black/25 rounded-lg shadow-md relative">
    <button disabled class="absolute top-2 right-2 bg-black/30 text-white px-3 py-1 md:px-2 md:py-0.5 text-sm md:text-xs rounded-md">open</button>
    <h2 class="text-xl md:text-lg font-semibold">{companyName}</h2>
    <h2 class="text-lg md:text-base mb-4 md:mb-3">{industry}</h2>
    <h2 class="text-lg md:text-base font-semibold">Progress</h2>
    <div class="flex justify-between space-x-4 md:space-x-2 mb-2 md:mb-1">
        <div class="flex items-center" class:opacity-25={!hasRevenue}>
            <span class="mr-1 text-sm md:text-xs">revenue</span>
            <iconify-icon icon="solar:check-circle-bold" class="md:text-sm" style={hasRevenue ? "color: #00a542;" : ""}></iconify-icon>
        </div>
        <div class="flex items-center" class:opacity-25={!hasUsers}>
            <span class="mr-1 text-sm md:text-xs">users</span>
            <iconify-icon icon="solar:check-circle-bold" class="md:text-sm" style={hasUsers ? "color: #00a542;" : ""}></iconify-icon>
        </div>
        <div class="flex items-center" class:opacity-25={!hasProduct}>
            <span class="mr-1 text-sm md:text-xs">product</span>
            <span class="mr-1">product</span>
            <iconify-icon icon="solar:check-circle-bold" style={hasProduct ? "color: #00a542;" : ""}></iconify-icon>
        </div>
    </div>
    <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold">Raising</h2>
        <span class="text-lg">${committedCapital} / ${raiseAmount}</span>
    </div>
</div>