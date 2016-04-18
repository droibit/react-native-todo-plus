package com.github.droibit.android.reactnativetodoplus.react.views;

import android.view.View;
import android.view.ViewGroup;
import android.widget.CompoundButton;

import com.facebook.csslayout.CSSNode;
import com.facebook.csslayout.MeasureOutput;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.common.SystemClock;
import com.facebook.react.uimanager.LayoutShadowNode;
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

    static class ReactCheckboxShadowNode extends LayoutShadowNode implements
            CSSNode.MeasureFunction {

        private int mWidth;
        private int mHeight;
        private boolean mMeasured;

        private ReactCheckboxShadowNode() {
            setMeasureFunction(this);
        }

        @Override
        public void measure(CSSNode node, float width, float height, MeasureOutput measureOutput) {
            if (!mMeasured) {
                // Create a checkbox with the default config and measure it; since we don't (currently)
                // support setting custom switch text, this is fine, as all switches will measure the same
                // on a specific device/theme/locale combination.
                final ReactCheckbox reactCheckbox = new ReactCheckbox(getThemedContext());
                final int spec = View.MeasureSpec.makeMeasureSpec(
                        ViewGroup.LayoutParams.WRAP_CONTENT,
                        View.MeasureSpec.UNSPECIFIED);
                reactCheckbox.measure(spec, spec);
                mWidth = reactCheckbox.getMeasuredWidth();
                mHeight = reactCheckbox.getMeasuredHeight();
                mMeasured = true;
            }
            measureOutput.width = mWidth;
            measureOutput.height = mHeight;
        }
    }

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
