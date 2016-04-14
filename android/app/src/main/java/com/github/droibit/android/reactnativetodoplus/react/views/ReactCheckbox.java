package com.github.droibit.android.reactnativetodoplus.react.views;

import android.content.Context;
import android.widget.CheckBox;

/**
 * @see com.facebook.react.views.switchview.ReactSwitch
 */
/*package*/ class ReactCheckbox extends CheckBox {

    private boolean mAllowChange;

    public ReactCheckbox(Context context) {
        super(context);
        mAllowChange = true;
    }

    /** {@inheritDoc} */
    @Override
    public void setChecked(boolean checked) {
        if (mAllowChange) {
            mAllowChange = false;
            super.setChecked(checked);
        }
    }

    /*package*/ void setOn(boolean on) {
        // If the switch has a different value than the value sent by JS, we must change it.
        if (isChecked() != on) {
            super.setChecked(on);
        }
        mAllowChange = true;
    }
}
