package jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.stats.item;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.controller.stats.item.responsebody.ItemStatResponseBody;
import jp.ac.osaka_u.ist.sdl.kjuiceapp.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/stats/items")
public class ItemStatController {
  @Autowired private PurchaseService purchaseService;

  @GetMapping
  public List<ItemStatResponseBody> getSalesStatsOnItem(
      @RequestParam(required = false) Optional<Boolean> active,
      @RequestParam(required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
          LocalDateTime start,
      @RequestParam(required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
          LocalDateTime end) {
    if (start.isAfter(end)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }
    return purchaseService.getSalesStatsOnItem(active, start, end);
  }
}
