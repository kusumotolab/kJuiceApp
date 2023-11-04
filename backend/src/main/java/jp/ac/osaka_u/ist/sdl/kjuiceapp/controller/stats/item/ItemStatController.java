package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.stats.item;

import java.time.LocalDateTime;
import java.util.List;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.stats.item.responsebody.ItemStatResponseBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stats/items")
public class ItemStatController {
  @Autowired private PurchaseService purchaseService;

  @GetMapping
  public List<ItemStatResponseBody> getSalesStatsOnItem(
      @RequestParam(required = false) Boolean active,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
          LocalDateTime start,
      @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
          LocalDateTime end) {
    return purchaseService.getSalesStatsOnItem(active, start, end);
  }
}
