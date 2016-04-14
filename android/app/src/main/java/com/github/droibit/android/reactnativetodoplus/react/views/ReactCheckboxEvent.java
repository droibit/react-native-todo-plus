package com.github.droibit.android.reactnativetodoplus.react.views;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by kumagai on 2016/04/14.
 */
/*package*/ class ReactCheckboxEvent extends Event<ReactCheckboxEvent> {

    // FIXME:
    private static final String EVENT_NAME = "topChanged";
    private final boolean isChecked;

    public ReactCheckboxEvent(int viewId, long timestampMs, boolean isChecked) {
        super(viewId, timestampMs);

        this.isChecked = isChecked;
    }

    /** {@inheritDoc} */
    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    /** {@inheritDoc} */
    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), serializeEventData());
    }

    private WritableMap serializeEventData() {
        final WritableMap eventData = Arguments.createMap();
        eventData.putInt("target", getViewTag());
        eventData.putBoolean("value", isChecked);
        return eventData;
    }

    public boolean isChecked() {
        return isChecked;
    }
}
