package com.github.droibit.android.reactnativetodoplus.react.views;

import android.widget.CompoundButton;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.common.SystemClock;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.ViewProps;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by kumagai on 2016/04/14.
 */
public class ReactCheckboxManager extends SimpleViewManager<ReactCheckbox> {

    public static final String REACT_CLASS = "CheckboxAndroid";
    private static final CompoundButton.OnCheckedChangeListener ON_CHECKED_CHANGE_LISTENER =
            new CompoundButton.OnCheckedChangeListener() {
                @Override
                public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                    final ReactContext reactContext = (ReactContext) buttonView.getContext();
                    reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher().dispatchEvent(
                            new ReactCheckboxEvent(
                                    buttonView.getId(),
                                    SystemClock.nanoTime(),
                                    isChecked));
                }
            };

    /** {@inheritDoc} */
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    /** {@inheritDoc} */
    @Override
    protected ReactCheckbox createViewInstance(ThemedReactContext reactContext) {
        return new ReactCheckbox(reactContext);
    }

    /** {@inheritDoc} */
    @Override
    protected void addEventEmitters(ThemedReactContext reactContext, ReactCheckbox view) {
        view.setOnCheckedChangeListener(ON_CHECKED_CHANGE_LISTENER);
    }

    @ReactProp(name = ViewProps.ENABLED, defaultBoolean = true)
    public void setEnabled(ReactCheckbox view, boolean enabled) {
        view.setEnabled(enabled);
    }

    @ReactProp(name = ViewProps.ON)
    public void setOn(ReactCheckbox view, boolean on) {
        view.setOnCheckedChangeListener(null);
        view.setOn(on);
        view.setOnCheckedChangeListener(ON_CHECKED_CHANGE_LISTENER);
    }
}
