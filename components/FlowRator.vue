<template>
    <div
        class="relative flex flex-col items-center justify-between min-h-screen bg-neutral-700 sm:items-center sm:pt-0"
    >
        <h1 class="text-center text-2xl md:text-4xl py-4 text-white">
            FlowRator
        </h1>

        <div
            v-if="tests.length"
            class="text-center mb-6"
        >
            <div class="text-white md:text-lg">
                Last Value:
            </div>
            <div class="text-5xl md:text-6xl text-lime-500">
                {{ tests[0].value }}
            </div>
            <div class="text-white text-sm md:text-base">
                gal/min
            </div>
        </div>

        <div class="flex-1 text-white text-lg md:text-2xl px-8">
            <div
                v-for="(test, index) in tests"
                :key="test.start"
                :class="{ 'md:mt-1': index > 0 }"
            >
                {{ index + 1 }}: Time {{ test.elapsed }} Flow rate: {{ test.value }}
            </div>
        </div>

        <div
            v-if="elapsed"
            class="px-16 py-4 w-full min-h-[24px] text-3xl md:text-4xl text-white flex justify-center"
        >
            <div>Timer</div>
            <div class="ml-6 md:ml-10">
                {{ elapsed }}
            </div>
        </div>

        <div class="px-16 py-6 w-full text-white">
            <label
                class="mx-auto"
                for="sample-size"
            >
                Sample Size
            </label>
            <select
                id="sample-size"
                v-model="sample"
                class="w-full mt-2 border text-center py-2 md:py-3 text-2xl bg-transparent"
            >
                <option
                    v-for="gallons in [1, 2, 3, 4, 5]"
                    :key="gallons"
                    :value="gallons"
                    class="text-gray-900"
                >
                    {{ gallons }}
                    {{ gallons === 1 ? 'Gallon' : 'Gallons' }}
                </option>
            </select>
        </div>

        <button
            ref="startStopButton"
            :class="stop || !start ? 'bg-lime-500' : 'bg-red-500'"
            class="w-full h-[120px] text-center text-white text-4xl uppercase"
            type="button"
            @click.prevent="startStop"
        >
            {{ startStopText }}
        </button>
    </div>
</template>

<script>
    const MAX_RESULTS = 5;

    export default {
        name: 'FlowRator',

        data() {
            return {
                timer: null, // used for updating/displaying the elapsed time
                sample: 1,
                start: null,
                stop: null,
                elapsed: null,
                tests: [],
            };
        },

        computed: {
            startStopText() {
                return this.stop || !this.start ? 'Start' : 'Stop';
            },
        },

        methods: {
            startStop() {
                // timer has started
                if ( this.timer ) {
                    this.stopTimer();

                    // timer is stopped
                } else {
                    this.startTimer();
                }
            },

            startTimer() {
                this.elapsed = null;
                this.stop = null;
                this.start = new Date;

                // use a litte randomness each run for how often the timer gets redrawn
                // this looks better when simulating the stopwatch effect
                const interval = this.randomInteger(51, 87);
                this.timer = setInterval(this.calculateElapsed, interval);
            },

            stopTimer() {
                // record the stop time
                this.stop = new Date;

                // clear the timer
                clearInterval(this.timer);
                this.timer = null;

                // do final elapsed calculation
                this.calculateElapsed();

                // save the test results
                this.$nextTick(() => {
                    this.tests.unshift({
                        start: Number(this.start),
                        stop: Number(this.stop),
                        elapsed: this.elapsed,
                        sample: this.sample,
                        value: this.calculateValue(),
                    });

                    // prune old tests
                    if ( this.tests.length > MAX_RESULTS ) {
                        this.tests.pop();
                    }
                });
            },

            calculateElapsed() {
                this.elapsed = this.start
                    ? Number(((this.stop ?? new Date) - this.start) / 1000).toFixed(3)
                    : null;
            },

            calculateValue() {
                return this.elapsed
                    ? Number(this.sample / this.elapsed * 60).toFixed(3)
                    : 0;
            },

            randomInteger(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
        },

    };
</script>
