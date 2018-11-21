package com.jrj.quant.resampled;

import java.util.Date;
import java.util.Objects;

/**
 * Created by hefangxin on 2016/11/24.
 */
public abstract class Grouper<V,G> {
    Date groupDateTime;

    public Grouper(Date groupDateTime) {
        this.groupDateTime = groupDateTime;
    }

    public Date getDateTime()
    {
        return groupDateTime;
    }
    public abstract void addValue(V object);
    public abstract G getGrouped();

}
