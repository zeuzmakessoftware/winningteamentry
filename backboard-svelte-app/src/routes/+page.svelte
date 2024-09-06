<script lang="ts">
  import CompanySummary from "$lib/CompanySummary.svelte";
</script>

<div class="m-10">
  <div class="flex flex-col lg:flex-row lg:flex-wrap gap-6">
    <div class="w-full lg:w-1/3 lg:flex-grow lg:max-w-[calc(33.33%-1rem)]">
      <CompanySummary companyName={"Airbnb"}></CompanySummary>
    </div>
    <div class="w-full lg:w-1/3 lg:flex-grow lg:max-w-[calc(33.33%-1rem)]">
      <CompanySummary companyName={"Uber"} industry={"Transportation"}></CompanySummary>
    </div>
    <div class="w-full lg:w-1/3 lg:flex-grow lg:max-w-[calc(33.33%-1rem)]">
      <CompanySummary companyName={"Lyft"} industry={"Transportation"}></CompanySummary>
    </div>
    <div class="w-full lg:w-1/3 lg:flex-grow lg:max-w-[calc(33.33%-1rem)]">
      <CompanySummary companyName={"Waymo"} industry={"Transportation"}></CompanySummary>
    </div>
  </div>
</div>

<style>
</style>
