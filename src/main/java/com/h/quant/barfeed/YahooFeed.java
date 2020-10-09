package com.h.quant.barfeed;

import com.h.quant.data.BasicBar;
import com.h.quant.data.IBar;

import java.io.FileReader;
import java.io.Reader;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Created by hefangxin on 2016/11/22.
 */
public class YahooFeed extends MemBFBarFeed {
    int timezone = 8;
    boolean sanitizeBars = false;//清洗过的数据
    Class barClass = BasicBar.class;
    YahooRowParser rowParser = new YahooRowParser();


    @Override
    public Date getCurrentDateTime() {
        return null;
    }

    public boolean barsHaveAdjClose() {
        return true;
    }

    static Map<String, List<IBar>> map = new ConcurrentHashMap<>();


    public void addBarsFromCSV(String instrument, String path, Integer timezone) throws Exception {
        if (timezone == null)

            timezone = this.timezone;

        List<IBar> barList;
        if (map.containsKey(instrument)) {
            barList = map.get(instrument);
        } else {
            barList = new ArrayList<>();
            CSVFileUtil cf = new CSVFileUtil(path);

            do {
                Map<String, String> dict = cf.getLineDict();
                if (dict == null)
                    break;
                IBar bar = rowParser.parseBar(dict);
                barList.add(bar);
            } while (true);

            map.put(instrument,barList);
        }


        //        Reader in = new FileReader("orcl-2000.csv");
        //        Iterable<CSVRecord> records = CSVFormat.DEFAULT.parse(in);
        //
        //        for (CSVRecord record : records) {
        //            String lastName = record.get("Last Name");
        //            String firstName = record.get("First Name");
        //        }





        //String[] reader = cf.

        //        for row in reader:
        //    bar_ = rowParser.parseBar(row)
        //        if bar_ is not None and (self.__barFilter is None or self.__barFilter.includeBar(bar_)):
        //        loadedBars.append(bar_)
        //
        addBarsFromSequence(instrument, barList);

    }


}
