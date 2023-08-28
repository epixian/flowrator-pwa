import FlowRator from '@/components/FlowRator.vue';
import { mount } from '@vue/test-utils';

describe('FlowRator', () => {
    const app = mount(FlowRator).vm;

    test('is a Vue instance', () => {
        expect(app).toBeTruthy();
    });

    test('clicking Start Stop button records a test', async () => {
        const start_stop_button = app.$refs.startStopButton;
        start_stop_button.click();
        expect(app.startStopText).toEqual('Stop');
        expect(app.tests.length).toEqual(0);

        start_stop_button.click();
        expect(app.startStopText).toEqual('Start');

        await app.$nextTick();
        expect(app.tests.length).toEqual(1);
    });

    test('1 gallon in 10 seconds equals 6 gal/min', () => {
        app.sample = 1;
        app.start = new Date(2023, 1, 1, 1, 0, 0);
        app.stop = new Date(2023, 1, 1, 1, 0, 10);
        app.calculateElapsed();

        expect(app.calculateValue()).toEqual(Number(6).toFixed(3));
    });

    test('5 gallons in 10 seconds equals 30 gal/min', () => {
        app.sample = 5;
        app.start = new Date(2023, 1, 1, 1, 0, 0);
        app.stop = new Date(2023, 1, 1, 1, 0, 10);
        app.calculateElapsed();

        expect(app.calculateValue()).toEqual(Number(30).toFixed(3));
    });
});

